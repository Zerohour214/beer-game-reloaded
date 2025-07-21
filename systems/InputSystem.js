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
        const left = input.isKeyPressed('ArrowLeft');
        const right = input.isKeyPressed('ArrowRight');

        if (left) {
            player.x -= player.speed * dt;
        }
        if (right) {
            player.x += player.speed * dt;
        }

        // Mouse controls (only when no arrow keys pressed)
        if (!left && !right && this.mouseX !== null) {
            player.x = this.mouseX - player.width / 2;
        }

        // Clamp player within bounds
        player.x = Math.max(0, Math.min(this.canvas.width - player.width, player.x));
    }
}
