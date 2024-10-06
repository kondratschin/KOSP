let level1;

function createLevel() {
    let enemies = [
        new Endboss(),
        new Snake(),
        new Snake(),
        new Snake(),
        new Orc(),
    ];

    let clouds = [];
    for (let i = 0; i < 5; i++) {
        clouds.push(new Cloud(i * 720, -100));
    }

    let backgroundObjects = [];
    let cloudImage = 'img/5_background/layers/3_third_layer/clouds2.png';
    let rockImage = 'img/5_background/layers/3_third_layer/rocks2.png';
    let rockImage2 = 'img/5_background/layers/2_second_layer/rocks3.png';
    let groundImage = 'img/5_background/layers/1_first_layer/02_ground.png';

    for (let i = 0; i < 4; i++) {
        backgroundObjects.push(new BackgroundObject(cloudImage, i * 720 - 64, 0, 720, 480));
        backgroundObjects.push(new BackgroundObject(rockImage, i * 720 - 64, 0, 720, 480));
        backgroundObjects.push(new BackgroundObject(rockImage2, i * 720 - 64, 0, 720, 480));
    }

    for (let i = -1; i < 34; i++) {
        backgroundObjects.push(new BackgroundObject(groundImage, i * 64, 414, 64, 64));
    }

    level1 = new Level(enemies, clouds, backgroundObjects);
}

function initLevel() {
    createLevel();
}