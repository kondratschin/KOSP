class Enemy extends MovableObject {
    y = 314;
    height = 180;
    width = 180;
    otherDirection = true;
    IMAGES_WALKING = [
        'img/3_enemies/snake/1_walk/Walk1.png',
        'img/3_enemies/snake/1_walk/Walk2.png',
        'img/3_enemies/snake/1_walk/Walk3.png',
        'img/3_enemies/snake/1_walk/Walk4.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies/snake/2_dead/Death1.png',
        'img/3_enemies/snake/2_dead/Death2.png',
        'img/3_enemies/snake/2_dead/Death3.png',
        'img/3_enemies/snake/2_dead/Death4.png'
    ];

    IMAGES_HURT = [
        'img/3_enemies/snake/3_hurt/Hurt1.png',
        'img/3_enemies/snake/3_hurt/Hurt2.png'
    ];

    constructor() {
        super().loadImage("img/3_enemies/snake/1_walk/Walk1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.3 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}

