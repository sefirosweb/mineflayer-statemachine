import { Bot } from 'mineflayer';
import { StateBehavior } from '../statemachine';
/**
 * A simple state which represents a bot that is waiting to
 * finish logging in.
 */
export declare class BehaviorPrintServerStats implements StateBehavior {
    private readonly bot;
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
    /**
       * Creates a new login behavior state.
       *
       * @param bot - The bot this behavior is acting on.
       */
    constructor(bot: Bot);
    onStateEntered(): void;
    /**
       * Logs debug information about the server when first connecting to
       * the server.
       */
    private logStats;
}
