'use client'
import { useEffect, useRef, useState } from 'react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { Sketch } from '@p5-wrapper/react';

// Mounts the sketch only while it is near the viewport, so offscreen sketches cost nothing.
// The box keeps its size either way, so nothing shifts.
export default function LazySketch({ sketch }: { sketch: Sketch }) {
    const ref = useRef<HTMLDivElement>(null);
    const [near, setNear] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '300px 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            {near && <NextReactP5Wrapper sketch={sketch} />}
        </div>
    );
}
