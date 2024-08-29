class World {
    character = new Character();
    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy(),
    ];
    clouds = [
        new Cloud(0, -100),
        new Cloud(720, -100), // Second cloud at a different position
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/sky.png', 0, 0, 720, 405),
        new BackgroundObject('img/5_background/layers/5_clouds/clouds1.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/clouds2.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/rocks2.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/rocks3.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 0, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 64, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 128, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 192, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 256, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 320, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 384, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 448, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 512, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 576, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 640, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 704, 414, 64, 64),
    ];

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

 
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);   
        this.addObjectsToMap(this.enemies);

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
        if (mo instanceof Enemy) {
            this.ctx.save();
            this.ctx.translate(mo.x + mo.width, mo.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }
}