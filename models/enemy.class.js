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

    constructor() {
        super().loadImage("img/3_enemies/snake/1_walk/Walk1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.3 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }

}

