class World {
    fireSound = new Audio('audio/fire.mp3');
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    background;
    statusBarLeftCorner = new StatusBar('leftCorner');
    statusBarSetPercentage = new StatusBar('setPercentage');
    statusBarRightCorner = new StatusBar('rightCorner');
    statusBarBossLeftCorner = new StatusBar('leftCornerBoss');
    statusBarBossSetPercentage = new StatusBar('setPercentageBoss');
    statusBarBossRightCorner = new StatusBar('rightCornerBoss');
    magicBarLeftCorner = new MagicBar('leftCorner');
    magicBarSetPercentage = new MagicBar('setPercentage');
    magicBarRightCorner = new MagicBar('rightCorner');
    goldBarLeftCorner = new GoldBar('leftCorner');
    goldBarSetPercentage = new GoldBar('setPercentage');
    goldBarRightCorner = new GoldBar('rightCorner');
    guiFrame = new GUI('GUI');
    characterGUI = new GUI('knightGUI');
    BossGUI = new GUI('GUIBoss');
    bossImage = new GUI('bossImage');
    goldGUI = new GUI('goldGUI');
    magicGUI = new GUI('magicGUI');
    flyingObjects = [new FlyingObject()];
    coins = [];
    initialCoinsAmount = 0;
    manaBottles = [];
    magicBarFullAmount = 10;

    coinSound = new Audio('audio/coin.mp3');
    potionSound = new Audio('audio/potion_glass.mp3');
    endBossDamage = 50;
    enemyDamage = 5;
    knightDamage = 10;
    fireDamage = 5;


