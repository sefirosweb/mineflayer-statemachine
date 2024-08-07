"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorFindBlock = void 0;
// TODO Add option to find blocks based on the distance the bot would have to move to reach it.
/**
 * This behavior will search a configurable area around the bot in order to
 * locate a block matching the given configuration. The block will be assigned
 * to targets.position.
 *
 * If no block could be found, targets.position is set to undefined.
 */
class BehaviorFindBlock {
    /**
       * Creates a new find block behavior.
       *
       * @param bot - The bot preforming the search function.
       * @param targets - The bot targets objects.
       */
    constructor(bot, targets) {
        this.stateName = 'findBlock';
        this.active = false;
        /**
           * The list of block ids to search for.
           */
        this.blocks = [];
        /**
           * The maximum distance away to look for the block.
           */
        this.maxDistance = 32;
        /**
           * If true, the bot will ignore blocks that could not be seen by it. Useful for encouraging
           * realistic behavior.
           */
        this.preventXRay = false;
        this.bot = bot;
        this.targets = targets;
    }
    onStateEntered() {
        var _a;
        this.targets.position = (_a = this.bot.findBlock({
            matching: (block) => this.matchesBlock(block),
            maxDistance: this.maxDistance
        })) === null || _a === void 0 ? void 0 : _a.position;
    }
    matchesBlock(block) {
        if (!this.blocks.includes(block.type)) {
            return false;
        }
        if (this.preventXRay) {
            if (!this.bot.canSeeBlock(block)) {
                return false;
            }
        }
        return true;
    }
}
exports.BehaviorFindBlock = BehaviorFindBlock;
