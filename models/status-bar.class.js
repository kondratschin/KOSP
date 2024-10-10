class StatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_interface/stamina_corner1.png',
        'img/7_statusbars/2_interface/stamina_full_bar.png',
        'img/7_statusbars/2_interface/stamina_corner2.png',
        'img/7_statusbars/2_interface/stamina_middle_corner.png',
        'img/7_statusbars/2_interface/stamina_point.png',
        'img/7_statusbars/2_interface/hp_corner1.png',
        'img/7_statusbars/2_interface/hp_full.png',
        'img/7_statusbars/2_interface/hp_corner2.png',
    ];

    percentage = 100;
    energyBoss = 20;

    /**
     * Create a status bar.
     * @param {string} initMethod - The initialization method.
     * @param {number|null} energy - The energy level for the boss.
     */
    constructor(initMethod = 'leftCorner', energy = null) {
        super();
        this.loadImages(this.IMAGES);
        this.initialize(initMethod, energy);
    }

    /**
     * Initialize the status bar based on the provided method.
     * @param {string} initMethod - The initialization method.
     * @param {number|null} energy - The energy level for the boss.
     */
    initialize(initMethod, energy) {
        switch (initMethod) {
            case 'leftCorner':
                this.leftCorner();
                break;
            case 'rightCorner':
                this.rightCorner();
                break;
            case 'setPercentage':
                this.setPercentage(this.percentage);
                break;
            case 'leftCornerBoss':
                this.leftCornerBoss();
                break;
            case 'rightCornerBoss':
                this.rightCornerBoss();
                break;
            case 'setPercentageBoss':
                this.setPercentageBoss(this.energyBoss);
                break;
            default:
                console.warn(`Unknown initMethod: ${initMethod}`);
        }
    }

    /**
     * Set the status bar to the left corner for stamina.
     */
    leftCorner() {
        this.img = this.imageCache[this.IMAGES[0]];
        this.setPosition(102, 31, 4, 14);
    }

    /**
     * Set the status bar to the right corner for stamina.
     */
    rightCorner() {
        this.img = this.imageCache[this.IMAGES[2]];
        this.setPosition(219, 31, 4, 14);
    }

    /**
     * Set the percentage of the stamina bar.
     * @param {number} percentage - The percentage of the stamina bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        this.img = this.imageCache[this.IMAGES[1]];
        this.setPosition(106, 31, 113 * (percentage / 100), 14);
    }

    /**
     * Set the status bar to the left corner for boss energy.
     */
    leftCornerBoss() {
        this.img = this.imageCache[this.IMAGES[7]];
        this.setPosition(617, 31, 4, 14);
    }

    /**
     * Set the status bar to the right corner for boss energy.
     */
    rightCornerBoss() {
        this.img = this.imageCache[this.IMAGES[5]];
        this.setPosition(500, 31, 4, 14);
    }

    /**
     * Set the percentage of the boss energy bar.
     * @param {number} newEnergyLevel - The new energy level for the boss.
     */
    setPercentageBoss(newEnergyLevel) {
        this.img = this.imageCache[this.IMAGES[6]];
        const width = 113 * (newEnergyLevel / this.energyBoss);
        this.setPosition(617 - width, 31, width, 14);
    }

    /**
     * Helper method to set position and size.
     * @param {number} x - The x-coordinate of the status bar.
     * @param {number} y - The y-coordinate of the status bar.
     * @param {number} width - The width of the status bar.
     * @param {number} height - The height of the status bar.
     */
    setPosition(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}