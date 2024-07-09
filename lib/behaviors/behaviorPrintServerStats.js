"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorPrintServerStats = void 0;
/**
 * A simple state which represents a bot that is waiting to
 * finish logging in.
 */
class BehaviorPrintServerStats {
    /**
       * Creates a new login behavior state.
       *
       * @param bot - The bot this behavior is acting on.
       */
    constructor(bot) {
        this.stateName = 'printServerStats';
        this.active = false;
        this.bot = bot;
    }
    onStateEntered() {
        this.logStats();
    }
    /**
       * Logs debug information about the server when first connecting to
       * the server.
       */
    logStats() {
        console.log('Joined server.');
        console.log(`Username: ${this.bot.username}`);
        console.log(`Game Mode: ${this.bot.game.gameMode}`);
        console.log(`World: ${this.bot.game.dimension}`);
        console.log(`Difficulty: ${this.bot.game.difficulty}`);
        console.log(`Version: ${this.bot.version}`);
        const playerNames = Object.keys(this.bot.players);
        console.log(`Online Players: ${playerNames.length}`);
        for (const playerName of playerNames) {
            console.log(`  - ${playerName}`);
        }
    }
}
exports.BehaviorPrintServerStats = BehaviorPrintServerStats;
