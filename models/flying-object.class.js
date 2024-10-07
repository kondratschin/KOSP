class FlyingObject extends MovableObject {
    otherDirection = false;
    fireSound = new Audio('audio/fire.mp3');

    constructor(x, y, direction) {
        super().loadImage('img/6_fire_attack/fire_attack/fire1.png');
        this.height = 220;
        this.width = 200;
        this.fire(x, y, direction);
    }

    /**
     * Initiates the firing action of the flying object.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     * @param {string} direction - The direction of the fire ("front" or "back").
     */
    fire(x, y, direction) {
        if (!soundMute) {
            this.fireSound.play();
        }
        if (direction === "front") {
            this.x = x;
            this.y = y;
            this.speed = 30;
            setInterval(() => {
                this.x += 10;
            }, 25);
        } else {
            this.backFire(x, y);
        }
    }

    /**
     * Handles the backfire action of the flying object.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    backFire(x, y) {
        this.x = x;
        this.y = y;
        this.speed = -30;
        setInterval(() => {
            this.x -= 10;
        }, 25);
    }
}