import { StateBehavior, StateMachineTargets } from '../statemachine';
import { Bot } from 'mineflayer';
import { Entity } from 'prismarine-entity';
/**
 * Gets the closest entity to the bot and sets it as the entity
 * target. This behavior executes once right when the behavior
 * is entered, and should transition out immediately.
 */
export declare class BehaviorGetClosestEntity implements StateBehavior {
    /**
       * The bot this behavior is acting on.
       */
    readonly bot: Bot;
    /**
       * The targets objects for this behavior.
       */
    readonly targets: StateMachineTargets;
    /**
       * The filter being used to find entities with.
       */
    filter: (entity: Entity) => boolean;
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
    constructor(bot: Bot, targets: StateMachineTargets, filter: (entity: Entity) => boolean);
    onStateEntered(): void;
    /**
       * Gets the closest entity to the bot, filtering entities as needed.
       *
       * @returns The closest entity, or null if there are none.
       */
    private getClosestEntity;
}
/**
 * The header for the EntityFilters() function.
 */
export interface EntityFiltersHeader {
    /**
       * Returns true for all entities.
       *
       * @param entity - The entity.
       */
    AllEntities: (entity: Entity) => boolean;
    /**
       * Returns true for all players. False for all other entities.
       *
       * @param entity - The entity.
       */
    PlayersOnly: (entity: Entity) => boolean;
    /**
       * Returns true for all mobs. False for all other entities.
       *
       * @param entity - The entity.
       */
    MobsOnly: (entity: Entity) => boolean;
    /**
       * Returns true for item drop entities and collectable arrows. False for
       * all other entities.
       *
       * @param entity - The entity.
       */
    ItemDrops: (entity: Entity) => boolean;
}
/**
 * Gets a list of many default entity filters which can be applied to
 * default state behaviors.
 */
export declare function EntityFilters(): EntityFiltersHeader;
