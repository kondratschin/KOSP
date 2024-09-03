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
    walking_sound = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage("img/2_character_knight/2_walk/walk1.png");
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

   animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
        }

        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            this.walking_sound.play();
        }
        this.world.camera_x = -this.x + 50;
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