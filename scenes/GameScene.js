import { Scene } from '../core/Scene.js';
import { Player } from '../entities/Player.js';
import { RenderSystem } from '../systems/RenderSystem.js';
import { InputSystem } from '../systems/InputSystem.js';
import { ItemSystem } from '../systems/ItemSystem.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

export class GameScene extends Scene {
    async init(game) {
        super.init(game);
        this.scoreRef = { value: 0 };

        // Canvas context
        const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');

        // Load images
        let playerImg, itemImg;
        try {
            playerImg = await loadImage('assets/player.svg');
        } catch (error) {
            console.error('Failed to load player image:', error);
            playerImg = document.createElement('canvas');
            playerImg.width = 50; // Default width
            playerImg.height = 50; // Default height
            const ctx = playerImg.getContext('2d');
            ctx.fillStyle = 'gray'; // Placeholder color
            ctx.fillRect(0, 0, playerImg.width, playerImg.height);
        }
        try {
            itemImg = await loadImage('assets/item.svg');
        } catch (error) {
            console.error('Failed to load item image:', error);
            itemImg = document.createElement('canvas');
            itemImg.width = 30; // Default width
            itemImg.height = 30; // Default height
            const ctx = itemImg.getContext('2d');
            ctx.fillStyle = 'gray'; // Placeholder color
            ctx.fillRect(0, 0, itemImg.width, itemImg.height);
        }
        // Create player
        const player = new Player(
            canvas.width / 2 - playerImg.width / 2,
            canvas.height - playerImg.height,
            playerImg.width,
            playerImg.height,
            playerImg
        );
        this.addEntity(player);

        // Add systems
        this.addSystem(new InputSystem(canvas));
        this.addSystem(new ItemSystem(canvas, this.scoreRef, itemImg));
        this.addSystem(new CollisionSystem(canvas, this.scoreRef));
        this.addSystem(new RenderSystem(ctx, this.scoreRef));
    }
}
