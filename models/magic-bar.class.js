class MagicBar extends DrawableObject {

        IMAGES = [
            'img/7_statusbars/2_interface/hp_corner1.png',
            'img/7_statusbars/2_interface/hp_full.png',
            'img/7_statusbars/2_interface/hp_corner2.png'
        ];
    
        percentage = 100;
    
        constructor(initMethod = 'leftCorner') {
            super();
            this.loadImages(this.IMAGES);
    
            if (initMethod === 'leftCorner') {
                this.leftCorner();
                
            } else if (initMethod === 'rightCorner') {
                this.rightCorner();
            } else if (initMethod === 'setPercentage') {
                this.setPercentage(this.percentage);
            }
        }
    
        leftCorner() {
            this.img = this.imageCache[this.IMAGES[0]];
            this.x = 102;
            this.y = 50;
            this.width = 4;
            this.height = 12;
            
        }
    
        rightCorner() {
            this.img = this.imageCache[this.IMAGES[2]];
            this.x = 194;
            this.y = 50;
            this.width = 4;
            this.height = 12;
        }
    
        setPercentage(percentage) {
            this.percentage = percentage;
    
            let path = this.IMAGES[1];
            this.img = this.imageCache[path];
            this.width = 88 * (percentage / 100);
            this.x = 106;
            this.y = 50;
    
            this.height = 12;
        }
    

    }
