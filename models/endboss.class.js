class Endboss extends MovableObject {
    y = 125;
    height = 380;
    width = 380;
    otherDirection = true;
    animationInterval = null;
    movementInterval = null;
    orcDead = new Audio('audio/orc_dead.mp3');
    enemyHit = new Audio('audio/enemy_hit.mp3');

    IMAGES_WALKING = [
        'img/4_enemy_boss/1_walk/Walk1.png',
        'img/4_enemy_boss/1_walk/Walk2.png',
        'img/4_enemy_boss/1_walk/Walk3.png',
        'img/4_enemy_boss/1_walk/Walk4.png',
        'img/4_enemy_boss/1_walk/Walk5.png',
        'img/4_enemy_boss/1_walk/Walk6.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemy_boss/5_dead/Death0.png',
        'img/4_enemy_boss/5_dead/Death1.png',
        'img/4_enemy_boss/5_dead/Death2.png',
        'img/4_enemy_boss/5_dead/Death3.png',
        'img/4_enemy_boss/5_dead/Death4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemy_boss/4_hurt/Hurt1.png',
        'img/4_enemy_boss/4_hurt/Hurt2.png'
    ];

    IMAGES_IDLE = [
        'img/4_enemy_boss/2_idle/Idle1.png',
        'img/4_enemy_boss/2_idle/Idle2.png',
        'img/4_enemy_boss/2_idle/Idle3.png'
    ];


    constructor() {
        super().loadImage("img/4_enemy_boss/1_walk/Walk1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.x = 500; //1900
        this.speed = 0;
        this.animate();
    }

    animate() {
        let i = 0;
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
        } else if (this.isHurt()) {
            this.enemyHit.play();
            this.playAnimationOnce(this.IMAGES_HURT);
            this.speed = 0;
            setTimeout(() => {
                this.speed = 5;
            }, 800);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
            if (world.character.x > 1300) {
                this.speed = 5;
            }
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