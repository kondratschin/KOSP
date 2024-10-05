let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let fullScreen = false;
let gameStarted = false;
let soundMute = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('my character is', world.character);
    // checkDeviceMode();
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
    }
});

function enterFullscreen() {
    let element = document.getElementById('canvas');
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
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    gameStarted = true;
    closeStartScreen();
}

function closeStartScreen() {
    setTimeout(() => {
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('btn-start-game').classList.add('d-none');
        if (!soundMute) {
            soundOn();
        }
        keyboard.buttonKeyPressEvents();
        keyboard.buttonKeyPressEventsUndo();
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
    game_music.pause();
    clearAllIntervals();
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('game-over-screen').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    backToStartScreen();
    init();
    gameStarted = false;
    if (!soundMute) {
        game_over_sound.play();
    }
}

function winGame() {
    game_music.pause();
    clearAllIntervals();
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('win-screen').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    backToStartScreen();
    init();
    gameStarted = false;
    if (!soundMute) {
        game_win_sound.play();
    }
}

function soundOn() {
    document.getElementById('btn-sound-on').classList.remove('d-none');
    document.getElementById('btn-sound-off').classList.remove('d-flex');
    game_music.play();
    soundMute = false;
}

function soundOff() {
    document.getElementById('btn-sound-on').classList.add('d-none');
    document.getElementById('btn-sound-off').classList.add('d-flex');
    game_music.pause();
    soundMute = true;
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
