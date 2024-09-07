class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 250;
    width = 250;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    characterFrame = [+90, +110, -215, -190];
    snakeFrame = [+45, +70, -120, -140];



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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    

    


    /**
     * 
     * @param {Array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
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