'use client'
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import Header from '@/app/ui/header'
import { dcSketch, caSketch, threeDSketch, phyllotaxisSketch } from '@/app/utils/sketches';

const ThirdSection = () => {
    return (
        <div>
            <Header />
            <div className="content" id="thirdSection">
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Dragon Curve Fractal</text>
                            <text className="section-subtitle">Y.A.S.S.F.</text>
                            <p className="item-text">
                                <span className="font-bold">Yet Another Self Similar Fractal</span>
                                . The animation you just saw was built with p5js
                                and the code is available on my github repository
                                <span className="gradient"><a href="https://github.com/cisdeli/VisualHub/blob/main/Fractals/dragonCurve.js" target="_blank"> VisualHub</a></span>
                                . The Dragon Curve was first investigated by some NASA physicists. Crazy right?
                                <span className="italic">
                                    The Heighway dragon can be constructed from a base line segment by replacing each segment by two segments with a right angle and with a rotation of 45° alternatively to the right and to the left
                                </span>
                                <span className="gradient"><a href="https://en.wikipedia.org/wiki/Dragon_curve" target="_blank"> (Wikipedia)</a></span>.
                            </p>
                        </div>
                    </div>
                    <NextReactP5Wrapper sketch={dcSketch} />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">3D WEBGL Fun</text>
                            <text className="section-subtitle">No subtitle, just look at the fun animation</text>
                            <p className="item-text">Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</p>
                        </div>
                    </div>
                    <NextReactP5Wrapper sketch={threeDSketch} />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">1D Cellular Automata</text>
                            <text className="section-subtitle">Visualizing different rules of the elementary Cellular Automaton</text>
                            <p className="item-text">Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</p>
                        </div>
                    </div>
                    <NextReactP5Wrapper sketch={caSketch} />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Phyllotaxis</text>
                            <text className="section-subtitle">My first p5js project</text>
                            <p className="item-text">Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</p>
                        </div>
                    </div>
                    <NextReactP5Wrapper sketch={phyllotaxisSketch} />
                </div>
            </div>
        </div>
    );
};

export default ThirdSection;


