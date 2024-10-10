class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    collectedCoins = 0;
    collectedBottles = 0;
    isStaying = false;
    characterFrame = [+90, +110, -215, -190];
    snakeFrame = [+45, +70, -120, -140];
    orcFrame = [+45, +70, -120, -120];
    endBossFrame = [+149, +120, -280, -195];
    coinFrame = [5.5, 5.5, -10, -10];
    flyingObjectFrame = [100, 135, -170, -200];
    endBossAttackFrame = [0, 0, 0, 0];

    /**
     * Apply gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            this.updatePosition();
        }, 1000 / 25);
    }

    /**
     * Update the position of the object based on gravity.
     */
    updatePosition() {
        if (this.isAboveGround() || this.speedY < 0) {
            this.y += this.speedY;
            this.speedY += this.acceleration;
        }
    }

    /**
     * Check if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        return this.y < 256;
    }

    /**
     * Handle hit and reduce energy.
     * @param {number} damage - The amount of damage to inflict.
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Check if the object is hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 0.5;
    }

    /**
     * Check if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Get frame coordinates based on the object type.
     * @returns {Object|null} The frame coordinates or null if not applicable.
     */
    getFrameCoordinates() {
        const frameMap = {
            Character: this.characterFrame,
            Snake: this.snakeFrame,
            Orc: this.orcFrame,
            Coins: this.coinFrame,
            FlyingObject: this.flyingObjectFrame,
            Mana: this.coinFrame,
            Endboss: this.endBossFrame
        };

        if (this.constructor.name === 'Endboss' && !this.firstContact) {
            return null;
        }

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

    /**
     * Play animation by cycling through images.
     * @param {Array} images - The array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Play animation once by cycling through images.
     * @param {Array} images - The array of image paths.
     */
    playAnimationOnce(images) {
        let i = 0;
        const displayNextImage = () => {
            if (i < images.length) {
                let path = images[i];
                this.img = this.imageCache[path];
                i++;
                setTimeout(displayNextImage, 100);
            }
        };
        displayNextImage();
    }

    /**
     * Move the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Move the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Make the object jump.
     */
    jump() {
        this.speedY = -25;
    }
}