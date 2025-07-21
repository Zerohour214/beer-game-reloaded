let idCounter = 1;

export class Item {
    constructor(x, y, width, height, score) {
        this.id = idCounter++;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 200; // px/s
        this.score = score;
        this.type = 'item';
    }
}
