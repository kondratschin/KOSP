/**
 * Class representing the main character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
    y = 124;
    speed = 5;
    speedY = 0;
    gameOver = false;

    // Image arrays for different character states
    IMAGES_IDLE = [
        'img/2_character_knight/1_idle/idle/idle1.png',
        'img/2_character_knight/1_idle/idle/idle2.png',
        'img/2_character_knight/1_idle/idle/idle3.png',
        'img/2_character_knight/1_idle/idle/idle4.png',
        'img/2_character_knight/1_idle/idle/idle5.png',
        'img/2_character_knight/1_idle/idle/idle6.png',
        'img/2_character_knight/1_idle/idle/idle7.png',
        'img/2_character_knight/1_idle/idle/idle8.png',
        'img/2_character_knight/1_idle/idle/idle9.png',
        'img/2_character_knight/1_idle/idle/idle10.png',
        'img/2_character_knight/1_idle/idle/idle11.png',
        'img/2_character_knight/1_idle/idle/idle12.png'
    ];

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

    IMAGES_STANDING = [
        'img/2_character_knight/2_walk/walk1.png'
    ];

    // Sounds
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jumping.mp3');
    dying_sound = new Audio('audio/character_dead.mp3');

    // Intervals
    interactionInterval;
    animationInterval;
    movementInterval;

    /**
     * Create a character.
     */
    constructor() {
        super().loadImage("img/2_character_knight/2_walk/walk1.png");
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.setInteractionTimer();
        this.applyGravity();
        if (!this.isDead()) {
            this.animate();
        }
    }

    /**
     * Set a timer to check for user interaction.
     */
    setInteractionTimer() {
        const interactionEvents = ['click', 'keydown', 'mousemove', 'touchstart'];

        const interactionHandler = () => {
            this.lastInteractionTime = Date.now();
        };

        interactionEvents.forEach(event => {
            window.addEventListener(event, interactionHandler);
        });

        this.interactionInterval = setInterval(() => {
            const currentTime = Date.now();
            if (currentTime - this.lastInteractionTime >= 3000) {
                this.playIdleAnimation();
            }
        }, 1300);
    }

    /**
     * Play the idle animation.
     */
    playIdleAnimation() {
        this.playAnimationOnce(this.IMAGES_IDLE);
    }

    /**
     * Animate the character based on its state.
     */
    animate() {
        this.movementInterval = setInterval(() => {
            if (this.isDead()) {
                if (!soundMute) {
                    this.dying_sound.play();
                }
                this.playAnimationOnce(this.IMAGES_DEAD);
                this.stopAllIntervalsAndTimers();
                setTimeout(() => {
                    this.removeCorpse = true;
                    this.gameOver = true;
                }, 1000);
                return;
            }

            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.world.enemies[0].inFrontOfBoss === true) {
                this.moveRight();
                if (!this.isAboveGround() && !soundMute) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                if (!this.isAboveGround() && !soundMute) {
                    this.walking_sound.play();
                }
            }

            if (!this.isAboveGround() && ((this.world.keyboard.SPACE) || (this.world.keyboard.UP))) {
                this.jump();
                if (!soundMute) {
                    this.jumping_sound.play();
                }
                this.playAnimationOnce(this.IMAGES_JUMPING);
            }

            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                if (!soundMute) {
                    this.dying_sound.play();
                }
                this.playAnimation(this.IMAGES_HURT);
            } else {
                if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else if (!this.isAboveGround() && Date.now() - this.lastInteractionTime < 3000) {
                    this.playAnimationOnce(this.IMAGES_STANDING);
                }
            }
        }, 50);
    }

    /**
     * Stop all intervals and timers.
     */
    stopAllIntervalsAndTimers() {
        if (this.interactionInterval) {
            clearInterval(this.interactionInterval);
            this.interactionInterval = null;
        }
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }
}