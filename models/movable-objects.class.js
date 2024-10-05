class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    characterFrame = [+90, +110, -215, -190];
    snakeFrame = [+45, +70, -120, -140];
    orcFrame = [+45, +70, -120, -120];
    endBossFrame = [+149, +120, -280, -195];
    coinFrame = [5.5, 5.5, -10, -10]; //mana uses the same coordinate system as coins
    flyingObjectFrame = [100, 135, -170, -200];
    endBossAttackFrame = [0, 0, 0, 0];
    energy = 100;
    lastHit = 0;
    collectedCoins = 0;
    collectedBottles = 0;
    isStaying = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0) {
                this.y += this.speedY;
                this.speedY += this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 256;
    }

    hit(damage) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in seconds
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy === 0;
    }

    getFrameCoordinates() {
        const frameMap = {
            Character: this.characterFrame,
            Snake: this.snakeFrame,
            Orc: this.orcFrame,
            Coins: this.coinFrame,
            FlyingObject: this.flyingObjectFrame,
            Mana: this.coinFrame, // Mana uses the same frame as Coins
            Endboss: this.endBossFrame
        };

        const frame = frameMap[this.constructor.name];
        if (frame) {
            return {
                x: this.x + frame[0],
                y: this.y + frame[1],
                width: this.width + frame[2],
                height: this.height + frame[3]
            };
        }

        return null;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        let i = 0;
        const displayNextImage = () => {
            if (i < images.length) {
                let path = images[i];
                this.img = this.imageCache[path];
                i++;
                setTimeout(displayNextImage, 100); // Adjust the duration as needed
            }
        };
        displayNextImage();
    }






    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump() {
        this.speedY = -25;
    }
}
