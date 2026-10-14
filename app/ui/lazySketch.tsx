'use client'
import { useEffect, useMemo, useRef, useState } from 'react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { Sketch } from '@p5-wrapper/react';

// Mounts the sketch only while it is near the viewport, so offscreen sketches cost nothing.
// The box keeps its size either way, so nothing shifts.

// Browsers cap live WebGL contexts (~16) and only reclaim a removed canvas's context on GC,
// so a WEBGL sketch that remounts on every scroll eventually fails to create one.
// Releasing it explicitly before unmounting keeps the count flat.
function releaseWebGL(root: HTMLElement | null) {
    root?.querySelectorAll('canvas').forEach((c) => {
        const gl = c.getContext('webgl2') ?? c.getContext('webgl');
        gl?.getExtension('WEBGL_lose_context')?.loseContext();
    });
}
// If the browser refuses a WebGL context (GPU blocklist, too many contexts, GPU reset),
// p5 throws from setup. Swallow it and stop the sketch instead of crashing the page.
function safe(sketch: Sketch): Sketch {
    return (p5) => {
        sketch(p5);
        const { setup, draw } = p5;
        let failed = false;
        p5.setup = () => {
            try {
                setup?.();
            } catch (e) {
                failed = true;
                console.warn('[LazySketch] sketch disabled:', e);
                p5.noLoop();
            }
        };
        p5.draw = () => {
            if (!failed) draw?.();
        };
    };
}

export default function LazySketch({ sketch }: { sketch: Sketch }) {
    const ref = useRef<HTMLDivElement>(null);
    const [near, setNear] = useState(false);
    const safeSketch = useMemo(() => safe(sketch), [sketch]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) releaseWebGL(el);
            setNear(e.isIntersecting);
        }, { rootMargin: '300px 0px' });
        io.observe(el);
        return () => {
            io.disconnect();
            releaseWebGL(el);
        };
    }, []);

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            {near && <NextReactP5Wrapper sketch={safeSketch} />}
        </div>
    );
}
