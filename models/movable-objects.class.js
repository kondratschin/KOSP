class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 250;
    width = 250;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('move right');
    }
}