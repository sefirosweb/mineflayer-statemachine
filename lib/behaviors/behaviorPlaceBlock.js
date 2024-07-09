"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorPlaceBlock = void 0;
/**
 * This behavior will attempt to place the target item against the block at the target
 * position and given target block face. If the block could not be placed for any
 * reason, this behavior fails silently.
 *
 * Even if the block could not be placed, the target item is still equipped if possible.
 */
class BehaviorPlaceBlock {
    /**
       * Creates a new mine block behavior.
       *
       * @param bot - The bot preforming the mining function.
       * @param targets - The bot targets objects.
       */
    constructor(bot, targets) {
        this.stateName = 'placeBlock';
        this.active = false;
        this.bot = bot;
        this.targets = targets;
    }
    onStateEntered() {
        if (this.targets.item == null)
            return;
        this.bot.equip(this.targets.item, 'hand').catch(err => {
            console.log(err);
        });
        if (this.targets.position == null)
            return;
        if (this.targets.blockFace == null)
            return;
        const block = this.bot.blockAt(this.targets.position);
        if (block == null || !this.bot.canSeeBlock(block))
            return;
        this.bot.placeBlock(block, this.targets.blockFace).catch(err => {
            console.log(err);
        });
    }
}
exports.BehaviorPlaceBlock = BehaviorPlaceBlock;
