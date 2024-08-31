class Cloud extends MovableObject {
    width = 720;
    height = 480;
    speed = 0.25;

    constructor(x, y) {
        super().loadImage("img/5_background/layers/2_second_layer/clouds3.png");
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


}