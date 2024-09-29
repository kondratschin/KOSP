class Mana extends MovableObject {
    y = 314;
    x = 200;
    height = 32;
    width = 32;

    IMAGES_MANA = [
        'img/6_fire_attack/mana_fire.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_fire_attack/mana_fire.png');
        this.loadImages(this.IMAGES_MANA);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MANA);
        }, 200);
    }


}