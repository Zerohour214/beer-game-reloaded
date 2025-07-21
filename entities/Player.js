export class Player {
    constructor(x, y, width, height, image = null) {
        this.x = x;
        this.y = y;
// Removed redundant direct assignments for width and height.
        // Current horizontal speed in pixels/second
        this.speed = 0;
        // Maximum movement speed in pixels/second
        // Tweak this value to make the player move faster or slower
        this.maxSpeed = 400;
        this.width = width !== null && width !== undefined ? width : (image ? image.width : 0);
        this.height = height !== null && height !== undefined ? height : (image ? image.height : 0);
        this.type = 'player';
        this.image = image;
    }
}
