class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_interface/stamina_corner1.png',
        'img/7_statusbars/2_interface/stamina_full_bar.png',
        'img/7_statusbars/2_interface/stamina_corner2.png',
        'img/7_statusbars/2_interface/stamina_middle_corner.png',
        'img/7_statusbars/2_interface/stamina_point.png',
    ];

    percentage = 100;

    constructor(initMethod = 'leftCorner') {
        super();
        this.loadImages(this.IMAGES);

        if (initMethod === 'leftCorner') {
            this.leftCorner();
            
        } if (initMethod === 'rightCorner') {
            this.rightCorner();
        } if (initMethod === 'setPercentage') {
            this.setPercentage(this.percentage);
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

    clear(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }


    // resolveImageIndex() {
    //     if (this.percentage === 100) {
    //         return 1;
    //     } else if (this.percentage < 80) {
    //         return 2;
    //     } else {
    //         return 0;
    //     }
    // }
}