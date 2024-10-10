class World {
    fireSound = new Audio('audio/fire.mp3');
    coinSound = new Audio('audio/coin.mp3');
    potionSound = new Audio('audio/potion_glass.mp3');
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    flyingObjects = [new FlyingObject()];
    coins = [];
    manaBottles = [];
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
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    background;
    initialCoinsAmount = 0;
    magicBarFullAmount = 10;
    endBossDamage = 50;
    enemyDamage = 5;
    knightDamage = 10;
    fireDamage = 5;

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawer = new Drawer(this);
        this.collisionChecker = new CollisionChecker(this);
        this.setFixedBackground('img/5_background/layers/sky.png', 0, 0, 720, 405);
        this.setWorld();
        this.shootInterval();
        this.run();
        this.createCoins();
        this.createMana();
        this.initialCoinsAmount = this.coins.length;
        this.draw();
    }

    /**
     * Set the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Run the game loop. This method sets up an interval to repeatedly check for collisions, character position relative to enemies, game over condition, and win condition.
     */
    run() {
        setInterval(() => {
            this.collisionChecker.checkCollisions();
            this.checkCharacterPositionForEnemies();
            this.checkGameOver();
            this.draw();
            this.checkWinGame();
        }, 1000 / 60);
    }

    /**
     * Set the interval for checking flying objects. This method sets up an interval to repeatedly check the status of flying objects.
     */
    shootInterval() {
        setInterval(() => {
            this.checkFlyingObjects();
        }, 1000 / 10);
    }

    /**
     * Check and handle the creation of flying objects (e.g., fireballs). If the 'D' key is pressed and the character has collected bottles, a new flying object is created and added to the flyingObjects array.
     */
    checkFlyingObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            this.character.collectedBottles -= 1;
            this.magicBarSetPercentage.setPercentage(this.character.collectedBottles / this.magicBarFullAmount);
            let fire = new FlyingObject(
                this.character.otherDirection ? this.character.x - 22 : this.character.x + 22,
                this.character.y,
                this.character.otherDirection ? 'back' : 'front'
            );
            this.flyingObjects.push(fire);
        }
    }

    /**
     * Create coins at predefined positions and add them to the coins array.
     */
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

    /**
     * Check the character's position to spawn enemies. If the character reaches a specific position (x = 800) and enemies have not been spawned yet, spawn a set of enemies (snakes and an orc) at random positions.
     */
    checkCharacterPositionForEnemies() {
        if (this.character.x === 800 && !this.enemiesSpawned) {
            this.enemiesSpawned = true;
            for (let i = 0; i < 3; i++) {
                let snake = new Snake();
                snake.x = 1300 + Math.random() * 500;
                this.enemies.push(snake);
            }
            let orc = new Orc();
            orc.x = 1300 + Math.random() * 500;
            this.enemies.push(orc);
        }
    }

    /**
     * Create mana bottles at predefined positions and add them to the manaBottles array.
     */
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

    /**
     * Set a fixed background image.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The x-coordinate of the background image.
     * @param {number} y - The y-coordinate of the background image.
     * @param {number} width - The width of the background image.
     * @param {number} height - The height of the background image.
     */
    setFixedBackground(imagePath, x, y, width, height) {
        this.background = new BackgroundObject(imagePath, x, y, width, height);
    }

    /**
     * Draw the game world. This method clears the canvas, draws the background, game elements, GUI elements, and the character and enemies.
     */
    draw() {
        this.clearCanvas();
        this.drawer.drawBackground();
        this.ctx.translate(this.camera_x, 0);
        this.drawer.drawGameElements();
        this.ctx.translate(-this.camera_x, 0);
        this.drawer.drawGUIElements();
        this.ctx.translate(this.camera_x, 0);
        this.drawer.drawCharacterAndEnemies();
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Clear the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Check if the game is over.
     */
    checkGameOver() {
        if (this.character.gameOver) {
            gameOver();
        }
    }

    /**
     * Check if the game is won.
     */
    checkWinGame() {
        if (world.enemies[0].endBossDead) {
            winGame();
        }
    }
}