import { Game } from './core/Game.js';
import { GameScene } from './scenes/GameScene.js';

const game = new Game({
    width: 800,
    height: 600,
    initialScene: new GameScene()
});
game.start();
