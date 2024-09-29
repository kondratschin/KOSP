class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    characterFrame = [+90, +110, -215, -190];
    snakeFrame = [+45, +70, -120, -140];
    coinFrame = [5.5, 5.5, -10, -10];
    flyingObjectFrame = [100, 135, -170, -200];
    energy = 100;
    lastHit = 0;
    coins = 0;
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

    hit() {
        this.energy -= 5;
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
        if (this instanceof Character) {
            return {
                x: this.x + this.characterFrame[0],
                y: this.y + this.characterFrame[1],
                width: this.width + this.characterFrame[2],
                height: this.height + this.characterFrame[3]
            };
        } else if (this instanceof Enemy) {
            return {
                x: this.x + this.snakeFrame[0],
                y: this.y + this.snakeFrame[1],
                width: this.width + this.snakeFrame[2],
                height: this.height + this.snakeFrame[3]
            };
        } else if (this instanceof Coins) {
            return {
                x: this.x + this.coinFrame[0],
                y: this.y + this.coinFrame[1],
                width: this.width + this.coinFrame[2],
                height: this.height + this.coinFrame[3]
            };
        } else if (this instanceof FlyingObject) {
            return {
                x: this.x + this.flyingObjectFrame[0],
                y: this.y + this.flyingObjectFrame[1],
                width: this.width + this.flyingObjectFrame[2],
                height: this.height + this.flyingObjectFrame[3]
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
