'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/app/ui/styles/header.css';

const navigation = [
    { name: 'About', href: '/' },
    { name: 'Univ. of São Paulo', href: '/USP' },
    { name: 'Ciampitti Lab', href: '/ciampitti_lab' },
    { name: 'Projects', href: '/personal_projects' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const menu = document.getElementById('mobile-menu');
            const btn  = document.getElementById('hamburger-btn');
            if (menu && !menu.contains(event.target as Node) &&
                btn  && !btn.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="site-header">
            <nav className="header-inner">
                {/* Logo — links home, always visible */}
                <Link href="/" className="site-logo">
                    Pedro Cisdeli
                </Link>

                {/* Desktop nav */}
                <div className="header-nav">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Hamburger (mobile only) */}
                <button
                    id="hamburger-btn"
                    className="hamburger lg:hidden"
                    onClick={() => setIsMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={`hamburger-line ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                    <span className={`hamburger-line ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`hamburger-line ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
                </button>
            </nav>

            {/* Mobile dropdown */}
            {isMenuOpen && (
                <div id="mobile-menu" className="mobile-menu">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`mobile-nav-link ${pathname === item.href ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
