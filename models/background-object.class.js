/**
 * Class representing a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

    /**
     * Create a background object.
     * @param {string} imagePath - The path to the image.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {number} width - The width of the object.
     * @param {number} height - The height of the object.
     */
    constructor(imagePath, x, y, width, height) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Draw the background object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}