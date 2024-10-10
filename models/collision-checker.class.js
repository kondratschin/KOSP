class CollisionChecker {
    constructor(world) {
        this.world = world;
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkManaCollisions();
        this.checkFlyingObjectCollisions();
    }

    checkEnemyCollisions() {
        this.world.enemies.forEach(enemy => {
            const characterFrame = this.world.character.getFrameCoordinates();
            const enemyFrame = enemy.getFrameCoordinates();

            if (characterFrame && enemyFrame) {
                if (this.world.character.speedY > 0 && !(enemy instanceof Endboss) && this.jumpAttack(characterFrame, enemyFrame)) {
                    enemy.hit(this.world.knightDamage);
                    enemy.energy = Math.min(enemy.energy, 0);
                }
                if (this.isColliding(characterFrame, enemyFrame) && !this.world.character.isHurt() && !enemy.isDead() && !enemy.isHurt()) {
                    let damage = enemy instanceof Endboss ? this.world.endBossDamage : this.world.enemyDamage;
                    this.world.character.hit(damage);
                    let energy = Math.min(this.world.character.energy, 100);
                    this.world.statusBarSetPercentage.setPercentage(energy);
                }
            }
        });
    }

    checkCoinCollisions() {
        this.world.coins.forEach(coin => {
            const characterFrame = this.world.character.getFrameCoordinates();
            const coinFrame = coin.getFrameCoordinates();
            if (characterFrame && coinFrame && this.isColliding(characterFrame, coinFrame)) {
                if (!soundMute) {
                    this.world.coinSound.play();
                }
                this.world.coins = this.world.coins.filter(c => c !== coin);
                this.world.character.collectedCoins += 1;
                this.world.goldBarSetPercentage.setPercentage(this.world.character.collectedCoins / this.world.initialCoinsAmount);
            }
        });
    }

    checkManaCollisions() {
        this.world.manaBottles.forEach(mana => {
            const characterFrame = this.world.character.getFrameCoordinates();
            const manaFrame = mana.getFrameCoordinates();
            if (characterFrame && manaFrame && this.isColliding(characterFrame, manaFrame)) {
                if (!soundMute) {
                    this.world.potionSound.play();
                }
                this.world.manaBottles = this.world.manaBottles.filter(m => m !== mana);
                this.world.character.collectedBottles += 1;
                this.world.magicBarSetPercentage.setPercentage(this.world.character.collectedBottles / this.world.magicBarFullAmount);
            }
        });
    }

    checkFlyingObjectCollisions() {
        this.world.flyingObjects.forEach(flyingObject => {
            const flyingObjectFrame = flyingObject.getFrameCoordinates();
            this.world.enemies.forEach(enemy => {
                const enemyFrame = enemy.getFrameCoordinates();
                if (flyingObjectFrame && enemyFrame && !enemy.isHurt() && this.isColliding(flyingObjectFrame, enemyFrame)) {
                    enemy.hit(this.world.fireDamage);
                    if (!(enemy instanceof Endboss)) {
                        enemy.energy = Math.min(enemy.energy, 1);
                    }
                    if (enemy instanceof Endboss) {
                        this.world.statusBarBossSetPercentage.setPercentageBoss(enemy.energy);
                    }
                }
            });
        });
    }

    isColliding(frame1, frame2) {
        return (
            frame1.x < frame2.x + frame2.width &&
            frame1.x + frame1.width > frame2.x &&
            frame1.y < frame2.y + frame2.height &&
            frame1.y + frame1.height > frame2.y
        );
    }

    jumpAttack(characterFrame, enemyFrame) {
        return (
            characterFrame.y + characterFrame.height > enemyFrame.y &&
            characterFrame.y + characterFrame.height < enemyFrame.y + enemyFrame.height &&
            characterFrame.x < enemyFrame.x + enemyFrame.width &&
            characterFrame.x + characterFrame.width > enemyFrame.x
        );
    }
}