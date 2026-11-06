'use client'
import { useEffect, useRef } from 'react';

// Barnsley fern (cumulative probabilities: 0.01, 0.85, 0.07, 0.07)
const MAPS = [
    { a: 0, b: 0, c: 0, d: 0.16, e: 0, f: 0, p: 0.01 },
    { a: 0.85, b: 0.04, c: -0.04, d: 0.85, e: 0, f: 1.6, p: 0.86 },
    { a: 0.2, b: -0.26, c: 0.23, d: 0.22, e: 0, f: 1.6, p: 0.93 },
    { a: -0.15, b: 0.28, c: 0.26, d: 0.24, e: 0, f: 0.44, p: 1 },
];
// Bounds of the attractor in fern space
const X_MIN = -2.182, X_MAX = 2.6558, Y_MAX = 9.9983;

// The fern contains a shrunken copy of itself (f2 maps the whole fern onto everything
// above the first pair of leaflets). Undoing f2 k times gives a bigger fern whose upper
// part is exactly the original one, so `extend` grows new fronds below without moving it.
const F2 = MAPS[1];
const DET = F2.a * F2.d - F2.b * F2.c;
function unF2(x: number, y: number, k: number): [number, number] {
    for (let i = 0; i < k; i++) {
        const u = x - F2.e, v = y - F2.f;
        x = (F2.d * u - F2.b * v) / DET;
        y = (-F2.c * u + F2.a * v) / DET;
    }
    return [x, y];
}

// The original fern's frame in fern units (a 1:2 box, fern fitted to its height)
const CX = (X_MIN + X_MAX) / 2;
const FRAME = { x0: CX - Y_MAX / 4, x1: CX + Y_MAX / 4, y0: 0, y1: Y_MAX };

function extendedBounds(k: number) {
    const corners = [[X_MIN, 0], [X_MAX, 0], [X_MIN, Y_MAX], [X_MAX, Y_MAX]].map(([x, y]) => unF2(x, y, k));
    return {
        x0: Math.min(FRAME.x0, ...corners.map(c => c[0])),
        x1: Math.max(FRAME.x1, ...corners.map(c => c[0])),
        y0: Math.min(FRAME.y0, ...corners.map(c => c[1])),
        y1: Math.max(FRAME.y1, ...corners.map(c => c[1])),
    };
}

// Runs the chaos game once. Per point: position in the canvas (0..1, y down), height up
// the original fern (for the colour ramp) and a random seed. Generation order is the
// reveal order, so drawing the first n points replays the fern being drawn.
function generate(points: number, extend: number, B: ReturnType<typeof extendedBounds>) {
    const data = new Float32Array(points * 4);
    const w = B.x1 - B.x0, h = B.y1 - B.y0;
    let x = 0, y = 0;
    for (let i = 0; i < points; i++) {
        const r = Math.random();
        const m = r < MAPS[0].p ? MAPS[0] : r < MAPS[1].p ? MAPS[1] : r < MAPS[2].p ? MAPS[2] : MAPS[3];
        const nx = m.a * x + m.b * y + m.e;
        const ny = m.c * x + m.d * y + m.f;
        x = nx; y = ny;
        const [gx, gy] = extend > 0 ? unF2(x, y, extend) : [x, y];
        data[i * 4] = (gx - B.x0) / w;
        data[i * 4 + 1] = (B.y1 - gy) / h;
        data[i * 4 + 2] = Math.min(1, Math.max(0, y / Y_MAX));
        data[i * 4 + 3] = Math.random();
    }
    return data;
}

