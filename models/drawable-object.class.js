class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    height = 250;
    width = 250;

    /**
     * Loads an image from the given path and assigns it to the img property.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from the given array of paths and caches them.
     * @param {Array<string>} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a frame around the object if certain conditions are met.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        const shouldDrawFrame =
            (this instanceof Character) ||
            (this instanceof Endboss && this.firstContact) ||
            (this instanceof Orc) ||
            (this instanceof Snake) ||
            (this instanceof Coins) ||
            (this instanceof Mana) ||
            (this instanceof FlyingObject);
        const SnakeAlive = !(this instanceof Snake && this.isDead());
        const OrcAlive = !(this instanceof Orc && this.isDead());

        if (shouldDrawFrame && SnakeAlive && OrcAlive) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'rgba(0, 0, 0, 0)';

            const frame = this.getFrameCoordinates();
            if (frame) {
                ctx.rect(frame.x, frame.y, frame.width, frame.height);
            }

            ctx.stroke();
        }
    }

    /**
     * Placeholder method to get frame coordinates.
     */
    getFrameCoordinates() {
        return null;
    }
}