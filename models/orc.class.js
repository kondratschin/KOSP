class Orc extends MovableObject {
    y = 293;
    height = 180;
    width = 180;
    otherDirection = true;
    animationInterval = null;
    movementInterval = null;
    orcDead = new Audio('audio/orc_dead.mp3');
    snakeHit = new Audio('audio/enemy_hit.mp3');

    IMAGES_WALKING = [
        'img/3_enemies/orc/1_walk/Walk1.png',
        'img/3_enemies/orc/1_walk/Walk2.png',
        'img/3_enemies/orc/1_walk/Walk3.png',
        'img/3_enemies/orc/1_walk/Walk4.png',
        'img/3_enemies/orc/1_walk/Walk5.png',
        'img/3_enemies/orc/1_walk/Walk6.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies/orc/2_dead/Death1.png',
        'img/3_enemies/orc/2_dead/Death2.png',
        'img/3_enemies/orc/2_dead/Death3.png',
        'img/3_enemies/orc/2_dead/Death4.png',
        'img/3_enemies/orc/2_dead/Death5.png',
        'img/3_enemies/orc/2_dead/Death6.png'
    ];

    IMAGES_HURT = [
        'img/3_enemies/orc/3_hurt/Hurt1.png',
        'img/3_enemies/orc/3_hurt/Hurt2.png'
    ];

    constructor() {
        super().loadImage("img/3_enemies/orc/1_walk/Walk1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.3 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.moveEnemy();
        }, 200); // Adjust the interval as needed
    }

    moveEnemy() {
        if (this.isDead()) {
            this.orcDead.play();
            this.playAnimationOnce(this.IMAGES_DEAD);
            this.speed = 0;
            this.stopAllIntervals();
            setTimeout(() => {
                this.removeCorpse = true;
            }, 1500);
        } else if (this.isHurt()) {
            this.snakeHit.play();
            this.playAnimationOnce(this.IMAGES_HURT);
            this.speed = 0;
            setTimeout(() => {
                this.speed = 0.3 + Math.random() * 0.5;
            }, 500);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    stopAnimationInterval() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    stopMovementInterval() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    stopAllIntervals() {
        this.stopAnimationInterval();
        this.stopMovementInterval();
    }
}