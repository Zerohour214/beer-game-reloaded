export class RenderSystem {
    constructor(context, scoreRef, levelRef, ui = {}) {
        this.ctx = context;
        this.scoreRef = scoreRef;
        this.levelRef = levelRef;
        this.scoreEl = ui.score || null;
        this.levelEl = ui.level || null;
        this.imagesEl = ui.images || null;
        this.currentLevel = null;
    }

    render(entities) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw items
        entities.filter(e => e.type === 'item').forEach(item => {
            if (item.image) {
                ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
            } else {
                ctx.fillStyle = 'orange';
                ctx.fillRect(item.x, item.y, item.width, item.height);
            }
        });

        // Draw player
        const player = entities.find(e => e.type === 'player');
        if (player) {
            if (player.image) {
                ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
            } else {
                ctx.fillStyle = 'blue';
                ctx.fillRect(player.x, player.y, player.width, player.height);
            }
        }

        if (this.scoreEl) {
            this.scoreEl.textContent = `Score: ${this.scoreRef.value}`;
        }

        if (this.levelEl) {
            this.levelEl.textContent = `Level: ${this.levelRef.value}`;
        }

        if (this.imagesEl && this.currentLevel !== this.levelRef.value) {
            this.currentLevel = this.levelRef.value;
            this._loadLevelImages(this.currentLevel);
        }
    }

    _loadLevelImages(level) {
        if (!this.imagesEl) return;
        this.imagesEl.innerHTML = '';
        const img = new Image();
        img.onload = () => {
            this.imagesEl.appendChild(img);
        };
        img.onerror = () => {};
        img.src = `assets/level/img_${level}.png`;
    }
}
