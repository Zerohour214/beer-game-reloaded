export class Scene {
    constructor() {
        this.entities = [];
        this.systems = [];
        this.game = null;
    }

    async init(game) {
        this.game = game;
        // Override in subclass to set up entities/systems
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    addSystem(system) {
        this.systems.push(system);
    }

    update(dt, input) {
        this.systems.forEach(system => {
            if (typeof system.update === 'function') {
                system.update(this.entities, dt, input);
            }
        });
    }

    render() {
        this.systems.forEach(system => {
            if (typeof system.render === 'function') {
                system.render(this.entities);
            }
        });
    }
}
