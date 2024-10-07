class GUI extends DrawableObject {
    // Array of image paths used in the GUI
    IMAGES = [
        'img/7_statusbars/1_icons/character_info_full.png',
        'img/2_character_knight/1_idle/long_idle/idle1.png',
        'img/7_statusbars/1_icons/icon_coin.png',
        'img/7_statusbars/1_icons/icon_magic_attack.png',
        'img/7_statusbars/1_icons/endboss_info_full.png',
        'img/4_enemy_boss/2_idle/Idle1.png'
    ];

    constructor(initMethod = 'GUI') {
        super();
        this.loadImages(this.IMAGES);
        this.initializeGUI(initMethod);
    }

    // Initialize the GUI based on the provided method
    initializeGUI(initMethod) {
        switch (initMethod) {
            case 'GUI':
                this.guiFrame();
                break;
            case 'GUIBoss':
                this.guiFrameBoss();
                break;
            case 'knightGUI':
                this.knightGUI();
                break;
            case 'goldGUI':
                this.goldGUI();
                break;
            case 'magicGUI':
                this.magicGUI();
                break;
            case 'bossImage':
                this.bossImage();
                break;
            default:
                console.warn(`Unknown initMethod: ${initMethod}`);
        }
    }

    // Set up the main GUI frame
    guiFrame() {
        this.setImage(this.IMAGES[0], 24, 24, 202, 79);
    }

    // Set up the boss GUI frame
    guiFrameBoss() {
        this.setImage(this.IMAGES[4], 496, 24, 202, 79);
    }

    // Set up the boss image
    bossImage() {
        this.setImage(this.IMAGES[5], 612, -12, 130, 130);
        this.otherDirection = true;
    }

    // Set up the knight GUI
    knightGUI() {
        this.setImage(this.IMAGES[1], -22, -51, 200, 200);
    }

    // Set up the gold GUI
    goldGUI() {
        this.setImage(this.IMAGES[2], 202, 66, 14, 14);
    }

    // Set up the magic GUI
    magicGUI() {
        this.setImage(this.IMAGES[3], 203, 50, 14, 14);
    }

    // Helper method to set image properties
    setImage(imagePath, x, y, width, height) {
        this.img = this.imageCache[imagePath];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}