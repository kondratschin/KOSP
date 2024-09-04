class Endboss extends MovableObject {
    y = 205;
    height = 280;
    width = 280;
    otherDirection = true;
    IMAGES_WALKING = [
        'img/4_enemy_boss/2_idle/Idle1.png',
        'img/4_enemy_boss/2_idle/Idle2.png',
        'img/4_enemy_boss/2_idle/Idle3.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200;

        this.animate();
    }


    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}
