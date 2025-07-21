export class Player {
    constructor(x, y, width, height, image = null) {
        this.x = x;
        this.y = y;
        this.width = width || (image ? image.width : 0);
        this.height = height || (image ? image.height : 0);
        this.speed = 400; // px/s
        this.type = 'player';
        this.image = image;
    }
}
