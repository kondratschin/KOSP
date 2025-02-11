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

/**
 * Initialize the game.
 */
function init() {
    checkDeviceMode();
    soundMute = true;
    game_music.pause();
    startGameWithEnter();
}

/**
 * Event listener for keydown events.
 */
window.addEventListener('keydown', (e) => handleKeyDown(e));

/**
 * Handle keydown events.
 */
function handleKeyDown(e) {
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
}

/**
 * Event listener for keyup events.
 */
window.addEventListener('keyup', (e) => handleKeyUp(e));

/**
 * Handle keyup events.
 */
function handleKeyUp(e) {
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
}

/**
 * Enter fullscreen mode.
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
 * Start the game.
 */
function startGame() {
    closeStartScreen();
    hideGameTitleMobile();
    document.getElementById('legal-notice').classList.add('d-none');
    soundMute = true;
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    gameStarted = true;
    hideGameTitleMobile();
    checkDeviceMode();

    if (!soundButtonMute) {
        setTimeout(() => {
            soundMute = false;
        }, 500);
    }
}

/**
 * Hide the game title for mobile.
 */
function hideGameTitleMobile() {
    document.getElementById('game-title-mobile').classList.remove('d-flex');
    document.getElementById('game-title-mobile').classList.add('d-none');
}

/**
 * Close the start screen.
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
 * Start the game when the Enter key is pressed.
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
    isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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
 * Show desktop mode UI.
 */
function showDesktopMode(panel, mainContainer, rotateDevice) {
    panel.classList.remove('d-flex');
    panel.classList.add('d-none');
    mainContainer.classList.remove('d-none');
    rotateDevice.classList.remove('d-flex');
    document.body.classList.remove('bg-position');
}

/**
 * Show portrait mode UI.
 */
function showPortraitMode(panel, mainContainer, rotateDevice) {
    if (gameStarted) {
        panel.classList.remove('d-none');
        panel.classList.add('d-flex');
    }
    mainContainer.classList.add('d-none');
    rotateDevice.classList.add('d-flex');
    document.body.classList.add('bg-position');
    if (isMobile) {
        document.getElementById('game-title-mobile').classList.add('d-none');
    }
}

/**
 * Show landscape mode UI.
 */
function showLandscapeMode(panel, mainContainer, rotateDevice) {
    mainContainer.classList.remove('d-none');
    rotateDevice.classList.remove('d-flex');
    document.body.classList.remove('bg-position');
    document.getElementById('game-title-mobile').classList.remove('d-none');
    if (gameStarted) {
        panel.classList.remove('d-none');
        panel.classList.add('d-flex');
        document.getElementById('game-title-mobile').classList.add('d-none');
    }
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
 * Exit fullscreen mode.
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
    document.getElementById('btn-restart').classList.add('d-none');
    document.getElementById('game-over-screen').classList.add('d-none');
    init();
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
}

/**
 * Restart the game.
 */
function restartGame() {
    document.getElementById('btn-restart').classList.add('d-none');
    document.getElementById('game-over-screen').classList.add('d-none');
    init();
    document.getElementById('overlay-grey').classList.remove('d-flex');
    document.getElementById('game-over-screen').classList.remove('d-flex');
    document.getElementById('win-screen').classList.remove('d-flex');
    if (isMobile) {
        document.getElementById('game-title-mobile').classList.add('d-flex');
        document.getElementById('game-title-mobile').classList.remove('d-none');
    }
    startGame();
}

/**
 * Handle game over scenario.
 */
function gameOver() {
    let panel = document.getElementById('panel');
    gameStarted = false;
    clearAllIntervals();

    if (!soundMute) {
        game_over_sound.play();
    }
    game_music.pause();
    world.enemies[0].endBossMusic.pause();
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    panel.classList.remove('d-flex');
    panel.classList.add('d-none');
    setTimeout(() => {
        document.getElementById('game-over-screen').classList.add('d-flex');
        document.getElementById('btn-restart').classList.remove('d-none');
    }, 2000);
}

/**
 * Handle win game scenario.
 */
function winGame() {
    let panel = document.getElementById('panel');
    gameStarted = false;
    clearAllIntervals();
    if (!soundMute && !soundButtonMute) {
        game_win_sound.play();
    }
    game_music.pause();
    world.enemies[0].endBossMusic.pause();
    panel.classList.remove('d-flex');
    panel.classList.add('d-none');
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    setTimeout(() => {
        document.getElementById('win-screen').classList.add('d-flex');
        document.getElementById('btn-restart').classList.remove('d-none');
    }, 2000);
}

/**
 * Turn sound on.
 */
function soundOn() {
    document.getElementById('btn-sound-on').classList.remove('d-none');
    document.getElementById('btn-sound-off').classList.remove('d-flex');
    game_music.play();
    soundMute = false;
    soundButtonMute = false;
}

/**
 * Turn sound off.
 */
function soundOff() {
    document.getElementById('btn-sound-on').classList.add('d-none');
    document.getElementById('btn-sound-off').classList.add('d-flex');
    game_music.pause();
    soundMute = true;
    soundButtonMute = true;
}

/**
 * Clear all intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}