import { Item } from '../entities/Item.js';

export class ItemSystem {
    constructor(canvas, scoreRef, levelRef, itemImage = null) {
        this.canvas = canvas;
        this.spawnInterval = 1.0; // seconds
        this.timer = 0;
        this.scoreRef = scoreRef;
        this.levelRef = levelRef;
        this.itemImage = itemImage;
    }

    update(entities, dt) {
        const currentSpeed = 200 + (this.levelRef.value - 1) * 50;

        // Drop new items
        this.timer += dt;
        if (this.timer >= this.spawnInterval) {
            this.timer = 0;
            const imgW = this.itemImage ? this.itemImage.width : 30;
            const x = Math.random() * (this.canvas.width - imgW);
            const score = 10;
            const imgH = this.itemImage ? this.itemImage.height : 30;
            entities.push(new Item(x, 0, imgW, imgH, score, this.itemImage, currentSpeed));
        }

        // Move items down and apply speed for current level
        entities.filter(e => e.type === 'item').forEach(item => {
            item.speed = currentSpeed;
            item.y += item.speed * dt;
        });
    }
}
