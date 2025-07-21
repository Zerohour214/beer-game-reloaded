export class InputSystem {
    constructor(canvas) {
        this.mouseX = null;
        this.canvas = canvas;

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
        });
    }

    update(entities, dt, input) {
        const player = entities.find(e => e.type === 'player');
        if (!player) return;

        // Keyboard controls
        if (input.isKeyPressed('ArrowLeft')) {
            player.x -= player.speed * dt;
        }
        if (input.isKeyPressed('ArrowRight')) {
            player.x += player.speed * dt;
        }

        // Mouse controls
        if (this.mouseX !== null) {
            player.x = this.mouseX - player.width / 2;
        }

        // Clamp player within bounds
        player.x = Math.max(0, Math.min(this.canvas.width - player.width, player.x));
    }
}
