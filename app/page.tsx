import Header from '@/app/ui/header'
import Hero from '@/app/ui/hero';
import Footer from '@/app/ui/footer';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Hero />
            </main>
            <Footer />
        </div>
    );
}
