import { AbstractBehaviorInventory } from './abstractBehaviorInventory';
/**
 * Equips the target item, if the item is in the bots inventory. If the item
 * is an armor type, the bot will automatically put it on. Otherwise, the bot
 * will place them item in their hand.
 *
 * If an error occurs while attempting to equip an item, and debug mode is
 * enabled, the error will be logged to the console.
 */
export declare class BehaviorEquipItem extends AbstractBehaviorInventory {
    /**
       * Whether or not to automatically equip armor. If false, armor
       * is moved to the bots hand instead.
       */
    autoEquipArmor: boolean;
    /**
       * Gets whether or not the last equip attempt was successful. This
       * will return false if the target.item is undefined, or if the bot
       * does not have the item to equip, or the item could not be equipped
       * for any reason.
       */
    wasEquipped: boolean;
    x?: number;
    y?: number;
    onStateEntered(): void;
    /**
       * The callback for item equip events.
       *
       * @param err - The error that was thrown while equipping the item, if any.
       */
    private equipItemCallback;
}
