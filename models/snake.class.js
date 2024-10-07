class Snake extends MovableObject {
    // Initial properties
    y = 314;
    height = 180;
    width = 180;
    otherDirection = true;
    animationInterval = null;
    movementInterval = null;
    snakeDead = new Audio('audio/snake_dead.mp3');
    snakeHit = new Audio('audio/enemy_hit.mp3');

    // Image arrays for different states
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
        this.x = 400 + Math.random() * 500; // Random initial x position
        this.speed = 0.3 + Math.random() * 0.5; // Random speed
        this.animate();
    }

    // Start animation and movement intervals
    animate() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // 60 FPS movement

        this.animationInterval = setInterval(() => {
            this.moveEnemy();
        }, 200); // Adjust the interval as needed
    }

    // Handle enemy movement and state changes
    moveEnemy() {
        if (this.isDead()) {
            if (!soundMute) {
                this.snakeDead.play();
            }
            this.playAnimationOnce(this.IMAGES_DEAD);
            this.speed = 0;
            this.stopAllIntervals();
            setTimeout(() => {
                this.removeCorpse = true;
            }, 1500); // Remove corpse after 1.5 seconds
        } else if (this.isHurt()) {
            if (!soundMute) {
                this.snakeHit.play();
            }
            this.playAnimationOnce(this.IMAGES_HURT);
            this.speed = 0;
            setTimeout(() => {
                this.speed = 0.3 + Math.random() * 0.5; // Reset speed after hurt
            }, 500);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    // Stop animation interval
    stopAnimationInterval() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    // Stop movement interval
    stopMovementInterval() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    // Stop all intervals
    stopAllIntervals() {
        this.stopAnimationInterval();
        this.stopMovementInterval();
    }
}