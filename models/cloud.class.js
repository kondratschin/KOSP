/**
 * Class representing a cloud in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    width = 720;
    height = 480;
    speed = 0.25;

    /**
     * Create a cloud.
     * @param {number} x - The x-coordinate of the cloud.
     * @param {number} y - The y-coordinate of the cloud.
     */
    constructor(x, y) {
        super().loadImage("img/5_background/layers/2_second_layer/clouds3.png");
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Animate the cloud by moving it to the left.
     * If the cloud moves completely off the screen, reset its position.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            this.x -= this.speed;

            // Check if the image has moved completely off the screen
            if (this.x + this.width < 0) {
                this.x = 2880; // Reset the position to the right side of the screen
            }
        }, 1000 / 60);
    }
}