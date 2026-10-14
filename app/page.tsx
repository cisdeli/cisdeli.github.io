import Hero from '@/app/ui/hero';
import About from '@/app/ui/about';
import CiampittiLab from '@/app/ui/sections/ciampittiLab';
import PersonalProjects from '@/app/ui/sections/personalProjects';
import USP from '@/app/ui/sections/usp';
import NextCue from '@/app/ui/nextCue';

export default function Home() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="page-backdrop" aria-hidden="true" />
            <main className="flex-1">
                <Hero />
                <About />
                <NextCue href="#ciampitti-lab" label="Ciampitti Lab" />
                <CiampittiLab />
                <NextCue href="#personal-projects" label="Personal Projects" />
                <PersonalProjects />
                <NextCue href="#usp" label="University of São Paulo" />
                <USP />
                <NextCue href="#heroSection" label="Back to top" />
            </main>
        </div>
    );
}
