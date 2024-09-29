class FlyingObject extends MovableObject {
    otherDirection = false;
    fireSound = new Audio('audio/fire.mp3');
    constructor(x, y, direction) {
        super().loadImage('img/6_fire_attack/fire_attack/fire1.png');
        // this.x = 100;
        // this.y = 100;
        this.height = 220;
        this.width = 200;
        this.fire(x, y, direction);
    }


    fire(x, y, direction) {
        this.fireSound.play();
        if (direction === "front") {
            this.x = x;
            this.y = y;
            this.speed = 30;
            // this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);
        }
        else {
            this.backFire(x, y);
        }
    }

    backFire(x, y) {
        this.x = x;
        this.y = y;
        this.speed = -30;
        setInterval(() => {
            this.x -= 10;
        }, 25);
    }



}