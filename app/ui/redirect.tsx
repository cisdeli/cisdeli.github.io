'use client'
import { useEffect } from 'react';

// GitHub Pages can't do server redirects, so old page URLs ship this instead:
// a meta refresh (works without JS) plus an immediate client-side replace.
export default function Redirect({ to }: { to: string }) {
    useEffect(() => {
        window.location.replace(to);
    }, [to]);

    return (
        <>
            <meta httpEquiv="refresh" content={`0; url=${to}`} />
            <p className="content item-text" style={{ paddingTop: '4rem' }}>
                This page moved. <a className="gradient" href={to}>Continue to the new page</a>.
            </p>
        </>
    );
}
