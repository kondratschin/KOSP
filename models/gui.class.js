class GUI extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_icons/character_info_full.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 24;
        this.y = 24;
        this.width = 202;
        this.height = 79;
        let path = this.IMAGES[0];
        this.img = this.imageCache[path];
    }

}
