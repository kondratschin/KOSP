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
    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setFixedBackground('img/5_background/layers/sky.png', 0, 0, 720, 405);
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.enemies.forEach(enemy => {
                const characterFrame = this.character.getFrameCoordinates();
                const enemyFrame = enemy.getFrameCoordinates();

                if (characterFrame && enemyFrame) {
                    if (this.isColliding(characterFrame, enemyFrame)) {
                        this.character.hit();
                        console.log('Collision detected!', this.character.energy);
                        // Handle collision
                    }
                }
            });
        }, 200);
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
        this.addToMap(this.statusBar);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

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
