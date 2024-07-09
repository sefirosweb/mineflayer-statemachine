import { StateBehavior, StateMachineTargets } from '../statemachine';
import { Bot } from 'mineflayer';
/**
 * This behavior will search a configurable area around the bot in order to
 * locate a block matching the given configuration. The block will be assigned
 * to targets.position.
 *
 * If no block could be found, targets.position is set to undefined.
 */
export declare class BehaviorFindBlock implements StateBehavior {
    readonly bot: Bot;
    readonly targets: StateMachineTargets;
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
    /**
       * The list of block ids to search for.
       */
    blocks: number[];
    /**
       * The maximum distance away to look for the block.
       */
    maxDistance: number;
    /**
       * If true, the bot will ignore blocks that could not be seen by it. Useful for encouraging
       * realistic behavior.
       */
    preventXRay: boolean;
    /**
       * Creates a new find block behavior.
       *
       * @param bot - The bot preforming the search function.
       * @param targets - The bot targets objects.
       */
    constructor(bot: Bot, targets: StateMachineTargets);
    onStateEntered(): void;
    private matchesBlock;
}
