import SectionHead from '@/app/ui/sectionHead';

const techStack = [
    'Python', 'PyTorch', 'TensorFlow', 'C / C++',
    'TypeScript', 'React', 'Next.js', 'Rust', 'Go', 'Linux', 'Neovim',
];

const About = () => {
    return (
        <section className="content about" id="about">
            <SectionHead label="Intro" title="About" />

            <div>
                <div className="item-text space-y-5">
                    <p>
                        I&rsquo;m a Brazilian engineer bridging the gap between the field and
                        technology, currently at{' '}
                        <a
                            href="https://ciampitti-lab.github.io/"
                            target="_blank"
                            rel="noreferrer"
                            className="gradient font-medium"
                        >
                            Ciampitti Lab
                        </a>
                        , focused on{' '}
                        <span className="font-semibold">
                            image processing, computer vision, and precision agriculture
                        </span>
                        .
                    </p>
                    <p>
                        I graduated in CS from the{' '}
                        <span className="font-semibold">University of São Paulo</span>{' '}
                        and I&rsquo;m currently pursuing a{' '}
                        <span className="font-semibold">Ph.D. at Purdue University</span>{' '}
                        on ML-driven agricultural systems.
                    </p>
                </div>

                <div className="mt-8">
                    <p className="tech-label mb-3">Stack</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {techStack.map((t) => (
                            <span key={t} className="tech-pill">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
