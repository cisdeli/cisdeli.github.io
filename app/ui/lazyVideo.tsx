'use client'
import { useEffect, useRef } from 'react';

// Plays only while on screen and doesn't download until it gets close
export default function LazyVideo({ src, poster, aspect = '16 / 9', className }: {
    src: string;
    poster?: string;
    aspect?: string;
    className?: string;
}) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                if (!v.src) v.src = src;
                v.play().catch(() => {});
            } else {
                v.pause();
            }
        }, { rootMargin: '200px 0px' });
        io.observe(v);
        return () => io.disconnect();
    }, [src]);

    return (
        <video
            ref={ref}
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            className={className}
            style={{ objectFit: 'cover', aspectRatio: aspect }}
        />
    );
}
