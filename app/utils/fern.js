class Fern {
    constructor(startX, startY, scale, sketch) {
        this.sketch = sketch;

        this.startX = startX;
        this.startY = startY;

        this.x = 0;
        this.y = 0;
        this.scale = scale;

        this.xi = 0.0;
        this.yi = 0.0;

        this.iter = 0;
        this.maxIters = 100000;
        this.done = false;

        this.points = [];
        this.coefficients = [
            {
                name: "f1",
                a: 0,
                b: 0,
                c: 0,
                d: 0.16,
                e: 0,
                f: 0,
                p: 0.01
            },
            {
                name: "f2",
                a: 0.85,
                b: 0.04,
                c: -0.04,
                d: 0.85,
                e: 0,
                f: 1.60,
                p: 0.85,
            },
            {
                name: "f3",
                a: 0.20,
                b: -0.26,
                c: 0.23,
                d: 0.22,
                e: 0,
                f: 1.60,
                p: 0.07
            },
            {
                name: "f4",
                a: -0.15,
                b: 0.28,
                c: 0.26,
                d: 0.24,
                e: 0,
                f: 0.44,
                p: 0.07
            }
        ];
    }

    get_points(n) {
        this.sketch.push();
        for (let i = 0; i < n; i++) {
            if (this.iter < this.maxIters) {
                const r = Math.random();
                let t;

                if (r < this.coefficients[0].p) {
                    t = this.coefficients[0];
                } else if (r < this.coefficients[0].p + this.coefficients[1].p) {
                    t = this.coefficients[1];
                } else if (r < this.coefficients[1].p + this.coefficients[2].p) {
                    t = this.coefficients[2];
                } else {
                    t = this.coefficients[3];
                }

                this.xi = t.a * this.x + t.b * this.y + t.e;
                this.yi = t.c * this.x + t.d * this.y + t.f;

                this.points.push({ x: this.xi * this.scale, y: this.startY - this.yi * this.scale });
                this.x = this.xi
                this.y = this.yi
                this.iter += 1;
            } else {
                this.done = true;
                break;
            }
        }
        this.sketch.pop();
    }

    show() {
        this.sketch.translate(this.startX / 2, 10);
        this.sketch.stroke(100, 23, 242);
        for (let i = 0; i < this.points.length; i++) {
            this.sketch.point(this.points[i].x, this.points[i].y);
        }
    }
}

export default Fern;
