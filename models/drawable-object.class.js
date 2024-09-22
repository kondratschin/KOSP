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
            if (this instanceof Character || this instanceof Enemy || this instanceof Coins) {
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

}