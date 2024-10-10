/**
 * Draw the game world. This method clears the canvas, draws the background, game elements, GUI elements, and the character and enemies, and then requests the next animation frame.
 */
function draw() {
    this.clearCanvas();
    this.drawBackground();
    this.ctx.translate(this.camera_x, 0);
    this.drawGameElements();
    this.ctx.translate(-this.camera_x, 0);
    this.drawGUIElements();
    this.ctx.translate(this.camera_x, 0);
    this.drawCharacterAndEnemies();
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
}

function clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function drawBackground() {
    if (this.background) {
        this.background.draw(this.ctx);
    }
}

function drawGameElements() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.manaBottles);
}

function drawGUIElements() {
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
    this.drawBossGUI();
    this.drawMagicBar();
    this.drawGoldBar();
}

function drawBossGUI() {
    if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.firstContact)) {
        this.addToMap(this.BossGUI);
        this.addToMap(this.bossImage);
        this.addToMap(this.statusBarBossSetPercentage);
        if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy === world.statusBarBossSetPercentage.energyBoss)) {
            this.addToMap(this.statusBarBossRightCorner);
        }
        if (this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy > 0)) {
            this.addToMap(this.statusBarBossLeftCorner);
        }
    }
}

function drawMagicBar() {
    if (this.character.collectedBottles > 0) {
        this.addToMap(this.magicBarLeftCorner);
    }
    if (this.character.collectedBottles >= this.magicBarFullAmount) {
        this.addToMap(this.magicBarRightCorner);
    }
    this.addToMap(this.magicBarSetPercentage);
}

function drawGoldBar() {
    if (this.character.collectedCoins > 0) {
        this.addToMap(this.goldBarLeftCorner);
    }
    this.addToMap(this.goldBarSetPercentage);
    if (this.character.collectedCoins === this.initialCoinsAmount) {
        this.addToMap(this.goldBarRightCorner);
    }
}

function drawCharacterAndEnemies() {
    this.addObjectsToMap(this.level.clouds);
    if (!this.character.removeCorpse) {
        this.addToMap(this.character);
    }
    this.addObjectsToMap(this.level.enemies.filter(enemy => !enemy.removeCorpse));
    this.addObjectsToMap(this.flyingObjects);
}

/**
 * Add multiple objects to the map.
 */
function addObjectsToMap(objects) {
    objects.forEach(o => this.addToMap(o));
}

function addToMap(mo) {
    if (mo.otherDirection) {
        this.flipImage(mo);
        mo.drawFrame(this.ctx);
    } else {
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
    }
}

/**
 * Flip an image horizontally.
 */
function flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width - 35, mo.y);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    this.ctx.restore();
}

export {
    draw,
    clearCanvas,
    drawBackground,
    drawGameElements,
    drawGUIElements,
    drawBossGUI,
    drawMagicBar,
    drawGoldBar,
    drawCharacterAndEnemies,
    addObjectsToMap,
    addToMap,
    flipImage
};