export class InputManager {
    constructor() {
        this.keys = new Set();
        this.justPressed = new Set();
        window.addEventListener('keydown', e => {
            this.keys.add(e.key);
            this.justPressed.add(e.key);
        });
        window.addEventListener('keyup', e => this.keys.delete(e.key));
    }

    isKeyPressed(key) {
        return this.keys.has(key);
    }

    consumeKeyPress(key) {
        if (this.justPressed.has(key)) {
            this.justPressed.delete(key);
            return true;
        }
        return false;
    }
}
