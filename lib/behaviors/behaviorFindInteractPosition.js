"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorFindInteractPosition = void 0;
const minecraft_data_1 = __importDefault(require("minecraft-data"));
/* TODO Allow for creating positions in the air, or mining out new positions,
   if the bot if able to place blocks or mine in the area, respectively. */
/**
 * If a block is defined in targets.position, this behavior will attempt to locate a
 * safe position to stand in order to interact with the block. (Breaking, placing, etc.)
 *
 * If there are multiple safe standing positions around the block, the position with the
 * lowest cost is selected. Cost constraints can be configured to adjust the optimal position.
 */
class BehaviorFindInteractPosition {
    /**
       * Creates a new find block behavior.
       *
       * @param bot - The bot preforming the search function.
       * @param targets - The bot targets objects.
       */
    constructor(bot, targets) {
        /**
           * The maximum distance away from the block the bot can stand.
           */
        this.maxDistance = 3;
        /** @inheritDoc */
        this.stateName = 'findInteractPosition';
        /** @inheritDoc */
        this.active = false;
        this.bot = bot;
        this.targets = targets;
        this.costs = new StandingPositionCosts(bot, targets);
    }
    /** @inheritDoc */
    onStateEntered() {
        if (this.targets.position == null)
            return;
        this.targets.position.floor();
        const positions = [];
        for (let x = -this.maxDistance; x <= this.maxDistance; x++) {
            for (let y = -this.maxDistance; y <= this.maxDistance; y++) {
                for (let z = -this.maxDistance; z <= this.maxDistance; z++) {
                    const position = this.targets.position.offset(x, y, z);
                    const block = this.bot.blockAt(position);
                    if (block != null) {
                        this.checkPosition(block, positions);
                    }
                }
            }
        }
        if (positions.length === 0) {
            this.targets.position = undefined;
            return;
        }
        positions.sort((a, b) => a.cost - b.cost);
        this.targets.position = positions[0].position.offset(0.5, 0, 0.5);
    }
    /**
       * Checks if the the block is a valid standing position, adding it to
       * the position list if available.
       *
       * @param block - The block to check.
       * @param positions - The position list to add valid standing positions to.
       */
    checkPosition(block, positions) {
        var _a;
        // Ignore if block is not empty
        if (block.boundingBox !== 'empty')
            return;
        // Ignore if block can't be stood on.
        const under = this.bot.blockAt(block.position.offset(0, -1, 0));
        if (under == null || under.boundingBox !== 'block')
            return;
        // Ignore if there is no head room.
        const over = (_a = this.bot.blockAt(block.position.offset(0, 1, 0))) !== null && _a !== void 0 ? _a : undefined;
        if (over != null && over.boundingBox !== 'empty')
            return;
        if (this.costs.shouldAvoid(block, over))
            return;
        positions.push({
            position: block.position,
            cost: this.costs.calculateStandCost(block, over)
        });
    }
}
exports.BehaviorFindInteractPosition = BehaviorFindInteractPosition;
class StandingPositionCosts {
    /**
       * Creates a new StandingPositionCosts object.
  
       * @param bot - TRhe bot to use when preforming calculations.
       * @param targets - The behavior targets information.
       */
    constructor(bot, targets) {
        /**
           * If true, movement cost is calculated based on the distance between the bot and the
           * standing position without taking the path into consideration. This is much faster
           * than calculating the cost and works well in most cases. In some rare scenarios,
           * however, the position may be further away.
           *
           * If this is false, an entire movement path is calculated for each potential standing
           * position. This is slow, and should only be used when accurate results are a priority.
           *
           * NOTE
           * ====
           * Only approximate mode is implemented!
           */
        this.approximateMoveMode = true;
        /**
           * How much cost to add for each block away from the target the position is.
           */
        this.distanceMultiplier = 3;
        /**
           * How much cost to add for each block the bot would need to move to get here.
           */
        this.moveMultiplier = 1;
        /**
           * How much cost to add for standing on the block.
           */
        this.standOnCost = 30;
        /**
           * How much cost to add for standing under the block.
           */
        this.standUnderCost = 10;
        this.bot = bot;
        this.targets = targets;
        const mcData = (0, minecraft_data_1.default)(this.bot.version);
        this.avoid = [
            mcData.blocksByName.lava.id,
            mcData.blocksByName.fire.id
        ];
        this.blockCosts = [
            [mcData.blocksByName.water.id, 25, 100],
            [mcData.blocksByName.wheat.id, 5]
        ];
    }
    /**
       * Checks whether or not the given position should be avoided.
       *
       * @param block - The standing position.
       * @param over - The block over the standing position.
       *
       * @returns True if the block should be avoided. False otherwise.
       */
    shouldAvoid(block, over) {
        if (this.avoid.includes(block.type))
            return true;
        if (over != null && this.avoid.includes(over.type))
            return true;
        return false;
    }
    /**
       * Calculates the estimated cost of standing in the selected block.
       *
       * @param block - The block to check.
       * @param over - The block where the bots head would be.
       *
       * @returns The estimated cost value.
       */
    calculateStandCost(block, over) {
        var _a;
        if (this.targets.position == null)
            throw new Error('Target position not assigned!');
        let cost = 0;
        const targetPos = this.targets.position.floored();
        for (const c of this.blockCosts) {
            if (block.type === c[0])
                cost += c[1];
            if (over != null && over.type === c[0])
                cost += (_a = c[2]) !== null && _a !== void 0 ? _a : c[1];
        }
        cost += block.position.manhattanDistanceTo(this.targets.position) * this.distanceMultiplier;
        cost += this.calculatePathCost(block) * this.moveMultiplier;
        if (this.numberEquals(block.position.x, targetPos.x) &&
            this.numberEquals(block.position.z, targetPos.z)) {
            if (targetPos.y < block.position.y)
                cost += this.standOnCost;
            if (targetPos.y > block.position.y)
                cost += this.standUnderCost;
        }
        return cost;
    }
    calculatePathCost(block) {
        if (this.approximateMoveMode)
            return block.position.distanceTo(this.bot.entity.position);
        // TODO Test bot path and add cost
        return 0;
    }
    numberEquals(a, b) {
        return Math.abs(a - b) < 0.00001;
    }
}
