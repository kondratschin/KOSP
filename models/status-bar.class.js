class StatusBar {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('status-bar');
        this.element.innerHTML = 'Status Bar';
    }
    render() {
        return this.element;
    }
}