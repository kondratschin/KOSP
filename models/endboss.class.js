class Endboss extends MovableObject {
    y = 125;
    height = 380;
    width = 380;
    otherDirection = true;
    endBossMusic = new Audio('audio/orc_dead.mp3');
    orcDead = new Audio('audio/orc_dead.mp3');
    enemyHit = new Audio('audio/enemy_hit.mp3');
    firstContact = null;
    startWalking = null;

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

    IMAGES_ATTACK = [
        'img/4_enemy_boss/3_attack/Attack1.png',
        'img/4_enemy_boss/3_attack/Attack2.png',
        'img/4_enemy_boss/3_attack/Attack3.png',
        'img/4_enemy_boss/3_attack/Attack4.png',
        'img/4_enemy_boss/3_attack/Attack5.png',
        'img/4_enemy_boss/3_attack/Attack6.png',
        'img/4_enemy_boss/3_attack/Attack7.png'
    ];

    constructor() {
        super().loadImage("img/4_enemy_boss/2_idle/Idle1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 1900;
        this.speed = 0;
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            this.playIdleAnimation();
            if (world.character.x >= 1000) {
                this.startAttack = true;
            }
            if (world.character.x >= world.enemies[0].x - 100 && world.character.x <= world.enemies[0].x + 100 && this.speed === 0) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            if (this.isHurt()) {
                this.enemyHit.play();
                this.playAnimationOnce(this.IMAGES_HURT);
                this.speed = 0;
            }
            if (this.startAttack === true && this.energy > 0) {
                if (!this.attackInterval) {
                    this.endBossAttack();
                }
            }
            if (this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DEAD);
                this.orcDead.play();
                this.speed = 0;
                this.stopAllIntervals();
            }
        }, 200);
    }

    playIdleAnimation() {
        if (this.speed === 0) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    endBossAttack() {
        if (this.isDead()) {
            return;
        }
        this.speed = 5;
        this.playAnimation(this.IMAGES_WALKING);

        if (!this.movementInterval) {
            this.movementInterval = setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
        }

        setTimeout(() => {
            this.speed = 0;
            this.attackInterval = setTimeout(() => {
                this.endBossAttack();
            }, 4000);
        }, 1000);
    }

    stopMovementInterval() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    stopAttackInterval() {
        if (this.attackInterval) {
            clearTimeout(this.attackInterval);
            this.attackInterval = null;
        }
    }

    stopAllIntervals() {
        this.stopMovementInterval();
        this.stopAttackInterval();
        this.stopAnimationInterval();
    }

    stopAnimationInterval() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    stopEndBossAttack() {
        this.stopMovementInterval();
        this.stopAttackInterval();
        this.speed = 0;
    }
}

//     animate() {
//         this.intervallEndBossAnimation = setInterval(() => {
//             if (this.endBossCanStart()) {
//                 this.playAnimation(this.IMAGES_WALKING);
//                 // if (!soundMute) {
//                 //     game_music.pause();
//                 //     this.endboss_music.play();
//                 // }
//             } else if (this.isHurt()) {
//                 this.playAnimation(this.IMAGES_HURT);
//             } else if (this.isDead()) {
//                 this.speed = 0;
//                 // this.endboss_music.pause();
//                 this.playAnimationOnce(this.IMAGES_DEAD);
//                 this.endbossGameOver = true;
//             }
//         }, 200);
//         this.checkDistance();
//     }

//     endBossCanStart() {
//         return this.startWalking && !this.isHurt() && !this.isDead();
//     }

//     endBossHurt() {
//         return this.startWalking && this.isHurt() && !this.isDead();
//     }

//     animateFirstContact() {
//         let i = 0;
//         clearInterval(this.intervallEndBossAnimation);
//         this.endBossFirstContactIntervall = setInterval(() => {
//             if (i < 10) {
//                 this.playAnimation(this.IMAGES_IDLE);
//             } else {
//                 this.playAnimation(this.IMAGES_ATTACK);
//             }
//             i++;
//             if (world.character.x > 1000 && !this.firstContact) {
//                 i = 0;
//                 this.firstContact = true;
//             }
//         }, 150);
//     }

//     animateHit() {
//         setInterval(() => {
//             if (this.isHurt()) {
//                 this.playAnimation(this.IMAGES_HURT);
//             }
//         }, 200);
//     }

//     checkDistance() {
//         setInterval(() => {
//             if (this.startWalking === true) {
//                 this.moveLeft();
//             }
//         }, 200);
//     }
// }