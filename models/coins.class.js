class Coins extends MovableObject {
    y = 314;
    x = 200;
    height = 32;
    width = 32;

    IMAGES_COIN = [
        'img/8_coin/coin1.png',
        'img/8_coin/coin2.png',
        'img/8_coin/coin3.png',
        'img/8_coin/coin4.png',
        'img/8_coin/coin5.png',
        'img/8_coin/coin6.png',
        'img/8_coin/coin7.png',
        'img/8_coin/coin8.png',
        'img/8_coin/coin9.png',
        'img/8_coin/coin10.png'
    ];

    constructor(x, y) {
        super().loadImage('img/8_coin/coin1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }


}