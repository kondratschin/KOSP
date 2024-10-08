let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let fullScreen = false;
let gameStarted = false;
let soundMute = false;
let soundButtonMute = false;
let game_music = new Audio('audio/background.mp3');
let game_over_sound = new Audio('audio/gameover.mp3');
let game_win_sound = new Audio('audio/gamewon.mp3');

function init() {
    checkDeviceMode();
    soundMute = true;
    game_music.pause();
    startGameWithEnter();
}

/**
 * Event listener for keydown events
 */
window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 39:
            keyboard.RIGHT = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
        case 68:
            keyboard.D = true;
            break;
        case 13:
            keyboard.ENTER = true;
            break;
    }
});

/**
 * Event listener for keyup events
 */
window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 39:
            keyboard.RIGHT = false;
            break;
        case 37:
            keyboard.LEFT = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
        case 68:
            keyboard.D = false;
            break;
        case 13:
            keyboard.ENTER = false;
            break;
    }
});

/**
 * Enter fullscreen mode
 */
function enterFullscreen() {
    let element = document.getElementById('container-canvas');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    document.getElementById('btn-full-screen').classList.add('d-none');
    document.getElementById('btn-close-full-screen').classList.add('d-flex');
    fullScreen = true;
}

/**
 * Starts the game by closing the start screen, initializing the level,
 * setting up the canvas and world, and checking the device mode.
 */
function startGame() {
    closeStartScreen();
    document.getElementById('game-title-mobile').classList.remove('d-flex');
    document.getElementById('game-title-mobile').classList.add('d-none');
    document.getElementById('legal-notice').classList.add('d-none');
    soundMute = true;

    initLevel();

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    gameStarted = true;

    document.getElementById('game-title-mobile').classList.remove('d-flex');
    document.getElementById('game-title-mobile').classList.add('d-none');
    checkDeviceMode();

    if (!soundButtonMute) {
        setTimeout(() => {
            soundMute = false;
        }, 500);
    }
}

/**
 * Closes the start screen after a delay and sets up the game environment.
 */
function closeStartScreen() {
    setTimeout(() => {
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('btn-start-game').classList.add('d-none');
        if (!soundMute && !soundButtonMute) {
            soundOn();
        }
        keyboard.buttonKeyPressEvents();
        keyboard.buttonKeyPressEventsUndo();
    }, 1000);
}

/**
 * Starts the game when the Enter key is pressed.
 */
function startGameWithEnter() {
    setInterval(() => {
        if (keyboard.ENTER && !gameStarted) {
            startGame();
        }
    }, 1000 / 25);
}

/**
 * Check the device mode and update the UI accordingly.
 */
function checkDeviceMode() {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    updateDeviceMode();
    window.addEventListener('resize', updateDeviceMode);
}

/**
 * Update the device mode UI based on the current device and orientation.
 */
function updateDeviceMode() {
    let panel = document.getElementById('panel');
    let mainContainer = document.getElementById('main-container');
    let rotateDevice = document.getElementById('rotate-device');

    if (!isMobile && !gameStarted) {
        showDesktopMode(panel, mainContainer, rotateDevice);
    } else if (isMobile && window.innerHeight > window.innerWidth) {
        showPortraitMode(panel, mainContainer, rotateDevice);
    } else if (isMobile && window.innerHeight < window.innerWidth) {
        showLandscapeMode(panel, mainContainer, rotateDevice);
    }
}

/**
 * Show desktop mode UI
 */
function showDesktopMode(panel, mainContainer, rotateDevice) {
    panel.classList.remove('d-flex');
    panel.classList.add('d-none');
    mainContainer.classList.remove('d-none');
    rotateDevice.classList.remove('d-flex');
    document.body.classList.remove('bg-position');

}

/**
 * Show portrait mode UI
 */
function showPortraitMode(panel, mainContainer, rotateDevice) {
    panel.classList.remove('d-none');
    panel.classList.add('d-flex');
    mainContainer.classList.add('d-none');
    rotateDevice.classList.add('d-flex');
    document.body.classList.add('bg-position');
    if (isMobile) {
        document.getElementById('game-title-mobile').classList.remove('d-flex');
        document.getElementById('game-title-mobile').classList.add('d-none');
    }
}

/**
 * Show landscape mode UI
 */
function showLandscapeMode(panel, mainContainer, rotateDevice) {
    panel.classList.add('d-flex');
    panel.classList.remove('d-none');
    mainContainer.classList.remove('d-none');
    rotateDevice.classList.remove('d-flex');
    document.body.classList.remove('bg-position');
}

/**
 * Check if the game music has ended and restart it.
 */
function checkGameMusic() {
    setInterval(() => {
        game_music.addEventListener("ended", function () {
            game_music.currentTime = 0;
        });
    }, 500);
}

/**
 * Exit fullscreen mode
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    document.getElementById('btn-full-screen').classList.remove('d-none');
    document.getElementById('btn-close-full-screen').classList.remove('d-flex');
    fullScreen = false;
}

/**
 * Return to the start screen after a delay.
 */
function backToStartScreen() {
    setTimeout(() => {
        document.getElementById('overlay-grey').classList.remove('d-flex');
        document.getElementById('game-over-screen').classList.remove('d-flex');
        document.getElementById('win-screen').classList.remove('d-flex');
        document.getElementById('start-screen').classList.remove('d-none');
        document.getElementById('btn-start-game').classList.remove('d-none');
        document.getElementById('legal-notice').classList.remove('d-none');
        if (isMobile) {
            document.getElementById('game-title-mobile').classList.add('d-flex');
            document.getElementById('game-title-mobile').classList.remove('d-none');
        }
    }, 3000);
}

function gameOver() {
    if (!soundMute) {
        game_over_sound.play();
    }
    game_music.pause();
    world.enemies[0].endBossMusic.pause();
    gameStarted = false;
    clearAllIntervals();
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('game-over-screen').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    backToStartScreen();
    init();
    gameStarted = false;
}

/**
 * Handles the win game scenario by playing the win sound, pausing the game music,
 * stopping the end boss music, clearing all intervals, and showing the win screen.
 */
function winGame() {
    if (!soundMute && !soundButtonMute) {
        game_win_sound.play();
    }
    game_music.pause();
    world.enemies[0].endBossMusic.pause();
    clearAllIntervals();
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('win-screen').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    backToStartScreen();
    init();
    gameStarted = false;
}

/**
 * Turn sound on
 */
function soundOn() {
    document.getElementById('btn-sound-on').classList.remove('d-none');
    document.getElementById('btn-sound-off').classList.remove('d-flex');
    game_music.play();
    soundMute = false;
    soundButtonMute = false;
}

/**
 * Turn sound off
 */
function soundOff() {
    document.getElementById('btn-sound-on').classList.add('d-none');
    document.getElementById('btn-sound-off').classList.add('d-flex');
    game_music.pause();
    soundMute = true;
    soundButtonMute = true;
}

/**
 * Clear all intervals
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
