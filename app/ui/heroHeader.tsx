import '@/app/ui/hero_styles.css';

const navigation = [
    { name: 'About Me', href: '#' },
    { name: 'Skills', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'Hobbies', href: '#' },
]

export default function HeroHeader() {
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="leading-6 hero-header-text">
                            {item.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>)
}
