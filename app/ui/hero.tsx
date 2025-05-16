'use client'
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { fernSketch } from '@/app/utils/sketches';

const Hero = () => {
    return (
        <div className="content flex flex-col md:flex-row justify-between items-start gap-8 px-4 py-10 md:px-6" id="heroSection">
            <div className="w-full md:max-w-5xl">
                <h1 className="section-title text-base md:text-1xl lg:text-7xl xl:text-8xl leading-tight">Hi, I'm Pedro!</h1>
                <h2 className="section-subtitle text-sm md:text-4xl lg:text-5xl leading-relaxed mb-4 md:mb-6">Welcome to my portfolio</h2>
                
                {/* Canvas on mobile - only visible on small screens */}
                <div className="flex w-full my-4 md:hidden">
                    <div className="w-3/4 transform scale-75 origin-left ml-0">
                        <NextReactP5Wrapper sketch={fernSketch} />
                    </div>
                </div>
                
                <div className="space-y-10 item-text">
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                        I am a Brazilian <span className="font-bold">Software Developer</span> and <span className="font-bold">Machine Learning Engineer</span> focusing on developing solutions for agronomy and helping bridge the gap between the field and technology.
                        Currently at <span className="gradient font-bold"><a href="https://ciampitti-lab.github.io/" target="_blank">Ciampittilab</a></span>.
                    </p>
                    
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                        I have a <span className="font-bold">Computer Science Degree</span> from <span className="font-bold">University of São Paulo</span>, which gave me a strong background in <span className="font-bold">Programming</span> and <span className="font-bold">Mathematics</span>.
                    </p>
                    
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                        My areas of interest are <span className="font-bold">Image Processing, Machine Learning, Computer Vision, Data Science and Precision Agriculture</span>.
                    </p>
                    
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                        My tech stack includes <span className="font-bold">C, C++, Python, PyTorch, TensorFlow, Java, JavaScript, TypeScript, React.js, Next.js, Lua, Linux, and Neovim (btw)</span>, I'm also getting better at Rust and Go.
                    </p>
                    
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                        My native language is <span className="font-bold">Portuguese</span> and I've been studying <span className="font-bold">English</span> since I was five years old.
                    </p>
                    
                    <p className="text-base sm:text-lg md:text-xl italic mt-6 leading-relaxed">
                        Use a device with a large screen for a better user experience and explore to learn more about my experiences and projects.
                    </p>
                </div>
            </div>
            
            {/* Canvas on desktop - only visible on medium screens and up */}
            <div className="hidden md:flex flex-shrink-0 mt-0 justify-center items-center">
                <NextReactP5Wrapper sketch={fernSketch} />
            </div>
        </div>
    );
};

export default Hero;

