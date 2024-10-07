class Endboss extends MovableObject {
    y = 125;
    height = 380;
    width = 380;
    otherDirection = true;
    endBossMusic = new Audio('audio/endboss.mp3');
    endBossDeadSound = new Audio('audio/endboss_dead.mp3');
    enemyHit = new Audio('audio/enemy_hit.mp3');
    firstContact = null;
    bossNearBy = null;
    endBossStartDistance = 1500;
    endBossPosition = 1900;
    endBossThreat = new Audio('audio/endboss_threat.mp3');
    energy = 20;
    endBossDead = false;

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
    IMAGES_ANGER = [
        'img/4_enemy_boss/6_anger/Anger1.png',
        'img/4_enemy_boss/6_anger/Anger2.png',
        'img/4_enemy_boss/6_anger/Anger3.png',
        'img/4_enemy_boss/6_anger/Anger4.png',
        'img/4_enemy_boss/6_anger/Anger5.png'
    ];

    constructor() {
        super().loadImage("img/4_enemy_boss/2_idle/Idle1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ANGER);
        this.x = this.endBossPosition;
        this.speed = 0;
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            this.bossNearBy = world.character.x >= world.enemies[0].x - 100 && world.character.x <= world.enemies[0].x + 100 && this.speed === 0;
            this.inFrontOfBoss = world.character.x <= world.enemies[0].x - 100;

            if (world.character.x >= this.endBossStartDistance && !this.firstContact) {
                game_music.pause();
                if (!soundMute) {
                    this.endBossThreat.play();
                    this.endBossMusic.play();
                }
                this.stopAllIntervals();
                this.playAngerAnimation();
            }

            this.playIdleAnimation();

            if (world.character.x >= this.endBossStartDistance) {
                this.startAttack = true;
            }

            if (this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DEAD);
                if (!soundMute) {
                    this.endBossDeadSound.play();
                }
                this.speed = 0;
                this.stopAllIntervals();
                this.endBossDead = true;
                return;
            }

            if (this.isHurt()) {
                if (!soundMute) {
                    this.enemyHit.play();
                }
                this.playAnimationOnce(this.IMAGES_HURT);
                this.speed = 0;
                return;
            }

            if (this.startAttack && this.energy > 0 && !this.bossNearBy && this.inFrontOfBoss && this.firstContact) {
                if (!this.attackInterval) {
                    this.endBossAttack();
                }
            }

            if (this.bossNearBy || !this.inFrontOfBoss) {
                this.stopEndBossAttack();
            }

            this.nearAttack(this.bossNearBy);
        }, 200);
    }

    nearAttack(bossNearBy) {
        if (bossNearBy) {
            this.endBossFrame = [+0, +120, -130, -195];
            this.playAnimation(this.IMAGES_ATTACK);
            this.stopMovementInterval();
        }
    }

    playIdleAnimation() {
        if (this.speed === 0) {
            this.playAnimation(this.IMAGES_IDLE);
            this.endBossFrame = [+149, +120, -280, -195];
        }
    }

    playAngerAnimation() {
        if (this.speed === 0) {
            this.playAnimationOnce(this.IMAGES_ANGER);
            setTimeout(() => {
                this.firstContact = true;
                this.animate();
            }, 2000);
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
            if (!this.bossNearBy) {
                this.speed = 0;
                this.attackInterval = setTimeout(() => {
                    this.endBossAttack();
                }, 4000);
            }
        }, 1000);
    }

    stopEndBossAttack() {
        this.stopMovementInterval();
        this.stopAttackInterval();
        this.speed = 0;
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
}
