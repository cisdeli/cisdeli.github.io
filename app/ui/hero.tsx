'use client'
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { fernSketch } from '@/app/utils/sketches';

const techStack = [
    'Python', 'PyTorch', 'TensorFlow', 'C / C++',
    'TypeScript', 'React', 'Next.js', 'Rust', 'Go', 'Linux', 'Neovim',
];

const Hero = () => {
    return (
        <section
            className="content flex flex-col md:flex-row md:items-start pt-8 pb-6 md:pt-10 md:pb-8"
            id="heroSection"
        >
            {/* ── Left column ── */}
            <div className="flex-1 md:pr-8">

                {/* Title */}
                <div className="fade-up">
                    <h1 className="section-title">
                        Hi, I&rsquo;m<br />Pedro!
                    </h1>
                </div>

                {/* Subtitle + accent line */}
                <div className="mt-5 mb-10 fade-up delay-1">
                    <p className="section-subtitle">
                        Software Developer &amp; ML Engineer
                    </p>
                    <span className="accent-line" />
                </div>

                {/* Mobile canvas — scaled down, masked, centered */}
                <div className="md:hidden flex justify-center mb-10 fade-in delay-2">
                    <div className="canvas-mobile-clip">
                        <div className="canvas-mobile-scale">
                            <NextReactP5Wrapper sketch={fernSketch} />
                        </div>
                    </div>
                </div>

                {/* Body copy */}
                <div className="item-text space-y-5 max-w-xl fade-up delay-2">
                    <p>
                        Brazilian engineer bridging the gap between the field and technology,
                        currently at{' '}
                        <a
                            href="https://ciampitti-lab.github.io/"
                            target="_blank"
                            rel="noreferrer"
                            className="gradient font-medium"
                        >
                            Ciampitti Lab
                        </a>
                        . My work sits at the intersection of{' '}
                        <span className="font-semibold">
                            Image Processing, Computer Vision, and Precision Agriculture
                        </span>
                        .
                    </p>
                    <p>
                        CS graduate from the{' '}
                        <span className="font-semibold">University of São Paulo</span>,
                        currently pursuing a{' '}
                        <span className="font-semibold">Ph.D. at Purdue University</span>{' '}
                        focused on ML-driven agricultural systems.
                    </p>
                </div>

                {/* Tech stack */}
                <div className="mt-8 fade-up delay-3">
                    <p className="tech-label mb-3">Stack</p>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((t) => (
                            <span key={t} className="tech-pill">{t}</span>
                        ))}
                    </div>
                </div>

            </div>

            {/* ── Right column: canvas (desktop only) ── */}
            <div
                className="hidden md:block flex-shrink-0 canvas-fade fade-in delay-2"
                style={{ marginTop: '-1rem' }}
            >
                <NextReactP5Wrapper sketch={fernSketch} />
            </div>

        </section>
    );
};

export default Hero;
