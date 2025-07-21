export class LevelSystem {
    constructor(scoreRef, levelRef, threshold = 100) {
        this.scoreRef = scoreRef;
        this.levelRef = levelRef;
        this.threshold = threshold;
    }

    update() {
        const newLevel = Math.floor(this.scoreRef.value / this.threshold) + 1;
        if (newLevel !== this.levelRef.value) {
            this.levelRef.value = newLevel;
        }
    }
}