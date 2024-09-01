class Character extends MovableObject {
    y = 257;
    speed = 5;
    IMAGES_WALKING = [
            'img/2_character_knight/2_walk/walk1.png',
            'img/2_character_knight/2_walk/walk2.png',
            'img/2_character_knight/2_walk/walk3.png',
            'img/2_character_knight/2_walk/walk4.png',
            'img/2_character_knight/2_walk/walk5.png',
            'img/2_character_knight/2_walk/walk6.png'
        ];
    
    world;

    constructor() {
        super().loadImage("img/2_character_knight/2_walk/walk1.png");
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

   animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
        }

        if (this.world.keyboard.LEFT) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

        // walk animation
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
            }
    }, 50);
    }
}