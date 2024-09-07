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


        setInterval(() => {
            this.moveLeft();
            this.x -= this.speed;

            // Check if the image has moved completely off the screen
            if (this.x + this.width < 0) {
                this.x = 719; // Reset the position to the right side of the screen
            }
        }, 1000 / 60);
    }


}