import { StateBehavior, StateMachineTargets } from '../statemachine';
import { Bot } from 'mineflayer';
import { Movements, ComputedPath } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
/**
 * Causes the bot to move to the target position.
 *
 * This behavior relies on the mineflayer-pathfinding plugin to be installed.
 */
export declare class BehaviorMoveTo implements StateBehavior {
    private readonly bot;
    readonly targets: StateMachineTargets;
    movements: Movements;
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
    /**
       * How close the bot should attempt to get to this location before
       * considering the goal reached. A value of 0 will mean the bot must
       * be inside the target position.
       */
    distance: number;
    constructor(bot: Bot, targets: StateMachineTargets);
    onStateEntered(): void;
    onStateExited(): void;
    path_update(r: ComputedPath): void;
    goal_reached(): void;
    /**
       * Sets the target block position to move to. If the bot
       * is currently moving, it will stop and move to here instead.
       *
       * If the bot is not currently in this behavior state, the entity
       * will still be assigned as the target position when this state
       * is entered.
       *
       * This method updates the target position.
       *
       * @param position - The position to move to.
       */
    setMoveTarget(position: Vec3): void;
    /**
       * Cancels the current path finding operation.
       */
    private stopMoving;
    /**
       * Starts a new path finding operation.
       */
    private startMoving;
    /**
       * Stops and restarts this movement behavior. Does nothing if
       * this behavior is not active.
       */
    restart(): void;
    /**
       * Checks if the bot has finished moving or not.
       */
    isFinished(): boolean;
    /**
       * Gets the distance to the target position.
       *
       * @returns The distance, or 0 if no target position is assigned.
       */
    distanceToTarget(): number;
}
