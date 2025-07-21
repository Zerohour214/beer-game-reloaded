import { Item } from '../entities/Item.js';

export class ItemSystem {
    constructor(canvas, scoreRef) {
        this.canvas = canvas;
        this.spawnInterval = 1.0; // seconds
        this.timer = 0;
        this.scoreRef = scoreRef;
    }

    update(entities, dt) {
        // Drop new items
        this.timer += dt;
        if (this.timer >= this.spawnInterval) {
            this.timer = 0;
            const x = Math.random() * (this.canvas.width - 30);
            const score = 10;
            entities.push(new Item(x, 0, 30, 30, score));
        }

        // Move items down
        entities.filter(e => e.type === 'item').forEach(item => {
            item.y += item.speed * dt;
        });
    }
}
