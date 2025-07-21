export class CollisionSystem {
    constructor(canvas, scoreRef) {
        this.canvas = canvas;
        this.scoreRef = scoreRef;
    }

    update(entities) {
        const player = entities.find(e => e.type === 'player');
        if (!player) return;

        // Check for collisions
        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            if (entity.type === 'item') {
                if (this._collides(player, entity)) {
                    this.scoreRef.value += entity.score;
                    entities.splice(i, 1); // remove caught item
                } else if (entity.y > this.canvas.height) {
                    entities.splice(i, 1); // remove missed item
                }
            }
        }
    }

    _collides(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }
}
