/**
 * Class representing a level in the game.
 */
class Level {
    /**
     * @param {Array} enemies - The enemies present in the level.
     * @param {Array} clouds - The clouds present in the level.
     * @param {Array} backgroundObjects - The background objects present in the level.
     */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = 1500; // The x-coordinate where the level ends.
    }
}