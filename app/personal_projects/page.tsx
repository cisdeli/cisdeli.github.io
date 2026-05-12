'use client'
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import Header from '@/app/ui/header'
import Footer from '@/app/ui/footer'
import { dcSketch, caSketch, threeDSketch, phyllotaxisSketch } from '@/app/utils/sketches';

const PersonalProjects = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <div className="content page-content" id="personal-projects">

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
                                <NextReactP5Wrapper sketch={dcSketch} />
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
                                <NextReactP5Wrapper sketch={threeDSketch} />
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
                                <NextReactP5Wrapper sketch={caSketch} />
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
                                <NextReactP5Wrapper sketch={phyllotaxisSketch} />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PersonalProjects;
