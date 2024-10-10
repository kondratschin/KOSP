class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    ENTER = false;

    /**
     * Add event listeners for the mobile action buttons and set the corresponding variable to true
     */
    buttonKeyPressEvents() {
        this.addTouchEvent('btn-walk-left', 'touchstart', () => this.LEFT = true);
        this.addTouchEvent('btn-walk-right', 'touchstart', () => this.RIGHT = true);
        this.addTouchEvent('btn-jump', 'touchstart', () => this.SPACE = true);
        this.addTouchEvent('btn-throw', 'touchstart', () => this.D = true);
    }

    /**
     * Set the corresponding variables of the used button to false
     */
    buttonKeyPressEventsUndo() {
        this.addTouchEvent('btn-walk-left', 'touchend', () => this.LEFT = false);
        this.addTouchEvent('btn-walk-right', 'touchend', () => this.RIGHT = false);
        this.addTouchEvent('btn-jump', 'touchend', () => this.SPACE = false);
        this.addTouchEvent('btn-throw', 'touchend', () => this.D = false);
    }

    /**
     * Helper method to add touch event listeners
     * @param {string} elementId - The ID of the element to attach the event to
     * @param {string} eventType - The type of the touch event (e.g., 'touchstart', 'touchend')
     * @param {Function} callback - The callback function to execute on the event
     */
    addTouchEvent(elementId, eventType, callback) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(eventType, (e) => {
                if (e.cancelable) e.preventDefault();
                callback();
            });
        }
    }
}
