'use client'
import SectionHead from '@/app/ui/sectionHead'
import LazySketch from '@/app/ui/lazySketch';
import { dcSketch, caSketch, threeDSketch, phyllotaxisSketch } from '@/app/utils/sketches';
import ShaderCanvas from '@/app/ui/shaderCanvas';
import rubiksShader from '@/app/shaders/rubiks.frag';
import lightspeedShader from '@/app/shaders/lightspeed.frag';

const PersonalProjects = () => {
    return (
        <section className="content page-section" id="personal-projects">
            <SectionHead
                label="Side work"
                title="Personal Projects"
                intro="Shaders, fractals and generative sketches."
            />

            <div className="section-item">
                <div className="section-item-text">
                    <text className="item-title">Rubik&apos;s Cube</text>
                    <text className="section-subtitle">Rendered in a fragment shader, solved with CUDA (soon)</text>
                    <p className="item-text">
                        A side project to render a Rubik&apos;s cube entirely in a <span className="font-bold">fragment shader</span> and, eventually, solve it with <span className="font-bold">CUDA</span>. The viewer is done, the cube is raymarched and the layer turns are animated. It is running live in your browser right now. The solver is still in the works, so for now it plays a scramble and then the same moves in reverse to get back to a solved cube. The viewer is built with{' '}
                        <span className="gradient"><a href="https://github.com/cisdeli/ShaderHub" target="_blank" rel="noreferrer">ShaderHub</a></span>.
                    </p>
                </div>
                <div className="canvas-project-clip">
                    <div className="canvas-project-scale">
                        <ShaderCanvas source={rubiksShader} className="fern-canvas" />
                    </div>
                </div>
            </div>

            <div className="section-item">
                <div className="section-item-text">
                    <text className="item-title">ShaderHub</text>
                    <text className="section-subtitle">A Shadertoy-style GLSL runner with hot reload</text>
                    <p className="item-text">
                        I prefer writing code in my Neovim setup, so I built a minimal <span className="font-bold">Shadertoy-style runner</span> to stay in the editor: write a fragment shader, save it, and see the changes live. It is written in <span className="font-bold">C++ and OpenGL</span>, supports Shadertoy-like uniforms and switches between shaders in a folder. The one running here is <span className="font-bold">Lightspeed</span>, one of my own shaders. Check it out on{' '}
                        <span className="gradient"><a href="https://github.com/cisdeli/ShaderHub" target="_blank" rel="noreferrer">GitHub</a></span>.
                    </p>
                </div>
                <div className="canvas-project-clip">
                    <div className="canvas-project-scale">
                        <ShaderCanvas source={lightspeedShader} blend="glow" maxDpr={1} className="fern-canvas shader-fade" />
                    </div>
                </div>
            </div>

            <div className="section-item">
                <div className="section-item-text">
                    <text className="item-title">Dragon Curve Fractal</text>
                    <text className="section-subtitle">Y.A.S.S.F.</text>
                    <p className="item-text">
                        <span className="font-bold">Yet Another Self Similar Fractal</span>
                        . The animation you just saw was built with p5js and the code is available on my github repository{' '}
                        <span className="gradient"><a href="https://github.com/cisdeli/VisualHub/blob/main/Fractals/dragonCurve.js" target="_blank" rel="noreferrer">VisualHub</a></span>
                        . The Dragon Curve was first investigated by some NASA physicists.{' '}
                        <span className="italic">
                            The Heighway dragon can be constructed from a base line segment by replacing each segment by two segments with a right angle and with a rotation of 45° alternatively to the right and to the left
                        </span>{' '}
                        <span className="gradient"><a href="https://en.wikipedia.org/wiki/Dragon_curve" target="_blank" rel="noreferrer">(Wikipedia)</a></span>.
                    </p>
                </div>
                <div className="canvas-project-clip">
                    <div className="canvas-project-scale">
                        <LazySketch sketch={dcSketch} />
                    </div>
                </div>
            </div>

            <div className="section-item">
                <div className="section-item-text">
                    <text className="item-title">3D WEBGL Fun</text>
                    <text className="section-subtitle">No subtitle, just look at the fun animation</text>
                    <p className="item-text">
                        Yeah not much to say about this one. It consists of a really simple 3D animation built with P5js and WEBGL. Go take a look at the code if you want:{' '}
                        <span className="gradient"><a href="https://github.com/cisdeli/VisualHub/tree/main/P5-3D" target="_blank" rel="noreferrer">VisualHub</a></span>.
                    </p>
                </div>
                <div className="canvas-project-clip">
                    <div className="canvas-project-scale">
                        <LazySketch sketch={threeDSketch} />
                    </div>
                </div>
            </div>

            <div className="section-item">
                <div className="section-item-text">
                    <text className="item-title">1D Cellular Automata</text>
                    <text className="section-subtitle">Visualizing different rules of the elementary Cellular Automaton</text>
                    <p className="item-text">
                        <span className="italic">
                            A cellular automaton is a collection of &ldquo;colored&rdquo; cells on a grid of specified shape that evolves through a number of discrete time steps according to a set of rules based on the states of neighboring cells.
                        </span>{' '}
                        <span className="gradient"><a href="https://mathworld.wolfram.com/CellularAutomaton.html" target="_blank" rel="noreferrer">(Mathworld)</a></span>.
                        This is one of my favorites. Refresh the page to see a different rule. The code is also available on my github repository{' '}
                        <span className="gradient"><a href="https://github.com/cisdeli/VisualHub/tree/main/CellularAutomata" target="_blank" rel="noreferrer">VisualHub</a></span>.
                    </p>
                </div>
                <div className="canvas-project-clip">
                    <div className="canvas-project-scale">
                        <LazySketch sketch={caSketch} />
                    </div>
                </div>
            </div>

            <div className="section-item">
                <div className="section-item-text">
                    <text className="item-title">Phyllotaxis</text>
                    <text className="section-subtitle">My first p5js project</text>
                    <p className="item-text">
                        As the subtitle already mentioned, this was my first attempt at visualizing a math algorithm using JavaScript and P5js. It represents a concept in botany: the arrangement of leaves on a plant stem. In other words, a cool pattern.
                    </p>
                </div>
                <div className="canvas-project-clip">
                    <div className="canvas-project-scale">
                        <LazySketch sketch={phyllotaxisSketch} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalProjects;
