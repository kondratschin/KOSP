/**
 * Class responsible for drawing various elements in the game world.
 */
class Drawer {
    /**
     * Creates an instance of Drawer.
     * @param {Object} world - The game world instance.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Draws the background of the game world.
     */
    drawBackground() {
        if (this.world.background) {
            this.world.background.draw(this.world.ctx);
        }
    }

    /**
     * Draws the game elements such as background objects, coins, and mana bottles.
     */
    drawGameElements() {
        this.addObjectsToMap(this.world.level.backgroundObjects);
        this.addObjectsToMap(this.world.coins);
        this.addObjectsToMap(this.world.manaBottles);
    }

    /**
     * Draws the GUI elements such as the status bars and other GUI components.
     */
    drawGUIElements() {
        this.addToMap(this.world.guiFrame);
        this.addToMap(this.world.characterGUI);
        this.addToMap(this.world.goldGUI);
        this.addToMap(this.world.magicGUI);
        if (this.world.character.energy > 0) {
            this.addToMap(this.world.statusBarLeftCorner);
        }
        if (this.world.character.energy === 100) {
            this.addToMap(this.world.statusBarRightCorner);
        }
        this.addToMap(this.world.statusBarSetPercentage);
        this.drawBossGUI();
        this.drawMagicBar();
        this.drawGoldBar();
    }

    /**
     * Draws the Boss GUI elements if the boss is present and has made first contact.
     */
    drawBossGUI() {
        if (this.world.level.enemies.some(enemy => enemy instanceof Endboss && enemy.firstContact)) {
            this.addToMap(this.world.BossGUI);
            this.addToMap(this.world.bossImage);
            this.addToMap(this.world.statusBarBossSetPercentage);
            if (this.world.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy === this.world.statusBarBossSetPercentage.energyBoss)) {
                this.addToMap(this.world.statusBarBossRightCorner);
            }
            if (this.world.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy > 0)) {
                this.addToMap(this.world.statusBarBossLeftCorner);
            }
        }
    }

    /**
     * Draws the magic bar based on the character's collected bottles.
     */
    drawMagicBar() {
        if (this.world.character.collectedBottles > 0) {
            this.addToMap(this.world.magicBarLeftCorner);
        }
        if (this.world.character.collectedBottles >= this.world.magicBarFullAmount) {
            this.addToMap(this.world.magicBarRightCorner);
        }
        this.addToMap(this.world.magicBarSetPercentage);
    }

    /**
     * Draws the gold bar based on the character's collected coins.
     */
    drawGoldBar() {
        if (this.world.character.collectedCoins > 0) {
            this.addToMap(this.world.goldBarLeftCorner);
        }
        this.addToMap(this.world.goldBarSetPercentage);
        if (this.world.character.collectedCoins === this.world.initialCoinsAmount) {
            this.addToMap(this.world.goldBarRightCorner);
        }
    }

    /**
     * Draws the character and enemies in the game world.
     */
    drawCharacterAndEnemies() {
        this.addObjectsToMap(this.world.level.clouds);
        if (!this.world.character.removeCorpse) {
            this.addToMap(this.world.character);
        }
        this.addObjectsToMap(this.world.level.enemies.filter(enemy => !enemy.removeCorpse));
        this.addObjectsToMap(this.world.flyingObjects);
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array<Object>} objects - The objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Adds a single object to the map.
     * @param {Object} mo - The object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
            mo.drawFrame(this.world.ctx);
        } else {
            mo.draw(this.world.ctx);
            mo.drawFrame(this.world.ctx);
        }
    }

    /**
     * Flips the image of an object horizontally.
     * @param {Object} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
        this.world.ctx.save();
        this.world.ctx.translate(mo.x + mo.width - 35, mo.y);
        this.world.ctx.scale(-1, 1);
        this.world.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
        this.world.ctx.restore();
    }
}