export class Game {
    constructor({ width = 800, height = 600, initialScene }) {
        this.width = width;
        this.height = height;
        this.currentScene = initialScene;
        this.lastTimestamp = 0;
        this.input = null;
        this.paused = false;
        this.running = false;
        this.frameId = null;
        this.helpElement = null;
        this.pausedBeforeHelp = false;
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

        // Help overlay element
        this.helpElement = document.getElementById('help-overlay');

        // Init scene
        await this.currentScene.init(this);

        // Start loop
        this.running = true;
        this.paused = false;
        this.frameId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    async changeScene(newScene) {
        this.currentScene = newScene;
        await newScene.init(this);
    }

    stop() {
        this.running = false;
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }

    gameLoop(timestamp) {
        if (!this.running) return;

        const dt = (timestamp - this.lastTimestamp) / 1000 || 0;
        this.lastTimestamp = timestamp;

        if (this.input.consumeKeyPress('p')) {
            this.paused = !this.paused;
        }

        if (this.input.consumeKeyPress('Escape')) {
            this.stop();
            return;
        }

        if (this.input.consumeKeyPress('h')) {
            this.toggleHelp();
        }

        if (!this.paused) {
            this.currentScene.update(dt, this.input);
            this.currentScene.render();
        }

        this.frameId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    toggleHelp() {
        if (!this.helpElement) return;
        const showing = this.helpElement.style.display === 'block';
        if (showing) {
            // Closing help overlay - restore previous pause state
            this.helpElement.style.display = 'none';
            this.paused = this.pausedBeforeHelp;
        } else {
            // Opening help overlay - remember pause state and pause game
            this.pausedBeforeHelp = this.paused;
            this.paused = true;
            this.helpElement.style.display = 'block';
        }
    }
}
