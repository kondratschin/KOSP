class MovableObject extends DrawableObject{


    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    characterFrame = [+90, +110, -215, -190];
    snakeFrame = [+45, +70, -120, -140];
    energy = 100;
    lastHit = 0;

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
            }
            return null;
        }

        drawFrame(ctx) {
            if (this instanceof Character || this instanceof Enemy) {
                ctx.beginPath();
                ctx.lineWidth = '5';
                ctx.strokeStyle = 'red';

                const frame = this.getFrameCoordinates();
                if (frame) {
                    ctx.rect(frame.x, frame.y, frame.width, frame.height);
                }

                ctx.stroke();
            }
        }


        playAnimation(images) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
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