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

        // Utility to resize any loaded image to a canvas of (w, h)
        function resizeImageToCanvas(img, w, h) {
            const c = document.createElement('canvas');
            c.width = w;
            c.height = h;
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            return c;
        }

        try {
            let loadedPlayerImg = await loadImage('assets/beer-barrel.png');
        // Scale to 50x50
            playerImg = resizeImageToCanvas(loadedPlayerImg, 80, 80);
        } catch (error) {
            console.error('Failed to load player image:', error);
            playerImg = document.createElement('canvas');
            playerImg.width = 40;
            playerImg.height = 40;
            const ctx = playerImg.getContext('2d');
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, 40, 40);
        }

        try {
            let loadedItemImg = await loadImage('assets/beer-bottle.png');
        // Scale to 50x80
            itemImg = resizeImageToCanvas(loadedItemImg, 50, 80);
        } catch (error) {
            console.error('Failed to load item image:', error);
            itemImg = document.createElement('canvas');
            itemImg.width = 50;
            itemImg.height = 80;
            const ctx = itemImg.getContext('2d');
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, 50, 80);
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
