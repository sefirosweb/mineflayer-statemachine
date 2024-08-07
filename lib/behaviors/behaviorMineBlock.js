"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorMineBlock = void 0;
const index_1 = require("../index");
/**
 * This behavior will attempt to break the target block. If the target block
 * could not be mined for any reason, this behavior fails silently.
 */
class BehaviorMineBlock {
    /**
       * Creates a new mine block behavior.
       *
       * @param bot - The bot preforming the mining function.
       * @param targets - The bot targets objects.
       */
    constructor(bot, targets) {
        this.stateName = 'mineBlock';
        this.active = false;
        /**
           * Checks if the bot has finished mining the block or not.
           */
        this.isFinished = false;
        this.bot = bot;
        this.targets = targets;
    }
    onStateEntered() {
        var _a;
        this.isFinished = false;
        if (this.targets.position == null) {
            this.isFinished = true;
            return;
        }
        const block = this.bot.blockAt(this.targets.position);
        if (block == null || !this.bot.canDigBlock(block)) {
            if (index_1.globalSettings.debugMode) {
                console.log(`[MineBlock] Cannot mine target block '${(_a = block === null || block === void 0 ? void 0 : block.displayName) !== null && _a !== void 0 ? _a : 'undefined'}'!. Skipping.`);
            }
            this.isFinished = true;
            return;
        }
        if (index_1.globalSettings.debugMode) {
            console.log(`[MineBlock] Breaking block '${block.displayName}' at ${this.targets.position.toString()}`);
        }
        const tool = this.getBestTool(block);
        if (tool != null) {
            this.bot.equip(tool, 'hand').then(() => {
                this.bot.dig(block).then(() => {
                    this.isFinished = true;
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            this.bot.dig(block).then(() => {
                this.isFinished = true;
            }).catch(err => {
                console.log(err);
            });
        }
    }
    getBestTool(block) {
        const items = this.bot.inventory.items();
        for (const i in block.harvestTools) {
            const id = parseInt(i, 10);
            for (const item of items) {
                if (item.type === id) {
                    // Ready select
                    if (this.bot.heldItem != null && this.bot.heldItem.type === item.type) {
                        return undefined;
                    }
                    return item;
                }
            }
        }
        return undefined;
    }
}
exports.BehaviorMineBlock = BehaviorMineBlock;
