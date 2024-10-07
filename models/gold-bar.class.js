class GoldBar extends DrawableObject {
    // Array of image paths
    IMAGES = [
        'img/7_statusbars/2_interface/energy_corner1.png',
        'img/7_statusbars/2_interface/energy_full_bar.png',
        'img/7_statusbars/2_interface/energy_corner2.png'
    ];

    // Initial percentage value
    percentage = 0;

    /**
     * Constructor to initialize the GoldBar object
     * @param {string} initMethod - Method to initialize the GoldBar ('leftCorner', 'rightCorner', 'setPercentage')
     */
    constructor(initMethod = 'leftCorner') {
        super();
        this.loadImages(this.IMAGES);

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
            default:
                console.warn(`Unknown initMethod: ${initMethod}`);
        }
    }

    /**
     * Initialize the GoldBar to be displayed at the left corner
     */
    leftCorner() {
        this.img = this.imageCache[this.IMAGES[0]];
        this.x = 102;
        this.y = 67;
        this.width = 4;
        this.height = 12;
    }

    /**
     * Initialize the GoldBar to be displayed at the right corner
     */
    rightCorner() {
        this.img = this.imageCache[this.IMAGES[2]];
        this.x = 194;
        this.y = 67;
        this.width = 4;
        this.height = 12;
    }

    /**
     * Set the percentage of the GoldBar and adjust its width accordingly
     * @param {number} percentage - The percentage to set (0 to 1)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        this.img = this.imageCache[this.IMAGES[1]];
        this.width = 88 * percentage;
        this.x = 106;
        this.y = 67;
        this.height = 12;
    }
}
