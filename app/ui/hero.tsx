'use client'
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { fernSketch } from '@/app/utils/sketches';

const Hero = () => {
    return (
        <div className="content flex flex-row justify-center items-center" id="heroSection">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                {/* This div will be the background container for the p5 canvas */}
                <div className="text-left flex flex-col">
                    <text className="section-title">Hi, I'm Pedro!</text>
                    <text className="section-subtitle">Welcome to my portfolio</text>
                    <p className="item-text">
                        I am a Brazilian <span className="font-bold">Software Developer</span> and <span className="font-bold">Machine Learning Engineer </span>
                        currently at <span className="gradient"><a href="https://ciampittilab.wixsite.com/ciampitti-lab" target="_blank">Ciampittilab </a></span>
                        focusing on developing solutions for agronomy and helping bridge the gap between the field and technology.
                        I have a <span className="font-bold">Computer Science Degree</span> from <span className="font-bold">University of São Paulo</span>, which gave me
                        a strong background in <span className="font-bold">Programming</span> and <span className="font-bold">Mathematics</span>.
                        My areas of interest are <span className="font-bold">Image Processing, Machine Learning, Computer Vision, Data Science and Precision Agriculture</span>.
                        My tech stack includes <span className="font-bold">C, C++, Python, PyTorch, TensorFlow, Java, JavaScript, TypeScript, React.js, Next.js, Lua, Linux, and Neovim (btw)</span>
                        , I'm also getting better at Rust and Go. My native language is <span className="font-bold">Portuguese </span>
                        and I've been studying <span className="font-bold">English</span> since I was five years old.
                        Use a device with a big screen for a better UX and take a look around to learn more about my experience and projects.
                    </p>
                </div>
            </div>
            <div className="hidden md:block">
                <NextReactP5Wrapper sketch={fernSketch} />
            </div>
        </div>
    );
};

export default Hero;

