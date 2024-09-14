class Character extends MovableObject {
    y = 124;
    speed = 5;
    IMAGES_WALKING = [
        'img/2_character_knight/2_walk/walk1.png',
        'img/2_character_knight/2_walk/walk2.png',
        'img/2_character_knight/2_walk/walk3.png',
        'img/2_character_knight/2_walk/walk4.png',
        'img/2_character_knight/2_walk/walk5.png',
        'img/2_character_knight/2_walk/walk6.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_knight/3_jump/jump1.png',
        'img/2_character_knight/3_jump/jump2.png',
        'img/2_character_knight/3_jump/jump3.png',
        'img/2_character_knight/3_jump/jump4.png',
        'img/2_character_knight/3_jump/jump5.png',
        'img/2_character_knight/3_jump/jump6.png',
        'img/2_character_knight/3_jump/jump7.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_knight/9_dead/death1.png',
        'img/2_character_knight/9_dead/death2.png',
        'img/2_character_knight/9_dead/death3.png',
        'img/2_character_knight/9_dead/death4.png',
        'img/2_character_knight/9_dead/death5.png',
        'img/2_character_knight/9_dead/death6.png',
        'img/2_character_knight/9_dead/death7.png',
        'img/2_character_knight/9_dead/death8.png',
        'img/2_character_knight/9_dead/death9.png',
        'img/2_character_knight/9_dead/death10.png'
    ];

    IMAGES_HURT = [
        'img/2_character_knight/8_hurt/hurt1.png',
        'img/2_character_knight/8_hurt/hurt2.png',
        'img/2_character_knight/8_hurt/hurt3.png',
        'img/2_character_knight/8_hurt/hurt4.png'
    ];

    world;
    walking_sound = new Audio('audio/walking.mp3');


    constructor() {
        super().loadImage("img/2_character_knight/2_walk/walk1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                if (!this.isAboveGround()) {
                  this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                  }
            }


            if (!this.isAboveGround() && ((this.world.keyboard.SPACE) || (this.world.keyboard.UP))) { 
                this.jump();
            }

            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {

            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                    // walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }
}