import { StateBehavior, StateMachineTargets } from '../statemachine';
import { Bot } from 'mineflayer';
import { Block } from 'prismarine-block';
/**
 * If a block is defined in targets.position, this behavior will attempt to locate a
 * safe position to stand in order to interact with the block. (Breaking, placing, etc.)
 *
 * If there are multiple safe standing positions around the block, the position with the
 * lowest cost is selected. Cost constraints can be configured to adjust the optimal position.
 */
export declare class BehaviorFindInteractPosition implements StateBehavior {
    /**
       * The bot this behavior is acting on.
       */
    readonly bot: Bot;
    /**
       * The targets object for this behavior.
       */
    readonly targets: StateMachineTargets;
    /**
       * The maximum distance away from the block the bot can stand.
       */
    maxDistance: number;
    /**
       * The settings for defining how position costs are calculated.
       */
    costs: StandingPositionCosts;
    /** @inheritDoc */
    stateName: string;
    /** @inheritDoc */
    active: boolean;
    /**
       * The x position of this behavior state for webservice.
       */
    x?: number;
    /**
      * The y position of this behavior state for webservice.
      */
    y?: number;
    /**
       * Creates a new find block behavior.
       *
       * @param bot - The bot preforming the search function.
       * @param targets - The bot targets objects.
       */
    constructor(bot: Bot, targets: StateMachineTargets);
    /** @inheritDoc */
    onStateEntered(): void;
    /**
       * Checks if the the block is a valid standing position, adding it to
       * the position list if available.
       *
       * @param block - The block to check.
       * @param positions - The position list to add valid standing positions to.
       */
    private checkPosition;
}
declare class StandingPositionCosts {
    private readonly bot;
    private readonly targets;
    /**
       * A list of block IDs to avoid standing in at all costs.
       */
    avoid: number[];
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
    approximateMoveMode: boolean;
    /**
       * A list of tuples for defining how much blocks should cost to stand
       * inside of.
       *
       * Each tuple is defined as [blockId, footCost, (optional )headCost]. If the
       * head cost is not defined, the head cost will be assumed to be the same
       * as the cost. The footCost is the cost for standing in the same position of
       * a block with the given ID, while the headCost is the cost for having the bots
       * head in the same block at the block ID.
       */
    blockCosts: Array<[number, number, number?]>;
    /**
       * How much cost to add for each block away from the target the position is.
       */
    distanceMultiplier: number;
    /**
       * How much cost to add for each block the bot would need to move to get here.
       */
    moveMultiplier: number;
    /**
       * How much cost to add for standing on the block.
       */
    standOnCost: number;
    /**
       * How much cost to add for standing under the block.
       */
    standUnderCost: number;
    /**
       * Creates a new StandingPositionCosts object.
  
       * @param bot - TRhe bot to use when preforming calculations.
       * @param targets - The behavior targets information.
       */
    constructor(bot: Bot, targets: StateMachineTargets);
    /**
       * Checks whether or not the given position should be avoided.
       *
       * @param block - The standing position.
       * @param over - The block over the standing position.
       *
       * @returns True if the block should be avoided. False otherwise.
       */
    shouldAvoid(block: Block, over?: Block): boolean;
    /**
       * Calculates the estimated cost of standing in the selected block.
       *
       * @param block - The block to check.
       * @param over - The block where the bots head would be.
       *
       * @returns The estimated cost value.
       */
    calculateStandCost(block: Block, over?: Block): number;
    private calculatePathCost;
    private numberEquals;
}
export {};
