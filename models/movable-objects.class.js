class MovableObject {
    x = 120;
    y = 256;
    img;
    height = 250;
    width = 250;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
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
        console.log('move right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;

            // Check if the image has moved completely off the screen
            if (this.x + this.width < 0) {
                this.x = 719; // Reset the position to the right side of the screen
            }
        }, 1000 / 60);
    }
}