class MagicBar extends DrawableObject {
    // Array of image paths for different states of the magic bar
    IMAGES = [
        'img/7_statusbars/2_interface/magic_corner1.png',
        'img/7_statusbars/2_interface/magic_full_bar.png',
        'img/7_statusbars/2_interface/magic_corner2.png'
    ];

    // Initial percentage of the magic bar
    percentage = 0;

    /**
     * Constructor to initialize the MagicBar object
     * @param {string} initMethod - Method to initialize the magic bar ('leftCorner', 'rightCorner', 'setPercentage')
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
                throw new Error(`Unknown initMethod: ${initMethod}`);
        }
    }

    /**
     * Initialize the magic bar at the left corner
     */
    leftCorner() {
        this.img = this.imageCache[this.IMAGES[0]];
        this.x = 102;
        this.y = 50;
        this.width = 4;
        this.height = 12;
    }

    /**
     * Initialize the magic bar at the right corner
     */
    rightCorner() {
        this.img = this.imageCache[this.IMAGES[2]];
        this.x = 194;
        this.y = 50;
        this.width = 4;
        this.height = 12;
    }

    /**
     * Set the percentage of the magic bar
     * @param {number} percentage - The percentage to set (0 to 1)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        this.img = this.imageCache[this.IMAGES[1]];
        this.width = 88 * percentage;
        this.x = 106;
        this.y = 50;
        this.height = 12;
    }
}
