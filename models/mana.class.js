class Mana extends MovableObject {
    // Default position and size of the Mana object
    y = 314;
    x = 200;
    height = 32;
    width = 32;

    // Array containing the image paths for the Mana object
    IMAGES_MANA = [
        'img/6_fire_attack/mana_fire.png',
    ];

    /**
     * Constructor for the Mana class
     * @param {number} x - The x-coordinate for the Mana object
     * @param {number} y - The y-coordinate for the Mana object
     */
    constructor(x, y) {
        super().loadImage('img/6_fire_attack/mana_fire.png');
        this.loadImages(this.IMAGES_MANA);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Animates the Mana object by cycling through its images
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MANA);
        }, 200);
    }
}