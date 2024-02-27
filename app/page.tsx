import Link from "next/link";
import HeroHeader from '@/app/ui/heroHeader'
import Hero from '@/app/ui/heroContents';

export default function Home() {
    return (
        <div className="bg-dark">
            <HeroHeader />
            <Hero />
        </div>
    );
}