    constructor(canvas, keyboard) {
        // this.backgroundSound.volume = 0.055;
        // this.backgroundSound.play();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setFixedBackground('img/5_background/layers/sky.png', 0, 0, 720, 405);
        this.draw();
        this.setWorld();
        this.shootInterval();
        this.run();
        this.createCoins();
        this.createMana();
        this.initialCoinsAmount = this.coins.length;
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCharacterPositionForEnemies();
            this.checkGameOver();
            this.checkWinGame();
        }, 1000 / 60);
    }

    shootInterval() {
        setInterval(() => {
            this.checkFlyingObjects();
        }, 1000 / 10);
    }

    checkFlyingObjects() {
        if(this.keyboard.D && this.character.collectedBottles > 0) {
            this.character.collectedBottles -= 1;
            this.magicBarSetPercentage.setPercentage(this.character.collectedBottles / this.magicBarFullAmount);
            if (this.character.otherDirection === true) {
                let fire = new FlyingObject(this.character.x - 22, this.character.y, 'back');
                this.flyingObjects.push(fire);
            } else {
                let fire = new FlyingObject(this.character.x + 22, this.character.y, 'front');
                this.flyingObjects.push(fire);
            }
        }
    }



    createCoins() {
        const coinPositions = [
            { x: 305, y: 240 },
            { x: 340, y: 220 },
            { x: 380, y: 220 },
            { x: 415, y: 240 },
            { x: 1000, y: 250 },
            { x: 1100, y: 250 },
            { x: 1200, y: 250 },
            { x: 1300, y: 250 }
        ];

        coinPositions.forEach(position => {
            let coin = new Coins(position.x, position.y);
            this.coins.push(coin);
        });
    }

    checkCharacterPositionForEnemies() {
        if (this.character.x === 800 && !this.enemiesSpawned) {
            this.enemiesSpawned = true;

            let snake1 = new Snake();
            snake1.x = 1300 + Math.random() * 500;
            this.enemies.push(snake1);

            let snake2 = new Snake();
            snake2.x = 1300 + Math.random() * 500;
            this.enemies.push(snake2);

            let snake3 = new Snake();
            snake3.x = 1300 + Math.random() * 500;
            this.enemies.push(snake3);

            let orc = new Orc();
            orc.x = 1300 + Math.random() * 500;
            this.enemies.push(orc);
        }
    }

    createMana() {
        const manaPositions = [
            { x: 605, y: 240 },
            { x: 640, y: 220 },
            { x: 680, y: 220 },
            { x: 715, y: 240 },
            { x: 300, y: 400 },
            { x: 600, y: 400 },
            { x: 900, y: 400 },
            { x: 1200, y: 400 },
            { x: 1500, y: 400 },
            { x: 1550, y: 400 }

        ];

        manaPositions.forEach(position => {
            let mana = new Mana(position.x, position.y);
            this.manaBottles.push(mana);
        });
    }

    checkCollisions() {
        this.enemies.forEach(enemy => {
            const characterFrame = this.character.getFrameCoordinates();
            const enemyFrame = enemy.getFrameCoordinates();
    
            if ((characterFrame && enemyFrame) && this.character.speedY > 0 && !(enemy instanceof Endboss)) {    
                if (this.jumpAttack(characterFrame, enemyFrame)) {
                    enemy.hit(this.knightDamage);
                    enemy.energy = Math.min(enemy.energy, 0);
                }
            }


            if (characterFrame && enemyFrame) {
                if (this.isColliding(characterFrame, enemyFrame) && !this.character.isHurt() && !enemy.isDead() && !enemy.isHurt()) {
                    let damage = enemy instanceof Endboss ? this.endBossDamage : this.enemyDamage;
                    this.character.hit(damage);
                    let energy = Math.min(this.character.energy, 100);
                    this.statusBarSetPercentage.setPercentage(energy);
                }
            }
        });
    
        this.coins.forEach(coin => {
            const characterFrame = this.character.getFrameCoordinates();
            const coinFrame = coin.getFrameCoordinates();
    
            if (characterFrame && coinFrame) {
                if (this.isColliding(characterFrame, coinFrame)) {
                    if (!soundMute) {
                    this.coinSound.play();
                    }
                    this.coins = this.coins.filter(c => c !== coin);
                    this.character.collectedCoins += 1; // Increase the coins by 1
                    this.goldBarSetPercentage.setPercentage(this.character.collectedCoins / this.initialCoinsAmount);
                }
            }
        });

        this.manaBottles.forEach(mana => {
            const characterFrame = this.character.getFrameCoordinates();
            const manaFrame = mana.getFrameCoordinates();
    
            if (characterFrame && manaFrame) {
                if (this.isColliding(characterFrame, manaFrame)) {
                    if (!soundMute) {
                    this.potionSound.play();
                    }
                    this.manaBottles = this.manaBottles.filter(m => m !== mana);
                    this.character.collectedBottles += 1; // Increase the magic by 1
                    this.magicBarSetPercentage.setPercentage(this.character.collectedBottles / this.magicBarFullAmount);
                }
            }
        });
    
        this.flyingObjects.forEach(flyingObject => {
            const flyingObjectFrame = flyingObject.getFrameCoordinates();
    
            this.enemies.forEach(enemy => {
                const enemyFrame = enemy.getFrameCoordinates();
    
                if (flyingObjectFrame && enemyFrame && !enemy.isHurt()) {
                    if (this.isColliding(flyingObjectFrame, enemyFrame)) {
                        enemy.hit(this.fireDamage);
                        if (!(enemy instanceof Endboss)) {
                            enemy.energy = Math.min(enemy.energy, 1);
                        }
                        if (enemy instanceof Endboss) {
                            this.statusBarBossSetPercentage.setPercentageBoss(enemy.energy);
                        }
                        console.log(`Enemy energy: ${enemy.energy}`);
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

    setFixedBackground(imagePath, x, y, width, height) {
        this.background = new BackgroundObject(imagePath, x, y, width, height);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.background) {
            this.background.draw(this.ctx); // Draw the fixed background first
        }
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.manaBottles);
        this.ctx.translate(-this.camera_x, 0); // Reset the camera position backwards
        // -------- space for fixed objects ----------------

        this.addToMap(this.guiFrame);
        this.addToMap(this.characterGUI);
        this.addToMap(this.goldGUI);
        this.addToMap(this.magicGUI);
        if (this.character.energy > 0) {
            this.addToMap(this.statusBarLeftCorner);
        }
        if (this.character.energy === 100) {
            this.addToMap(this.statusBarRightCorner);
        }
        this.addToMap(this.statusBarSetPercentage);


        if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.firstContact)) {
            this.addToMap(this.BossGUI);
            this.addToMap(this.bossImage);
            this.addToMap(this.statusBarBossSetPercentage);
            if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy === world.statusBarBossSetPercentage.energyBoss)) {
            this.addToMap(this.statusBarBossRightCorner);
            }
            if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy > 0)) {
                this.addToMap(this.statusBarBossLeftCorner);
                }
        }


        if (this.character.collectedBottles > 0) {            
            this.addToMap(this.magicBarLeftCorner);
        };
        if (this.character.collectedBottles >= this.magicBarFullAmount) {
            this.addToMap(this.magicBarRightCorner);
        }
        this.addToMap(this.magicBarSetPercentage);




        if (this.character.collectedCoins > 0) {
            this.addToMap(this.goldBarLeftCorner);
        }
        this.addToMap(this.goldBarSetPercentage);
        if (this.character.collectedCoins === this.initialCoinsAmount) {
            this.addToMap(this.goldBarRightCorner);
        }


        this.ctx.translate(this.camera_x, 0); // Reset the camera position forwards






        // -------- space for fixed objects ----------------
        this.addObjectsToMap(this.level.clouds);
        if (!this.character.removeCorpse) {
            this.addToMap(this.character);
        }
        this.addObjectsToMap(this.level.enemies.filter(enemy => !enemy.removeCorpse));
        this.addObjectsToMap(this.flyingObjects);
        this.ctx.translate(-this.camera_x, 0);

        // draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
            mo.drawFrame(this.ctx);
        } else {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width - 35, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
        this.ctx.restore();
    }

    /**
     * Check if the character is game over and the game ends
     * 
     */
    checkGameOver() {
        if (this.character.gameOver) {

            gameOver();
        }
    }

        /**
     * Check if the endboss is dead and the game was won
     * 
     */
        checkWinGame() {
            if (world.enemies[0].endBossDead) {
                // this.endboss.endboss_music.pause();
                winGame();
            }
        }

}
