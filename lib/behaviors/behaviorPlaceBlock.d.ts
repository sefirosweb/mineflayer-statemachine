import { StateBehavior, StateMachineTargets } from '../statemachine';
import { Bot } from 'mineflayer';
/**
 * This behavior will attempt to place the target item against the block at the target
 * position and given target block face. If the block could not be placed for any
 * reason, this behavior fails silently.
 *
 * Even if the block could not be placed, the target item is still equipped if possible.
 */
export declare class BehaviorPlaceBlock implements StateBehavior {
    readonly bot: Bot;
    readonly targets: StateMachineTargets;
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
    /**
       * Creates a new mine block behavior.
       *
       * @param bot - The bot preforming the mining function.
       * @param targets - The bot targets objects.
       */
    constructor(bot: Bot, targets: StateMachineTargets);
    onStateEntered(): void;
}
