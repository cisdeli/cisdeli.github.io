import Link from 'next/link';

// Minimal corner nav: a couple of small links top right, styled like the hero notes. Not a
// bar and not sticky, it scrolls away with the page. Off the home page the fern mark sits
// top left and links home.
const SiteNav = ({ current, className = '' }: { current: 'home' | 'writing'; className?: string }) => (
    <nav className={`site-nav ${className}`} aria-label="Main">
        {current !== 'home' && (
            <Link href="/" className="site-nav-logo" aria-label="Home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-fern-56.svg" alt="" width={549} height={559} />
            </Link>
        )}
        <div className="site-nav-links">
            <Link href={current === 'home' ? '#ciampitti-lab' : '/#ciampitti-lab'} className="site-nav-link">Work</Link>
            <Link href="/writing" className="site-nav-link" aria-current={current === 'writing' ? 'page' : undefined}>Writing</Link>
        </div>
    </nav>
);

export default SiteNav;
