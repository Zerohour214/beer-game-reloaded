export class RenderSystem {
    constructor(context, scoreRef) {
        this.ctx = context;
        this.scoreRef = scoreRef;
    }

    render(entities) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw items
        entities.filter(e => e.type === 'item').forEach(item => {
            ctx.fillStyle = 'orange';
            ctx.fillRect(item.x, item.y, item.width, item.height);
        });

        // Draw player
        const player = entities.find(e => e.type === 'player');
        if (player) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }

        // Draw score (top right)
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`Score: ${this.scoreRef.value}`, ctx.canvas.width - 20, 30);
    }
}
