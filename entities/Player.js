export class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 400; // px/s
        this.type = 'player';
    }
}
