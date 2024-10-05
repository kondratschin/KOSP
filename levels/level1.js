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
        new BackgroundObject('img/5_background/layers/3_third_layer/clouds2.png', -64, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/clouds2.png', 656, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/clouds2.png', 1376, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/clouds2.png', 2096, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/rocks2.png', -64, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/rocks2.png', 656, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/rocks2.png', 1376, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/rocks2.png', 2096, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/rocks3.png', -64, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/rocks3.png', 656, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/rocks3.png', 1376, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/rocks3.png', 2096, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', -64, 414, 64, 64),
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
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 768, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 832, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 896, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 960, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1024, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1088, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1152, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1216, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1280, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1344, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1408, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1472, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1536, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1600, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1664, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1728, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1792, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1856, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1920, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 1984, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 2048, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 2112, 414, 64, 64),
        new BackgroundObject('img/5_background/layers/1_first_layer/02_ground.png', 2176, 414, 64, 64)
    ]
);
