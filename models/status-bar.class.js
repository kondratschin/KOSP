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

    constructor(initMethod = 'leftCorner', energy = null) {
        super();
        this.loadImages(this.IMAGES);

        if (initMethod === 'leftCorner') {
            this.leftCorner();
        } else if (initMethod === 'rightCorner') {
            this.rightCorner();
        } else if (initMethod === 'setPercentage') {
            this.setPercentage(this.percentage);
        } else if (initMethod === 'leftCornerBoss') {
            this.leftCornerBoss();
        } else if (initMethod === 'rightCornerBoss') {
            this.rightCornerBoss();
        } else if (initMethod === 'setPercentageBoss') {
            this.setPercentageBoss(this.energyBoss);
        }
    }

    leftCorner() {
        this.img = this.imageCache[this.IMAGES[0]];
        this.x = 102;
        this.y = 31;
        this.width = 4;
        this.height = 14;
    }

    rightCorner() {
        this.img = this.imageCache[this.IMAGES[2]];
        this.x = 219;
        this.y = 31;
        this.width = 4;
        this.height = 14;
    }

    setPercentage(percentage) {
        this.percentage = percentage;

        let path = this.IMAGES[1];
        // let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.width = 113 * (percentage / 100);
        this.x = 106;
        this.y = 31;
        this.height = 14;
    }

    leftCornerBoss() {
        this.img = this.imageCache[this.IMAGES[7]];
        this.x = 617;
        this.y = 31;
        this.width = 4;
        this.height = 14;
    }

    rightCornerBoss() {
        this.img = this.imageCache[this.IMAGES[5]];
        this.x = 500;
        this.y = 31;
        this.width = 4;
        this.height = 14;
    }

    setPercentageBoss(newEnergyLevel) {
        let path = this.IMAGES[6];
        this.img = this.imageCache[path];
        this.width = 113 * (newEnergyLevel / this.energyBoss);
        this.x = 617 - this.width; // Adjust x to mirror the width reduction
        this.y = 31;
        this.height = 14;
    }


}