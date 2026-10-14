'use client'
import { useEffect, useRef } from 'react';

// Runs a ShaderHub-style fragment shader (mainImage + iResolution/iTime/iFrame/iMouse) with WebGL2.
// Only renders while on screen, and black output becomes transparent so the page lighting
// shows through: 'cutout' makes only pure black transparent (solid objects), 'glow' uses
// brightness as opacity (light on black, like additive blending).
type Blend = 'cutout' | 'glow';

const VERT = `#version 300 es
void main() {
    // Fullscreen triangle from gl_VertexID, same as ShaderHub
    vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

// Same leniency as ShaderHub: the file may declare the uniforms, `out vec4 fragColor`
// and its own main() or not. Ours are injected, theirs are neutralised.
function toWebGL(src: string, blend: Blend) {
    const hasMainImage = /void\s+mainImage\s*\(/.test(src);
    const body = src
        .replace(/^\s*#version.*$/m, '')
        .replace(/^\s*uniform\s+\w+\s+(iResolution|iTime|iFrame|iMouse)\s*;.*$/gm, '')
        .replace(/^\s*out\s+vec4\s+fragColor\s*;/m, 'vec4 fragColor;')
        .replace(/void\s+main\s*\(/, 'void shaderMain_(');
    const run = hasMainImage
        ? 'mainImage(c, gl_FragCoord.xy);'
        : 'shaderMain_(); c = fragColor;';
    const alpha = blend === 'glow'
        ? 'clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0)'
        : 'step(0.0001, max(c.r, max(c.g, c.b)))';
    const out = blend === 'glow' ? 'vec4(min(c.rgb, vec3(1.0)), a)' : 'vec4(c.rgb * a, a)';
    return `#version 300 es
precision highp float;
precision highp int;
uniform vec3 iResolution;
uniform float iTime;
uniform int iFrame;
uniform vec4 iMouse;
out vec4 outColor;
${body}
void main() {
    vec4 c = vec4(0.0);
    ${run}
    float a = ${alpha};
    outColor = ${out};
}`;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('[ShaderCanvas]', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
    }
    return s;
}

export default function ShaderCanvas({ source, blend = 'cutout', maxDpr = 1.5, className }: {
    source: string;
    blend?: Blend;
    maxDpr?: number;
    className?: string;
}) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const gl = canvas?.getContext('webgl2', { premultipliedAlpha: true, antialias: false });
        if (!canvas || !gl) return;

        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, toWebGL(source, blend));
        if (!vs || !fs) return;
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error('[ShaderCanvas]', gl.getProgramInfoLog(prog));
            return;
        }
        const vao = gl.createVertexArray();
        const loc = {
            res: gl.getUniformLocation(prog, 'iResolution'),
            time: gl.getUniformLocation(prog, 'iTime'),
            frame: gl.getUniformLocation(prog, 'iFrame'),
            mouse: gl.getUniformLocation(prog, 'iMouse'),
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
            canvas.width = Math.round(canvas.clientWidth * dpr);
            canvas.height = Math.round(canvas.clientHeight * dpr);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        resize();

        // Time only advances while visible, so it picks up where it left off
        let raf = 0, running = false, last = 0, time = 0, frame = 0;
        const draw = (now: number) => {
            time += (now - last) / 1000;
            last = now;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.useProgram(prog);
            gl.bindVertexArray(vao);
            gl.uniform3f(loc.res, canvas.width, canvas.height, 1);
            gl.uniform1f(loc.time, time);
            gl.uniform1i(loc.frame, frame++);
            gl.uniform4f(loc.mouse, 0, 0, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            raf = requestAnimationFrame(draw);
        };
        // A GPU reset can take the context away; stop drawing rather than throwing every frame
        const onLost = (e: Event) => {
            e.preventDefault();
            running = false;
            cancelAnimationFrame(raf);
            io.disconnect();
        };
        canvas.addEventListener('webglcontextlost', onLost);

        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !running) {
                running = true;
                last = performance.now();
                raf = requestAnimationFrame(draw);
            } else if (!e.isIntersecting && running) {
                running = false;
                cancelAnimationFrame(raf);
            }
        }, { rootMargin: '100px 0px' });
        io.observe(canvas);

        return () => {
            canvas.removeEventListener('webglcontextlost', onLost);
            io.disconnect();
            ro.disconnect();
            cancelAnimationFrame(raf);
            gl.deleteProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, [source, blend, maxDpr]);

    return <canvas ref={ref} className={className} aria-hidden="true" />;
}
