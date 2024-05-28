class dragonCurve {
    constructor(generations, sketch) {
        this.sketch = sketch;

        this.angle = this.sketch.HALF_PI;
        this.axiom = "FX";
        this.sentence = this.axiom;

        this.rules = [
            {
                a: "X",
                b: "X+YF"
            },
            {
                a: "Y",
                b: "FX-Y"
            }
        ];


        this.currentSegment = 0;
        this.scaleFactor = 0.992;
        this.zoomOutIndex = 0;
        this.generation = generations;
        for (let i = 0; i < generations; i++)
            this.generate();
    }

    generate() {
        let nextSentence = "";
        for (let i = 0; i < this.sentence.length; i++) {
            let current = this.sentence.charAt(i);
            let replace = "" + current;
            for (let j = 0; j < this.rules.length; j++) {
                if (current == this.rules[j].a) {
                    replace = this.rules[j].b;
                    break;
                }
            }
            nextSentence += replace;
        }
        this.sentence = nextSentence;
        return this.sentence;
    }

    show(num_segments, width, height) {
        this.sketch.resetMatrix();
        this.sketch.translate(width / 2, height / 3);
        this.sketch.colorMode(this.sketch.HSB);

        let len = width / 10 * this.sketch.pow(this.scaleFactor, this.zoomOutIndex);
        for (let i = 0; i <= this.currentSegment; i++) {
            this.sketch.stroke(360 * (i / this.sentence.length), 100, 100);
            let current = this.sentence.charAt(i);

            if (current == "F") {
                this.sketch.line(0, 0, 0, -len);
                this.sketch.translate(0, -len);
            } else if (current == "+") {
                this.sketch.rotate(this.angle);
            } else if (current == "-") {
                this.sketch.rotate(-this.angle);
            }
        }
        this.zoomOutIndex += 1.2;
        this.currentSegment += num_segments;
    }
}

export default dragonCurve;