// The fern lives in a rotated box (laid out by CSS, measured each resize); the canvas
// covers the whole area unrotated so dots can fly anywhere. Once scrolled far enough the
// fern blows apart from a point, inner dots first like a shockwave, each flung outward
// with a little spin, and flies off screen. The first `floaters` points (a random sample
// of the fern, since the chaos game visits it at random) are thrown out with the rest but
// then settle in a band centred on the `floatIn` element, thinning out above and below
// it, as soft, twinkling motes that drift in the air.
// Scrolling back up pulls everything back in.
const VERT = `#version 300 es
in vec2 aPos;
in vec2 aData;
uniform vec2 uSize;
uniform vec2 uBoxCenter;
uniform vec2 uBoxSize;
uniform vec2 uRot;
uniform vec2 uBurst;
uniform float uReach;
uniform float uBlast;
uniform float uPointSize;
uniform float uAlpha;
uniform float uTime;
uniform float uFloat;
uniform vec4 uFloatBox;
uniform vec2 uTail;
out vec4 vColor;
out float vSoft;

// Same stops as the old 2D ramp, base -> tip
vec3 ramp(float t) {
    vec3 c0 = vec3(74.0, 37.0, 150.0), c1 = vec3(116.0, 64.0, 201.0);
    vec3 c2 = vec3(137.0, 78.0, 210.0), c3 = vec3(160.0, 118.0, 230.0);
    float s = t * 3.0;
    vec3 c = s < 1.0 ? mix(c0, c1, s) : s < 2.0 ? mix(c1, c2, s - 1.0) : mix(c2, c3, s - 2.0);
    return c / 255.0;
}

float hash(float n) { return fract(sin(n) * 43758.5453); }
vec2 rot(vec2 v, float a) { return mat2(cos(a), sin(a), -sin(a), cos(a)) * v; }

void main() {
    float t = aData.x, seed = aData.y;
    vec2 q = (aPos - 0.5) * uBoxSize;
    vec2 p = uBoxCenter + mat2(uRot.x, uRot.y, -uRot.y, uRot.x) * q;

    // Blast: delay grows with distance from the centre, then ease out (fast, then coasting)
    vec2 v = p - uBurst;
    float r = length(v);
    float delay = 0.22 * clamp(r / uReach, 0.0, 1.0) + 0.08 * seed;
    float lp = clamp((uBlast - delay) / 0.7, 0.0, 1.0);
    vec2 dir = rot(r > 0.001 ? v / r : vec2(1.0, 0.0), (hash(seed * 7.13) - 0.5) * 1.0);
    vec3 col = ramp(t);
    float a = uAlpha, size = uPointSize;
    vSoft = 0.0;

    if (float(gl_VertexID) >= uFloat) {
        // Flung far enough to leave the screen; any still in view fade at the very end
        float e = 1.0 - pow(1.0 - lp, 3.0);
        float dist = (1.0 + 0.8 * pow(hash(seed * 3.7), 0.7)) * uReach;
        p = uBurst + rot(v, e * (hash(seed * 5.3) - 0.5) * 0.8) + dir * dist * e;
        size *= 1.0 + 2.0 * e;
        col = mix(col, vec3(0.80, 0.70, 1.0), 0.4 * e);
        a *= 1.0 - smoothstep(0.8, 1.0, lp);
        a *= 1.0 - smoothstep(uTail.x, uTail.y, p.y);
    } else {
        // Thrown out with the rest, then eased into a spot over the float box, drifting there
        float s = smoothstep(0.0, 1.0, lp);
        // Bell-shaped spread (-1..1) around the box's middle, reaching well past its edges
        float bell = (hash(seed * 11.7) + hash(seed * 23.1) + hash(seed * 31.7)) / 1.5 - 1.0;
        vec2 mid = (uFloatBox.xy + uFloatBox.zw) * 0.5, half_ = (uFloatBox.zw - uFloatBox.xy) * 0.5;
        vec2 spot = vec2(mix(uFloatBox.x, uFloatBox.z, hash(seed * 19.3)), mid.y + bell * half_.y * 1.8);
        float tail = 1.0 - smoothstep(uTail.x, uTail.y, p.y);
        vec2 drift = vec2(sin(uTime * (0.15 + 0.2 * hash(seed * 2.3)) + seed * 61.0) * 22.0,
                          cos(uTime * (0.12 + 0.18 * hash(seed * 4.1)) + seed * 37.0) * 16.0);
        p = mix(p, spot + drift, s) + dir * 0.25 * uReach * sin(3.14159 * lp);
        // Mostly fine dust, a few larger motes; some pick up the teal accent
        float big = hash(seed * 13.3);
        size *= mix(1.0, 2.0 + 4.0 * big * big * big, s);
        vec3 mote = hash(seed * 17.9) > 0.85 ? vec3(0.35, 0.80, 0.90) : vec3(0.80, 0.70, 1.0);
        col = mix(col, mote, s);
        float twinkle = 0.55 + 0.45 * sin(uTime * (0.6 + 1.4 * hash(seed * 9.1)) + seed * 30.0);
        // Fern tail fade while still part of the fern; once settled, fade toward the band's ends
        a *= mix(tail, twinkle * (0.6 + 0.6 * big) * (1.0 - smoothstep(0.55, 1.0, abs(bell))), s);
        vSoft = s;
    }

    gl_Position = vec4(p / uSize * vec2(2.0, -2.0) + vec2(-1.0, 1.0), 0.0, 1.0);
    gl_PointSize = size;
    // Nothing reaches the canvas's bottom edge
    a = min(a, 1.0) * (1.0 - smoothstep(uSize.y * 0.92, uSize.y, p.y));
    vColor = vec4(col * a, a);
}`;

