import { StateBehavior, StateMachineTargets } from '../statemachine';
import { Bot } from 'mineflayer';
import { Entity } from 'prismarine-entity';
import { Movements } from 'mineflayer-pathfinder';
/**
 * Causes the bot to follow the target entity.
 *
 * This behavior relies on the mineflayer-pathfinding plugin to be installed.
 */
export declare class BehaviorFollowEntity implements StateBehavior {
    readonly bot: Bot;
    readonly targets: StateMachineTargets;
    movements: Movements;
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
    /**
       * How close to the entity should the bot attempt to get?
       */
    followDistance: number;
    constructor(bot: Bot, targets: StateMachineTargets);
    onStateEntered(): void;
    onStateExited(): void;
    /**
       * Sets the target entity this bot should follow. If the bot
       * is currently following another entity, it will stop following
       * that entity and follow this entity instead.
       *
       * If the bot is not currently in this behavior state, the entity
       * will still be assigned as the target entity when this state is
       * entered.
       *
       * Calling this method will update the targets object.
       *
       * @param entity - The entity to follow.
       */
    setFollowTarget(entity: Entity): void;
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
       *
       * Useful if the target entity is updated while this behavior
       * is still active.
       */
    restart(): void;
    /**
       * Gets the distance to the target entity.
       *
       * @returns The distance, or 0 if no target entity is assigned.
       */
    distanceToTarget(): number;
}
