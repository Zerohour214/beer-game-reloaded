let idCounter = 1;

export class Item {
    constructor(x, y, width, height, score, image = null) {
        this.id = idCounter++;
        this.x = x;
        this.y = y;
        this.width = width !== null && width !== undefined ? width : (image ? image.width : 0);
        this.height = height !== null && height !== undefined ? height : (image ? image.height : 0);
        this.speed = 200; // px/s
        this.score = score;
        this.type = 'item';
        this.image = image;
    }
}
