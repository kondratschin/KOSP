class World {
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
    magicBarLeftCorner = new MagicBar('leftCorner');
    magicBarSetPercentage = new MagicBar('setPercentage');
    magicBarRightCorner = new MagicBar('rightCorner');
    goldBarLeftCorner = new GoldBar('leftCorner');
    goldBarSetPercentage = new GoldBar('setPercentage');
    goldBarRightCorner = new GoldBar('rightCorner');
    guiFrame = new GUI('GUI');
    characterGUI = new GUI('knightGUI');
    goldGUI = new GUI('goldGUI');
    magicGUI = new GUI('magicGUI');
    flyingObjects = [new FlyingObject()];
    coins = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setFixedBackground('img/5_background/layers/sky.png', 0, 0, 720, 405);
        this.draw();
        this.setWorld();
        this.run();
        this.createCoins();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkFlyingObjects();
        }, 200);
    }

    checkFlyingObjects() {
        if(this.keyboard.D) {
            let fire = new FlyingObject(this.character.x + 22, this.character.y);
            this.flyingObjects.push(fire);
        }
    }

    createCoins() {
        const coinPositions = [
            { x: 305, y: 240 },
            { x: 340, y: 220 },
            { x: 380, y: 220 },
            { x: 415, y: 240 },
            { x: 1000, y: 250 }
        ];

        coinPositions.forEach(position => {
            let coin = new Coins(position.x, position.y);
            this.coins.push(coin);
        });
    }

    checkCollisions() {
            this.enemies.forEach(enemy => {
                const characterFrame = this.character.getFrameCoordinates();
                const enemyFrame = enemy.getFrameCoordinates();

                if (characterFrame && enemyFrame) {
                    if (this.isColliding(characterFrame, enemyFrame)) {
                        this.character.hit();
                        let energy = Math.min(this.character.energy, 100);
                        this.statusBarSetPercentage.setPercentage(energy);
                    }
                }
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
        this.addToMap(this.magicBarLeftCorner);
        this.addToMap(this.magicBarSetPercentage);
        this.addToMap(this.magicBarRightCorner);
        this.addToMap(this.goldBarLeftCorner);
        if (this.character.energy > 0) {
            this.addToMap(this.statusBarLeftCorner);
        }

        if (this.character.energy === 100) {
        this.addToMap(this.statusBarRightCorner);
        }
        this.addToMap(this.goldBarSetPercentage);
        this.addToMap(this.goldBarRightCorner);
        this.ctx.translate(this.camera_x, 0); // Reset the camera position forwards


        // -------- space for fixed objects ----------------
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
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

}
