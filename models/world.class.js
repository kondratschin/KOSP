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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setFixedBackground('img/5_background/layers/sky.png', 0, 0, 720, 405);
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
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
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        //draw wird imme wieder aufgerufen
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
            this.ctx.save();
            this.ctx.translate(mo.x + mo.width - 30, mo.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }
}