import './style.scss'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BALLZ = [];

let LEFT, UP, RIGHT, DOWN;
let friction = 0.1;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtr(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mag() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    mult(n) {
        return new Vector(this.x*n, this.y*n);
    }

    drawVec(start_x, start_y, n, color) {
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x*n, start_y + this.y*n);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vel = new Vector(0,0);
        this.acc = new Vector(0,0);
        this.acceleration = 1;
        this.player = false;
        BALLZ.push(this);
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
    }

    display() {
        this.vel.drawVec(this.x, this.y, 10, "green");
        this.acc.drawVec(this.x, this.y, 100, "blue");
    }
}

function keyControl(b) {
    canvas.addEventListener('keydown', function(e) {
        if (e.keyCode === 37) {
            LEFT = true;
        }
        if (e.keyCode === 38) {
            UP = true;
        }
        if (e.keyCode === 39) {
            RIGHT = true;
        }
        if (e.keyCode === 40) {
            DOWN = true;
        }
    });

    canvas.addEventListener('keyup', function(e) {
        if (e.keyCode === 37) {
            LEFT = false;
        }
        if (e.keyCode === 38) {
            UP = false;
        }
        if (e.keyCode === 39) {
            RIGHT = false;
        }
        if (e.keyCode === 40) {
            DOWN = false;
        }
    });

    if (LEFT) {
        b.acc.x = -b.acceleration;
    }
    if (UP) {
        b.acc.y = -b.acceleration;
    }
    if (RIGHT) {
        b.acc.x = b.acceleration;
    }
    if (DOWN) {
        b.acc.y = b.acceleration;
    }

    if (!UP && !DOWN) {
        b.acc.y = 0;
    }
    if (!RIGHT && !LEFT) {
        b.acc.x = 0;
    }

    b.vel = b.vel.add(b.acc);
    b.vel = b.vel.mult(1 - friction);
    b.x += b.vel.x;
    b.y += b.vel.y;
}

// setInterval(function() {
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//     move();
//     drawBall(x, y, 20);
// }, 1000/60);

function mainLoop() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    BALLZ.forEach(ball => {
        ball.drawBall();
        if (ball.player) {
            keyControl(ball);
        }

        ball.display();
    });

    requestAnimationFrame(mainLoop);
}

let Ball1 = new Ball(200, 200, 30);
let Ball2 = new Ball(300, 250, 40);
Ball1.player = true;
Ball2.player = true;

requestAnimationFrame(mainLoop);





