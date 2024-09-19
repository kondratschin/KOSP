class FlyingObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/6_fire_attack/fire_attack/fire1.png');;
        // this.x = 100;
        // this.y = 100;
        this.height = 220;
        this.width = 200;
        this.fire(x, y);
    }


    fire(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 30;
        // this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    stop() {
        clearInterval(this.intervalId);
    }
}