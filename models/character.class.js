class Character extends MovableObject {
    y = 257;
    IMAGES_WALKING = [
            'img/2_character_knight/2_walk/walk1.png',
            'img/2_character_knight/2_walk/walk2.png',
            'img/2_character_knight/2_walk/walk3.png',
            'img/2_character_knight/2_walk/walk4.png',
            'img/2_character_knight/2_walk/walk5.png',
            'img/2_character_knight/2_walk/walk6.png'
        ];


    constructor() {
        super().loadImage("img/2_character_knight/2_walk/walk1.png");
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

   animate() {
        setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 250);
    }
}