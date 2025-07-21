import { Scene } from '../core/Scene.js';
import { Player } from '../entities/Player.js';
import { RenderSystem } from '../systems/RenderSystem.js';
import { InputSystem } from '../systems/InputSystem.js';
import { ItemSystem } from '../systems/ItemSystem.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';

export class GameScene extends Scene {
    async init(game) {
        super.init(game);
        this.scoreRef = { value: 0 };

        // Canvas context
        const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');

        // Create player
        const player = new Player(
            canvas.width / 2 - 50, canvas.height - 50,
            100, 30
        );
        this.addEntity(player);

        // Add systems
        this.addSystem(new InputSystem(canvas));
        this.addSystem(new ItemSystem(canvas, this.scoreRef));
        this.addSystem(new CollisionSystem(canvas, this.scoreRef));
        this.addSystem(new RenderSystem(ctx, this.scoreRef));
    }
}