const FRAG = `#version 300 es
precision mediump float;
in vec4 vColor;
in float vSoft;
out vec4 outColor;
// Fern dots are solid squares; motes are round with a soft glowing edge
void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float glow = 1.0 - smoothstep(0.0, 1.0, d);
    outColor = vColor * mix(1.0, glow * glow, vSoft);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('[FernCanvas]', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
    }
    return s;
}

// Blast and return durations, in seconds
const BLAST_TIME = 2.2, RETURN_TIME = 1.4;

type Props = {
    points?: number;
    perFrame?: number;
    dotSize?: number;
    alpha?: number;
    maxDpr?: number;
    extend?: number;
    blastAt?: number;
    floaters?: number;
    floatIn?: string;
    tailFade?: [number, number];
    frameClassName?: string;
    className?: string;
};

// Renders a canvas filling its positioned parent, plus an invisible frame (styled by
// `frameClassName`) that places the fern; the fern is drawn wherever that frame lands.
// `blastAt`: the fern blows apart once scrolled this far, as a fraction of the screen height.
// `floaters` of its points then hang in the air around the element matching `floatIn`.
// `tailFade`: the fern fades out between these fractions of the canvas height.
export default function FernCanvas({
    points = 120000,
    perFrame = 250,
    dotSize = 1,
    alpha = 0.6,
    maxDpr = 2,
    extend = 0,
    blastAt,
    floaters = 0,
    floatIn,
    tailFade = [2, 3],
    frameClassName,
    className,
}: Props) {
    const ref = useRef<HTMLCanvasElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    // The frame is the original fern's 1:2 box; the extended fern overflows it
    const B = extendedBounds(extend);
    const fw = FRAME.x1 - FRAME.x0, fh = FRAME.y1 - FRAME.y0;
    const boxStyle = {
        position: 'absolute' as const,
        left: `${((B.x0 - FRAME.x0) / fw) * 100}%`,
        top: `${((FRAME.y1 - B.y1) / fh) * 100}%`,
        width: `${((B.x1 - B.x0) / fw) * 100}%`,
        height: `${((B.y1 - B.y0) / fh) * 100}%`,
    };

    useEffect(() => {
        const canvas = ref.current;
        const box = boxRef.current;
        const gl = canvas?.getContext('webgl2', { premultipliedAlpha: true, antialias: false });
        if (!canvas || !box || !gl) return;

        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return;
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error('[FernCanvas]', gl.getProgramInfoLog(prog));
            return;
        }

        const vao = gl.createVertexArray();
        const buf = gl.createBuffer();
        gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, generate(points, extend, B), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(prog, 'aPos');
        const aData = gl.getAttribLocation(prog, 'aData');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
        gl.enableVertexAttribArray(aData);
        gl.vertexAttribPointer(aData, 2, gl.FLOAT, false, 16, 8);

        const u = Object.fromEntries(
            ['uSize', 'uBoxCenter', 'uBoxSize', 'uRot', 'uBurst', 'uReach', 'uBlast', 'uPointSize', 'uAlpha', 'uTime', 'uFloat', 'uFloatBox', 'uTail']
                .map(n => [n, gl.getUniformLocation(prog, n)])
        );

        // Same look as 2D source-over drawing: each dot blends over the ones before it
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        // Canvas size, and where the fern box and its frame sit inside it
        const L = { dpr: 1, cx: 0, cy: 0, bw: 1, bh: 1, cos: 1, sin: 0, fx: 0, fy: 0, box: [0, 0, 1, 1] };
        const floatEl = floatIn ? document.querySelector(floatIn) : null;
        const measure = () => {
            L.dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
            canvas.width = Math.round(canvas.clientWidth * L.dpr);
            canvas.height = Math.round(canvas.clientHeight * L.dpr);
            const c = canvas.getBoundingClientRect();
            // A rotated box's bounding rect is centred on the box, so its centre is exact
            const b = box.getBoundingClientRect();
            L.cx = b.left + b.width / 2 - c.left;
            L.cy = b.top + b.height / 2 - c.top;
            L.bw = box.offsetWidth;
            L.bh = box.offsetHeight;
            const frame = box.parentElement!;
            const t = getComputedStyle(frame).transform;
            const m = t && t !== 'none' ? new DOMMatrix(t) : null;
            const a = m ? Math.atan2(m.b, m.a) : 0;
            L.cos = Math.cos(a);
            L.sin = Math.sin(a);
            const f = frame.getBoundingClientRect();
            L.fx = f.left + f.width / 2 - c.left;
            L.fy = f.top + f.height / 2 - c.top;
            // Motes spread across the full width, around the float element (or the lower half)
            const fe = floatEl?.getBoundingClientRect();
            L.box = fe
                ? [-c.width * 0.02, fe.top - c.top, c.width * 1.02, fe.bottom - c.top]
                : [-c.width * 0.02, c.height / 2, c.width * 1.02, c.height];
        };

        // Blast state: scrolling down past `blastAt` sets it off from the fern's centre,
        // scrolling back up brings it back
        let target = 0, blastP = 0, lastY = window.scrollY, upBy = 0;
        const onScroll = () => {
            const y = window.scrollY, vh = window.innerHeight;
            if (blastAt === undefined || y < vh * blastAt) { target = 0; upBy = 0; }
            else if (y > lastY) { target = 1; upBy = 0; }
            else if (y < lastY && y < vh) {
                upBy += lastY - y;
                if (upBy > 30) target = 0;
            }
            lastY = y;
            kick();
        };

        let raf = 0, visible = true, start = -1, last = 0, time = 0;
        const rate = perFrame * 60; // points per second, like perFrame at 60fps

        const frame = (now: number) => {
            raf = 0;
            if (start < 0) { start = now; last = now; }
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            time += dt;

            // A blast finishes the reveal, so no new points pop up mid-air
            if (target === 1) start = Math.min(start, now - (points / rate) * 1000);
            const count = Math.min(points, Math.floor(((now - start) / 1000) * rate));
            blastP = target > blastP
                ? Math.min(1, blastP + dt / BLAST_TIME)
                : Math.max(0, blastP - dt / RETURN_TIME);

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            // Once the blast is over only the motes are left to draw
            const n = blastP < 1 ? count : Math.min(count, floaters);
            if (n > 0) {
                gl.useProgram(prog);
                gl.bindVertexArray(vao);
                gl.uniform2f(u.uSize, canvas.clientWidth, canvas.clientHeight);
                gl.uniform2f(u.uBoxCenter, L.cx, L.cy);
                gl.uniform2f(u.uBoxSize, L.bw, L.bh);
                gl.uniform2f(u.uRot, L.cos, L.sin);
                gl.uniform2f(u.uBurst, L.fx, L.fy);
                gl.uniform1f(u.uReach, Math.hypot(window.innerWidth, window.innerHeight));
                gl.uniform1f(u.uBlast, blastP);
                gl.uniform1f(u.uPointSize, Math.max(1, dotSize * L.dpr));
                gl.uniform1f(u.uAlpha, alpha);
                gl.uniform1f(u.uTime, time);
                gl.uniform1f(u.uFloat, floaters);
                gl.uniform4f(u.uFloatBox, L.box[0], L.box[1], L.box[2], L.box[3]);
                gl.uniform2f(u.uTail, tailFade[0] * canvas.clientHeight, tailFade[1] * canvas.clientHeight);
                gl.drawArrays(gl.POINTS, 0, n);
            }

            // Keep going while something is moving: the reveal, the blast, or drifting motes
            const moving = count < points || blastP !== target || (blastP > 0 && floaters > 0);
            if (moving && visible) raf = requestAnimationFrame(frame);
        };
        const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Re-measure on resize; the points are stored relative to the box so nothing regenerates
        const ro = new ResizeObserver(() => { measure(); kick(); });
        ro.observe(canvas);
        ro.observe(box);
        if (floatEl) ro.observe(floatEl);

        // Pause off screen; the reveal clock pauses with it
        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible) {
                if (start >= 0) { const gap = performance.now() - last; start += gap; last += gap; }
                kick();
            } else if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
        });
        io.observe(canvas);

        // A GPU reset can take the context away; stop drawing rather than throwing every frame
        const onLost = (e: Event) => {
            e.preventDefault();
            visible = false;
            cancelAnimationFrame(raf);
            io.disconnect();
        };
        canvas.addEventListener('webglcontextlost', onLost);

        return () => {
            cancelAnimationFrame(raf);
            canvas.removeEventListener('webglcontextlost', onLost);
            window.removeEventListener('scroll', onScroll);
            io.disconnect();
            ro.disconnect();
            gl.deleteBuffer(buf);
            gl.deleteVertexArray(vao);
            gl.deleteProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, [points, perFrame, dotSize, alpha, maxDpr, extend, blastAt, floaters, floatIn, tailFade[0], tailFade[1]]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={className} style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
            <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <div className={frameClassName}>
                <div ref={boxRef} style={boxStyle} />
            </div>
        </div>
    );
}
