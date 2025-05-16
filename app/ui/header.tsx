'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/app/ui/styles/header.css';

const navigation = [
    { name: 'About Me', href: '/' },
    { name: 'University of São Paulo', href: '/USP' },
    { name: 'Ciampitti Lab', href: '/ciampitti_lab' },
    { name: 'Personal Projects', href: '/personal_projects' },
    // { name: 'Hobbies', href: '/fourthSection' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    
    // Get current page name
    const getCurrentPageName = () => {
        const currentPage = navigation.find(item => item.href === pathname);
        return currentPage ? currentPage.name : 'About Me';
    };
    
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerBtn = document.getElementById('hamburger-btn');
            
            if (mobileMenu && !mobileMenu.contains(event.target as Node) && 
                hamburgerBtn && !hamburgerBtn.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="border-double border-b-2 border-[#27095E] bg-[rgba(100,23,242,0.06)] relative">
            <nav className="flex items-center justify-between px-4 py-2">
                {/* Current page name (mobile) */}
                <div className="lg:hidden">
                    <span className="header-text active">{getCurrentPageName()}</span>
                </div>
                
                {/* Desktop navigation */}
                <div className="header-container hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link legacyBehavior key={item.name} href={item.href} passHref>
                            <a className={`leading-6 header-text ${pathname === item.href ? 'active' : ''}`}>
                                {item.name}
                            </a>
                        </Link>
                    ))}
                </div>
                
                {/* Hamburger button */}
                <button
                    id="hamburger-btn"
                    className="lg:hidden flex flex-col justify-between h-5 w-6"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`bg-white h-0.5 w-full transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`bg-white h-0.5 w-full transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`bg-white h-0.5 w-full transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </nav>
            
            {/* Mobile dropdown menu */}
            {isMenuOpen && (
                <div 
                    id="mobile-menu"
                    className="lg:hidden absolute right-0 left-0 bg-[#080808] z-10 shadow-lg mobile-menu"
                >
                    <div className="py-3 px-4 flex flex-col space-y-4">
                        {navigation.map((item) => (
                            <Link legacyBehavior key={item.name} href={item.href} passHref>
                                <a 
                                    className={`header-text ${pathname === item.href ? 'active' : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
