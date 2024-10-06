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
    // checkDeviceMode();
    soundMute = true;
    game_music.pause();
    startGameWithEnter();
}

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
    console.log('key pressed', e);
});

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

function startGame() {
    initLevel();
    soundMute = true;

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    gameStarted = true;
    closeStartScreen();
    if (!soundButtonMute) {
    setTimeout(() => {
        soundMute = false;
    }, 500);
}

}

function closeStartScreen() {
    setTimeout(() => {
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('btn-start-game').classList.add('d-none');
        if (!soundMute && !soundButtonMute) {
            soundOn();
        }
        // keyboard.buttonKeyPressEvents();
        // keyboard.buttonKeyPressEventsUndo();
    }, 1000);
}

function startGameWithEnter() {
    setInterval(() => {
        if (keyboard.ENTER && !gameStarted) {
            startGame();
        }
    }, 1000 / 25);
}

function checkDeviceMode() {
    setInterval(() => {
        if (window.innerHeight > window.innerWidth) {
            document.getElementById('main-container').classList.add('d-none');
            document.getElementById('rotate-device').classList.add('d-flex');
            document.body.classList.add('bg-position');
        } else {
            document.getElementById('main-container').classList.remove('d-none');
            document.getElementById('rotate-device').classList.remove('d-flex');
            document.body.classList.remove('bg-position');
        }
    }, 1000 / 25);
}

function checkGameMusic() {
    setInterval(() => {
        game_music.addEventListener("ended", function () {
            game_music.currentTime = 0;
        });
    }, 500);
}

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

function backToStartScreen() {
    setTimeout(() => {
        document.getElementById('overlay-grey').classList.remove('d-flex');
        document.getElementById('game-over-screen').classList.remove('d-flex');
        document.getElementById('win-screen').classList.remove('d-flex');
        document.getElementById('start-screen').classList.remove('d-none');
        document.getElementById('btn-start-game').classList.remove('d-none');
    }, 3000);
}

function gameOver() {
    if (!soundMute) {
        game_over_sound.play();
    }
    game_music.pause();
    world.enemies[0].endBossMusic.pause();
    clearAllIntervals();
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('game-over-screen').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    backToStartScreen();
    init();
    gameStarted = false;

}

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

function soundOn() {
    document.getElementById('btn-sound-on').classList.remove('d-none');
    document.getElementById('btn-sound-off').classList.remove('d-flex');
    game_music.play();
    soundMute = false;
    soundButtonMute = false;
}

function soundOff() {
    document.getElementById('btn-sound-on').classList.add('d-none');
    document.getElementById('btn-sound-off').classList.add('d-flex');
    game_music.pause();
    soundMute = true;
    soundButtonMute = true;
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
