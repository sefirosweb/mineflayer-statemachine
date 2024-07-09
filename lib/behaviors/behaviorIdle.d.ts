import { StateBehavior } from '../statemachine';
/**
 * The bot will stand idle and do... nothing.
 */
export declare class BehaviorIdle implements StateBehavior {
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
}
