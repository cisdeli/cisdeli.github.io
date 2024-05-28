'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/app/ui/styles/header.css';

const navigation = [
    { name: 'About Me', href: '/' },
    { name: 'University of São Paulo', href: '/firstSection' },
    { name: 'Ciampitti Lab', href: '/secondSection' },
    { name: 'Personal Projects', href: '/thirdSection' },
    // { name: 'Hobbies', href: '/fourthSection' },
];

export default function Header() {
    return (
        <header className="border-double border-b-2 border-[#27095E] bg-[rgba(100,23,242,0.06)]">
            <nav className="flex items-center justify-left">
                <div className="header-container hidden lg:flex lg:gap-x-12 p-2">
                    {navigation.map((item) => (
                        <Link legacyBehavior key={item.name} href={item.href} passHref>
                            <a className={`leading-6 header-text ${usePathname() === item.href ? 'active' : ''}`}>
                                {item.name}
                            </a>
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
