'use client'
import FernCanvas from '@/app/ui/fernCanvas';
import SocialLinks from '@/app/ui/socialLinks';

const Hero = () => {
    return (
        <section className="hero" id="heroSection">
            {/* Lighting */}
            <div className="hero-backdrop" aria-hidden="true" />

            {/* Main fern, angled and zoomed; runs past the bottom of the hero */}
            <div className="hero-fern-wrap" aria-hidden="true">
                <div className="hero-fern fade-in delay-2">
                    <FernCanvas points={500000} perFrame={1000} maxDpr={1.5} extend={3} className="fern-canvas" />
                </div>
            </div>

            <div className="hero-note hero-note-left fade-up delay-2">
                <h1 className="hero-title">
                    <strong className="hero-name">Pedro Cisdeli</strong>,<br />
                    Software developer &amp; ML engineer,<br />
                    Ph.D. student at Purdue University
                </h1>
                <SocialLinks className="hero-socials" />
            </div>

            <a href="#about" className="hero-note scroll-cue fade-in delay-4">About</a>
        </section>
    );
};

export default Hero;
