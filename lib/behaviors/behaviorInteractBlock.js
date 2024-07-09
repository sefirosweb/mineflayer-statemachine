"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorInteractBlock = void 0;
/**
 * This behavior will attempt to interact with the target block. If the target
 * block could not be interacted with for any reason, this behavior fails silently.
 */
class BehaviorInteractBlock {
    /**
       * Creates a new mine block behavior.
       *
       * @param bot - The bot preforming the mining function.
       * @param targets - The bot targets objects.
       */
    constructor(bot, targets) {
        this.stateName = 'interactBlock';
        this.active = false;
        this.bot = bot;
        this.targets = targets;
    }
    onStateEntered() {
        if (this.targets.position == null)
            return;
        const block = this.bot.blockAt(this.targets.position);
        if (block == null || !this.bot.canSeeBlock(block))
            return;
        this.bot.activateBlock(block).catch(err => {
            console.log(err);
        });
    }
}
exports.BehaviorInteractBlock = BehaviorInteractBlock;
