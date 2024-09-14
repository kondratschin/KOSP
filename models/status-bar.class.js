class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_interface/stamina_corner1.png',
        'img/7_statusbars/2_interface/stamina_full_bar.png',
        'img/7_statusbars/2_interface/stamina_corner2.png',
        'img/7_statusbars/2_interface/stamina_middle_corner.png',
        'img/7_statusbars/2_interface/stamina_point.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 100;
        this.y = 100;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage === 100) {
            return 1;
        } else if (this.percentage > 80) {
            return 3;
        } else {
            return 0;
        }
     }
}