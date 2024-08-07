import { StateBehavior, StateMachineTargets } from '../statemachine';
import { Bot, EquipmentDestination } from 'mineflayer';
import { Item } from 'prismarine-item';
/**
 * A collection of useful functions for inventory-based behaviors.
 *
 * Credits to: https://github.com/PrismarineJS/mineflayer/blob/master/examples/inventory.js
 * for most of the code in this class was created from.
 */
export declare abstract class AbstractBehaviorInventory implements StateBehavior {
    protected readonly bot: Bot;
    protected readonly mcData: any;
    readonly targets: StateMachineTargets;
    stateName: string;
    active: boolean;
    x?: number;
    y?: number;
    constructor(bot: Bot, targets: StateMachineTargets);
    /**
       * Gets a list of all items in the bots inventory.
       */
    listItems(): string[];
    /**
       * Throws out a specific item from this inventory. If the bot does
       * not have the item this function fails silently. If debugMode is
       * enabled, the error will be printed to the console.
       *
       * If the item stack contains fewer than the requested amount, then
       * then entire stack is thrown and no more.
       *
       * @param item - The item to throw.
       * @param amount - The number of items from this stack to throw.
       * In not defined, default to the entire stack.
       *
       * @returns The number of items actually dropped.
       */
    throwItem(item: Item, amount?: number): number;
    /**
     * Converts an item into the string format: "itemName x itemCount"
     *
     *
     * @param item - The item.
     */
    itemToString(item: Item): string;
    /**
     * Searches all items in the bots inventory for an item with the given name.
     * @param name - The name of the item.
     *
     * @returns The item, or undefined if none were found.
     */
    findItem(name: string): Item | undefined;
    /**
     * Gets the number of items in the bots inventory with the given name.
     * @param name - The item name.
     */
    itemCount(name: string): number;
    /**
       * Creates an given amount of a specific item.
       *
       * @param name - The item to craft.
       * @param craftingTable - Whether a crafting table is required for this recipe.
       * @param amount - The amount to craft. Defaults to 1.
       *
       * @returns The number of items the bot was able to craft with the given inventory.
       */
    craftItem(item: Item, amount?: number, cb?: (err?: Error) => void): number;
    /**
       * Gets the intended equipment destination for the item. If the item is an
       * armor piece, this will return the correct armor slot. Otherwise, the hand
       * is returned.
       *
       * @param item - The item to check.
       *
       * @returns The equipment destination for this item.
       */
    getEquipDestination(item: Item): EquipmentDestination;
    /**
       * Checks if the item is a helmet or not.
       *
       * @param item - The item to check.
       *
       * @returns True if the item is a helmet. False otherwise.
       */
    isHelmet(item: Item): boolean;
    /**
       * Checks if the item is a chestplate or not.
       *
       * @param item - The item to check.
       *
       * @returns True if the item is a chestplate. False otherwise.
       */
    isChestplate(item: Item): boolean;
    /**
       * Checks if the item is a pair of leggings or not.
       *
       * @param item - The item to check.
       *
       * @returns True if the item is a pair of leggings. False otherwise.
       */
    isLeggings(item: Item): boolean;
    /**
       * Checks if the item is a pair of boots or not.
       *
       * @param item - The item to check.
       *
       * @returns True if the item is a pair of boots. False otherwise.
       */
    isBoots(item: Item): boolean;
    /**
       * Checks if the item can be used in the offhand or not.
       *
       * @param item - The item to check.
       *
       * @returns True if the item can be used in the offhand. False otherwise.
       */
    isOffhandUsable(item: Item): boolean;
    /**
       * Checks if the item is a block or not.
       *
       * WARNING:
       * ========
       * This feature is not yet implemented and always returns false!
       * --------
       *
       * @param item - The item to check.
       *
       * @returns True if the item is a block. False otherwise.
       */
    isBlock(item: Item): boolean;
    /**
       * Checks if the item is food or not.
       *
       * @param item - The item to check.
       *
       * @returns True if the item is food. False otherwise.
       */
    isFood(item: Item): boolean;
}
