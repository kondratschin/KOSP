/**
 * Class representing a coin in the game.
 * @extends MovableObject
 */
class Coins extends MovableObject {
    y = 314;
    x = 200;
    height = 32;
    width = 32;

    // Array of coin images for animation
    IMAGES_COIN = [
        'img/8_coin/coin1.png',
        'img/8_coin/coin2.png',
        'img/8_coin/coin3.png',
        'img/8_coin/coin4.png',
        'img/8_coin/coin5.png',
        'img/8_coin/coin6.png',
        'img/8_coin/coin7.png',
        'img/8_coin/coin8.png',
        'img/8_coin/coin9.png',
        'img/8_coin/coin10.png'
    ];

    /**
     * Create a coin.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Animate the coin by cycling through its images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}