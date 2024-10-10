// Global variable to hold the level
let level1;

/**
 * Creates the level by initializing enemies, clouds, and background objects.
 */
function createLevel() {
    const enemies = initializeEnemies();
    const clouds = initializeClouds();
    const backgroundObjects = initializeBackgroundObjects();
    level1 = new Level(enemies, clouds, backgroundObjects);
}

/**
 * Initializes the enemies for the level.
 * @returns {Array} Array of enemy objects.
 */
function initializeEnemies() {
    return [
        new Endboss(),
        new Snake(),
        new Snake(),
        new Snake(),
        new Orc(),
    ];
}

/**
 * Initializes the clouds for the level.
 * @returns {Array} Array of cloud objects.
 */
function initializeClouds() {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
        clouds.push(new Cloud(i * 720, -100));
    }
    return clouds;
}

/**
 * Initializes the background objects for the level.
 * @returns {Array} Array of background objects.
 */
function initializeBackgroundObjects() {
    const backgroundObjects = [];
    const cloudImage = 'img/5_background/layers/3_third_layer/clouds2.png';
    const rockImage = 'img/5_background/layers/3_third_layer/rocks2.png';
    const rockImage2 = 'img/5_background/layers/2_second_layer/rocks3.png';
    const groundImage = 'img/5_background/layers/1_first_layer/02_ground.png';

    addCloudAndRockBackgroundObjects(backgroundObjects, cloudImage, rockImage, rockImage2);
    addGroundBackgroundObjects(backgroundObjects, groundImage);

    return backgroundObjects;
}

/**
 * Adds cloud and rock background objects to the array.
 * @param {Array} backgroundObjects - The array to add background objects to.
 * @param {string} cloudImage - The image path for clouds.
 * @param {string} rockImage - The image path for rocks.
 * @param {string} rockImage2 - The image path for secondary rocks.
 */
function addCloudAndRockBackgroundObjects(backgroundObjects, cloudImage, rockImage, rockImage2) {
    for (let i = 0; i < 4; i++) {
        backgroundObjects.push(new BackgroundObject(cloudImage, i * 720 - 64, 0, 720, 480));
        backgroundObjects.push(new BackgroundObject(rockImage, i * 720 - 64, 0, 720, 480));
        backgroundObjects.push(new BackgroundObject(rockImage2, i * 720 - 64, 0, 720, 480));
    }
}

/**
 * Adds ground background objects to the array.
 * @param {Array} backgroundObjects - The array to add background objects to.
 * @param {string} groundImage - The image path for the ground.
 */
function addGroundBackgroundObjects(backgroundObjects, groundImage) {
    for (let i = -1; i < 34; i++) {
        backgroundObjects.push(new BackgroundObject(groundImage, i * 64, 414, 64, 64));
    }
}

/**
 * Initializes the level by calling createLevel.
 */
function initLevel() {
    createLevel();
}