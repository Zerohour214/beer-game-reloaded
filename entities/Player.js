export class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // Current horizontal speed in pixels/second
        this.speed = 0;
        // Maximum movement speed in pixels/second
        // Tweak this value to make the player move faster or slower
        this.maxSpeed = 400;
        this.type = 'player';
    }
}
