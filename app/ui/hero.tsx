'use client'
import FernCanvas from '@/app/ui/fernCanvas';
import SocialLinks from '@/app/ui/socialLinks';
import SiteNav from '@/app/ui/siteNav';

const Hero = () => {
    return (
        <section className="hero" id="heroSection">
            <SiteNav current="home" className="fade-in delay-3" />

            {/* Lighting */}
            <div className="hero-backdrop" aria-hidden="true" />

            {/* Main fern, angled and zoomed; runs past the bottom of the hero. The wrap is 2.4 hero
                heights tall: the fern fades out between 1.5 and 2, the motes can drift further */}
            <div className="hero-fern-wrap" aria-hidden="true">
                <FernCanvas
                    points={500000} perFrame={1000} maxDpr={1.5} extend={3} blastAt={0.3}
                    floaters={3500} floatIn="#about" tailFade={[1.5 / 2.4, 2 / 2.4]}
                    frameClassName="hero-fern" className="fade-in delay-2"
                />
            </div>

            <div className="hero-note hero-note-left hero-intro fade-up delay-2">
                <div className="hero-intro-row">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-fern-56.svg" alt="" className="hero-logo" width={549} height={559} />
                    <h1 className="hero-title">
                        <strong className="hero-name">Pedro Cisdeli</strong>,<br />
                        Software developer &amp; ML engineer,<br />
                        Ph.D. student at Purdue University
                    </h1>
                </div>
                <SocialLinks className="hero-socials" />
            </div>

            <a href="#about" className="hero-note scroll-cue fade-in delay-4">About</a>
        </section>
    );
};

export default Hero;
