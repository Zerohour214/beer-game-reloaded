import { Item } from '../entities/Item.js';

export class ItemSystem {
    constructor(canvas, scoreRef, itemImage = null) {
        this.canvas = canvas;
        this.spawnInterval = 1.0; // seconds
        this.timer = 0;
        this.scoreRef = scoreRef;
        this.itemImage = itemImage;
    }

    update(entities, dt) {
        // Drop new items
        this.timer += dt;
        if (this.timer >= this.spawnInterval) {
            this.timer = 0;
            const imgW = this.itemImage ? this.itemImage.width : 30;
            const x = Math.random() * (this.canvas.width - imgW);
            const score = 10;
            const imgH = this.itemImage ? this.itemImage.height : 30;
            entities.push(new Item(x, 0, imgW, imgH, score, this.itemImage));
        }

        // Move items down
        entities.filter(e => e.type === 'item').forEach(item => {
            item.y += item.speed * dt;
        });
    }
}
