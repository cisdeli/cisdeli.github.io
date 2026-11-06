'use client'
import { useEffect, useRef, useState } from 'react';

// "Copy machine" demo for the fern post: start from a filled box, then each step every pixel
// looks up where each of the four maps would have brought it from in the previous image.
// Within a few dozen steps the box has turned into the fern. The first steps are slow so
// they can be followed, later ones (small changes, mostly at the tip) quicker. Loops, and
// pauses off screen.
// STEP_SHADER's body is what the post shows, keep the two in sync.
const STEP_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uPrev;
uniform vec2 uRes;
out vec4 outColor;

// The four maps, x' = A x + t (f1 gets a sliver of width so it can be inverted)
const mat2 A[4] = mat2[4](
    mat2(0.02, 0.0, 0.0, 0.16),
    mat2(0.85, -0.04, 0.04, 0.85),
    mat2(0.2, 0.23, -0.26, 0.22),
    mat2(-0.15, 0.26, 0.28, 0.24)
);
const vec2 T[4] = vec2[4](vec2(0.0), vec2(0.0, 1.6), vec2(0.0, 1.6), vec2(0.0, 0.44));

// The part of the plane we look at, in fern units
const vec2 LO = vec2(-2.26, 0.0), SIZE = vec2(5.0, 10.0);

void main() {
    vec2 q = LO + gl_FragCoord.xy / uRes * SIZE;
    float v = 0.0;
    for (int i = 0; i < 4; i++) {
        // Where would map i have brought this point from?
        vec2 uv = (inverse(A[i]) * (q - T[i]) - LO) / SIZE;
        if (all(greaterThanEqual(uv, vec2(0.0))) && all(lessThan(uv, vec2(1.0))))
            v = max(v, texture(uPrev, uv).r);
    }
    outColor = vec4(min(1.0, v * 1.5), 0.0, 0.0, 1.0);
}`;

const QUAD_VERT = `#version 300 es
void main() {
    vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

// Fill: the starting picture, the whole box lit
const FILL_SHADER = `#version 300 es
precision highp float;
out vec4 outColor;
void main() { outColor = vec4(1.0, 0.0, 0.0, 1.0); }`;

// Show: the fern's base -> tip colours, transparent where nothing is lit
const SHOW_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
out vec4 outColor;
void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float v = texture(uTex, uv).r;
    vec3 col = mix(vec3(0.29, 0.15, 0.59), vec3(0.63, 0.46, 0.90), uv.y);
    outColor = vec4(col * v, v);
}`;

const W = 384, H = 768, STEPS = 30, HOLD_MS = 2600;
const stepMs = (n: number) => Math.max(110, 900 * Math.pow(0.82, n));

function program(gl: WebGL2RenderingContext, frag: string) {
    const make = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error('[CopyMachine]', gl.getShaderInfoLog(s));
        return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, make(gl.VERTEX_SHADER, QUAD_VERT));
    gl.attachShader(p, make(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    return p;
}

export default function CopyMachine() {
    const ref = useRef<HTMLCanvasElement>(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const canvas = ref.current;
        const gl = canvas?.getContext('webgl2', { premultipliedAlpha: true });
        if (!canvas || !gl) return;

        const fill = program(gl, FILL_SHADER);
        const stepProg = program(gl, STEP_SHADER);
        const show = program(gl, SHOW_SHADER);
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        // Two textures to ping-pong between
        const targets = [0, 1].map(() => {
            const tex = gl.createTexture()!;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, W, H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            const fb = gl.createFramebuffer()!;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
            return { tex, fb };
        });
        let cur = 0, n = 0;

        const draw = (prog: WebGLProgram, fb: WebGLFramebuffer | null, w: number, h: number, tex?: WebGLTexture) => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.viewport(0, 0, w, h);
            gl.useProgram(prog);
            if (tex) gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.uniform2f(gl.getUniformLocation(prog, 'uRes'), w, h);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };
        const present = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
            if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
            gl.clearColor(0, 0, 0, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clear(gl.COLOR_BUFFER_BIT);
            draw(show, null, w, h, targets[cur].tex);
        };
        const reset = () => { cur = 0; n = 0; draw(fill, targets[0].fb, W, H); setStep(0); present(); };
        const advance = () => {
            draw(stepProg, targets[1 - cur].fb, W, H, targets[cur].tex);
            cur = 1 - cur;
            setStep(++n);
            present();
        };

        // Step on a timer, hold the finished fern, start over; only while on screen
        let timer = 0, visible = false;
        const tick = () => {
            if (!visible) return;
            if (n < STEPS) { advance(); timer = window.setTimeout(tick, stepMs(n)); }
            else timer = window.setTimeout(() => { reset(); timer = window.setTimeout(tick, stepMs(0)); }, HOLD_MS);
        };
        reset();
        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            window.clearTimeout(timer);
            if (visible) timer = window.setTimeout(tick, stepMs(n));
        });
        io.observe(canvas);
        const ro = new ResizeObserver(present);
        ro.observe(canvas);

        return () => {
            window.clearTimeout(timer);
            io.disconnect();
            ro.disconnect();
            [fill, stepProg, show].forEach(p => gl.deleteProgram(p));
            targets.forEach(t => { gl.deleteTexture(t.tex); gl.deleteFramebuffer(t.fb); });
        };
    }, []);

    return (
        <figure className="post-figure">
            <div className="copy-machine">
                <canvas ref={ref} aria-label="A filled box turning into the Barnsley fern, one copy step at a time" />
            </div>
            <figcaption className="post-caption">step {step} of {STEPS}</figcaption>
        </figure>
    );
}
