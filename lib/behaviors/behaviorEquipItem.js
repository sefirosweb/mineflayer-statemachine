"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorEquipItem = void 0;
const abstractBehaviorInventory_1 = require("./abstractBehaviorInventory");
const __1 = require("..");
// TODO Add support for equipped to off-hand
/**
 * Equips the target item, if the item is in the bots inventory. If the item
 * is an armor type, the bot will automatically put it on. Otherwise, the bot
 * will place them item in their hand.
 *
 * If an error occurs while attempting to equip an item, and debug mode is
 * enabled, the error will be logged to the console.
 */
class BehaviorEquipItem extends abstractBehaviorInventory_1.AbstractBehaviorInventory {
    constructor() {
        super(...arguments);
        /**
           * Whether or not to automatically equip armor. If false, armor
           * is moved to the bots hand instead.
           */
        this.autoEquipArmor = true;
        /**
           * Gets whether or not the last equip attempt was successful. This
           * will return false if the target.item is undefined, or if the bot
           * does not have the item to equip, or the item could not be equipped
           * for any reason.
           */
        this.wasEquipped = false;
    }
    onStateEntered() {
        if (this.targets.item != null) {
            let destination = 'hand';
            if (this.autoEquipArmor) {
                destination = this.getEquipDestination(this.targets.item);
            }
            this.bot.equip(this.targets.item, destination).then(() => {
                this.equipItemCallback();
            }).catch(err => {
                this.equipItemCallback(err);
            });
        }
    }
    /**
       * The callback for item equip events.
       *
       * @param err - The error that was thrown while equipping the item, if any.
       */
    equipItemCallback(err) {
        if (__1.globalSettings.debugMode && err != null) {
            console.log(err);
        }
        this.wasEquipped = err !== undefined;
    }
}
exports.BehaviorEquipItem = BehaviorEquipItem;
