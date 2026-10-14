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

// Base -> tip colour ramp, interpolated into many steps so there is no visible banding
const STOPS: [number, number, number][] = [[74, 37, 150], [116, 64, 201], [137, 78, 210], [160, 118, 230]];
const RAMP = Array.from({ length: 96 }, (_, i) => {
    const t = (i / 95) * (STOPS.length - 1);
    const k = Math.min(STOPS.length - 2, Math.floor(t));
    const f = t - k;
    const [r, g, b] = STOPS[k].map((v, j) => Math.round(v + (STOPS[k + 1][j] - v) * f));
    return `rgb(${r},${g},${b})`;
});

type Props = {
    points?: number;
    perFrame?: number;
    dotSize?: number;
    alpha?: number;
    maxDpr?: number;
    extend?: number;
    className?: string;
};

export default function FernCanvas({
    points = 120000,
    perFrame = 250,
    dotSize = 1,
    alpha = 0.6,
    maxDpr = 2,
    extend = 0,
    className,
}: Props) {
    const ref = useRef<HTMLCanvasElement>(null);

    // The parent box is the original fern's 1:2 frame; the canvas overflows it to fit the extension
    const B = extendedBounds(extend);
    const fw = FRAME.x1 - FRAME.x0, fh = FRAME.y1 - FRAME.y0;
    const style = extend > 0 ? {
        position: 'absolute' as const,
        left: `${((B.x0 - FRAME.x0) / fw) * 100}%`,
        top: `${((FRAME.y1 - B.y1) / fh) * 100}%`,
        width: `${((B.x1 - B.x0) / fw) * 100}%`,
        height: `${((B.y1 - B.y0) / fh) * 100}%`,
    } : undefined;

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let raf = 0;
        let x = 0, y = 0, drawn = 0;
        let scale = 1, size = 1;

        const setup = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
            const w = canvas.clientWidth, h = canvas.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            scale = canvas.height / (B.y1 - B.y0);
            size = Math.max(1, dotSize * dpr);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = alpha;
            x = 0; y = 0; drawn = 0;
        };

        const step = (n: number) => {
            for (let i = 0; i < n && drawn < points; i++, drawn++) {
                const r = Math.random();
                const m = r < MAPS[0].p ? MAPS[0] : r < MAPS[1].p ? MAPS[1] : r < MAPS[2].p ? MAPS[2] : MAPS[3];
                const nx = m.a * x + m.b * y + m.e;
                const ny = m.c * x + m.d * y + m.f;
                x = nx; y = ny;
                ctx.fillStyle = RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.floor((y / Y_MAX) * RAMP.length)))];
                const [gx, gy] = extend > 0 ? unF2(x, y, extend) : [x, y];
                ctx.fillRect((gx - B.x0) * scale, (B.y1 - gy) * scale, size, size);
            }
        };

        const frame = () => {
            step(perFrame);
            if (drawn < points) raf = requestAnimationFrame(frame);
        };

        const start = () => {
            cancelAnimationFrame(raf);
            setup();
            raf = requestAnimationFrame(frame);
        };

        // Redraw from scratch when the canvas changes size
        let lastW = 0, lastH = 0, timer = 0;
        const ro = new ResizeObserver(() => {
            const w = canvas.clientWidth, h = canvas.clientHeight;
            if (w === lastW && h === lastH) return;
            lastW = w; lastH = h;
            window.clearTimeout(timer);
            timer = window.setTimeout(start, drawn === 0 ? 0 : 150);
        });
        ro.observe(canvas);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(timer);
            ro.disconnect();
        };
    }, [points, perFrame, dotSize, alpha, maxDpr, extend]); // eslint-disable-line react-hooks/exhaustive-deps

    return <canvas ref={ref} className={className} style={style} aria-hidden="true" />;
}
