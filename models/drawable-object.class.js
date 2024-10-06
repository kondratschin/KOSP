class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    height = 250;
    width = 250;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

}