import { StateBehavior, StateMachineTargets } from '../statemachine';
import { Bot } from 'mineflayer';
/**
 * This behavior will attempt to break the target block. If the target block
 * could not be mined for any reason, this behavior fails silently.
 */
export declare class BehaviorMineBlock implements StateBehavior {
    readonly bot: Bot;
    readonly targets: StateMachineTargets;
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
    /**
       * Checks if the bot has finished mining the block or not.
       */
    isFinished: boolean;
    /**
       * Creates a new mine block behavior.
       *
       * @param bot - The bot preforming the mining function.
       * @param targets - The bot targets objects.
       */
    constructor(bot: Bot, targets: StateMachineTargets);
    onStateEntered(): void;
    private getBestTool;
}
