export class Game {
    constructor({ width = 800, height = 600, initialScene }) {
        this.width = width;
        this.height = height;
        this.currentScene = initialScene;
        this.lastTimestamp = 0;
        this.input = null;
    }

    async start() {
        // Setup input
        const { InputManager } = await import('./InputManager.js');
        this.input = new InputManager();

        // Set canvas size if not already set
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            canvas.width = this.width;
            canvas.height = this.height;
        }

        // Init scene
        await this.currentScene.init(this);

        // Start loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    async changeScene(newScene) {
        this.currentScene = newScene;
        await newScene.init(this);
    }

    gameLoop(timestamp) {
        const dt = (timestamp - this.lastTimestamp) / 1000 || 0;
        this.lastTimestamp = timestamp;

        this.currentScene.update(dt, this.input);
        this.currentScene.render();

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
