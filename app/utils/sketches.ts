import Fern from '@/app/utils/fern';
import DragonCurve from '@/app/utils/dragonCurve';
import { Sketch } from '@p5-wrapper/react';

const width = 450;
const height = 600;

export const threeDSketch: Sketch = (p5: any) => {
    let w = 100;
    let angle = 0;
    let maxD: any;
    let ma: any;
    let zoom = 500;


    p5.setup = () => {
        p5.createCanvas(width, height, p5.WEBGL);
        maxD = p5.dist(0, 0, 200, 200);
        ma = p5.atan(p5.cos(p5.QUARTER_PI));
    }

    p5.draw = () => {
        p5.ortho(-zoom, zoom, zoom, -zoom, 0, 5000);
        p5.background("#080808");
        p5.rotateX(p5.frameCount * (-ma) * 0.01);
        p5.rotateY(p5.frameCount * (-p5.QUARTER_PI) * 0.01);

        for (let i = 0; i < height; i += w) {
            for (let j = 0; j < width; j += w) {
                p5.push();
                let d = p5.dist(j, i, width / 2, height / 2);
                let offset = p5.map(d, 1, maxD, -10, 10);
                let a = angle + offset;
                let h = p5.floor(p5.map(p5.sin(a), -1, 1, 100, 500));
                p5.translate(j - width / 2, 0, i - height / 2);
                p5.box(w, h, w);
                p5.pop();
            }
        }
        angle += 0.1;

    };
};

export const phyllotaxisSketch: Sketch = (p5: any) => {
    let n = 0;
    let c = 7;
    p5.setup = () => {
        p5.createCanvas(width, height);
    }

    p5.draw = () => {
        let o = n * 137.5;
        let r = c * p5.sqrt(n);

        let x = r * p5.cos(o) + width / 2;
        let y = r * p5.sin(o) + height / 2;

        p5.colorMode(p5.HSB)
        p5.fill(n % 256, 255, 255);
        p5.ellipse(x, y, 12, 12);
        if (n < 500) {
            n++;
        } else {
            p5.noLoop();
        }
    }
}

export const fernSketch: Sketch = (p5: any) => {
    let fern: any;
    p5.setup = () => {
        p5.createCanvas(width, height);
        fern = new Fern(width, height, 60, p5);
    }

    p5.draw = () => {
        fern.show();
        if (!fern.done) {
            fern.get_points(100);
        } else {
            p5.noLoop();
        }
    };
};

export const caSketch: Sketch = (p5) => {
    const cellWidth = 5;
    let startY = 0;

    let currGen: any = [];
    let genCount = 0;
    const rules = [30, 110, 54, 90, 122, 126, 60, 45, 77, 73, 57];
    const ruleNumber = rules[Math.floor(Math.random() * rules.length)];
    let ruleSet: any;

    function setNewState(left: any, state: any, right: any) {
        const surroundings = '' + left + state + right;
        const value = 7 - parseInt(surroundings, 2);
        return parseInt(ruleSet[value]);
    }
    p5.setup = () => {
        p5.createCanvas(width, height);


        let cellNum = width / cellWidth;
        for (let i = 0; i < cellNum; i++) {
            currGen[i] = 0;
        }
        currGen[p5.floor(cellNum / 2)] = 1;
        ruleSet = ruleNumber.toString(2).padStart(8, "0");
    }

    p5.draw = () => {
        const len = currGen.length
        for (let i = 0; i < len; i++) {
            const x = i * cellWidth;
            p5.noStroke();
            if (currGen[i])
                p5.fill(255);
            else
                p5.noFill();
            p5.square(x, startY, cellWidth);
        }
        startY += cellWidth;

        let nextGen = [];
        for (let i = 0; i < len; i++) {
            nextGen[i] = setNewState(currGen[(i - 1 + len) % len], currGen[i], currGen[(i + 1 + len) % len])
        }
        if (genCount == 120) {
            p5.noLoop();
        }
        currGen = nextGen;
        genCount++;
    };
};

export const dcSketch: Sketch = (p5) => {
    let dc: any;
    let num_segments = 20;
    let frameCounter = 0;
    p5.setup = () => {
        p5.createCanvas(width, height);
        dc = new DragonCurve(12, p5);
    }

    p5.draw = () => {

        p5.background("#080808");
        dc.show(num_segments, width, height);
        if (dc.currentSegment >= dc.sentence.length) {
            p5.noLoop();
        }
        if (frameCounter > 150) {
            num_segments++;
        }
        frameCounter++;
    };
};
