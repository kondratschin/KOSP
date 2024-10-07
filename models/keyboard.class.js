class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    ENTER = false;

    /**
     * Add eventlisteners for the mobile action buttons and set the corresponding variable to true
     */
    buttonKeyPressEvents() {
        document.getElementById('btn-walk-left').addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btn-walk-right').addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
            this.D = true;
        });
    }

    /**
     * Set the corresponding variables of the used button to false
     */
    buttonKeyPressEventsUndo() {
        document.getElementById('btn-walk-left').addEventListener('touchend', (e) => {
            if (e.cancelable) e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btn-walk-right').addEventListener('touchend', (e) => {
            if (e.cancelable) e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btn-jump').addEventListener('touchend', (e) => {
            if (e.cancelable) e.preventDefault();
            this.SPACE = false;
        });
        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            if (e.cancelable) e.preventDefault();
            this.D = false;
        });
    }
}