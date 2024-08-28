class Enemy extends MovableObject {

    y = 270;

    constructor() {
        super().loadImage("img/3_enemies/snake/1_walk/Walk1.png");

        this.x = 200 + Math.random() * 500;
    }
}

