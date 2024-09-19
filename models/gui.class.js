class GUI extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_icons/character_info_full.png',
        'img/2_character_knight/1_idle/long_idle/idle1.png',
        'img/7_statusbars/1_icons/icon_coin.png',
        'img/7_statusbars/1_icons/icon_magic_attack.png'

    ];


    constructor(initMethod = 'GUI') {
        super();
        this.loadImages(this.IMAGES);
        if (initMethod === 'GUI') {
            this.guiFrame();
        } else if (initMethod === 'knightGUI') {
            this.knightGUI();
        } else if (initMethod === 'goldGUI') {
            this.goldGUI();
        } else if (initMethod === 'magicGUI') {
            this.magicGUI();
        }
    }


    guiFrame() {
        this.img = this.imageCache[this.IMAGES[0]];
        this.x = 24;
        this.y = 24;
        this.width = 202;
        this.height = 79;
    }


    knightGUI() {
        this.img = this.imageCache[this.IMAGES[1]];
        this.x = -22;
        this.y = -51;
        this.width = 200;
        this.height = 200;
    }

    goldGUI() {
        this.img = this.imageCache[this.IMAGES[2]];
        this.x = 202;
        this.y = 66;
        this.width = 14;
        this.height = 14;
    }

    magicGUI() {
        this.img = this.imageCache[this.IMAGES[3]];
        this.x = 203;
        this.y = 50;
        this.width = 14;
        this.height = 14;
    }


}