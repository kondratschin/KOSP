const level1 = new Level(
    [
        new Endboss(),
        new Snake(),
        new Snake(),
        new Snake(),
        new Orc(),

    ],

    [
        new Cloud(0, -100),
        new Cloud(720, -100), // Second cloud at a different position
        new Cloud(1440, -100), // Second cloud at a different position
        new Cloud(2160, -100), // Second cloud at a different position
        new Cloud(2880, -100), // Second cloud at a different position
    ],

    [
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
    ]
);
