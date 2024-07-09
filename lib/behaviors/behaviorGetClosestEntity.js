"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorGetClosestEntity = void 0;
exports.EntityFilters = EntityFilters;
/**
 * Gets the closest entity to the bot and sets it as the entity
 * target. This behavior executes once right when the behavior
 * is entered, and should transition out immediately.
 */
class BehaviorGetClosestEntity {
    constructor(bot, targets, filter) {
        this.stateName = 'getClosestEntity';
        this.active = false;
        this.bot = bot;
        this.targets = targets;
        this.filter = filter;
    }
    onStateEntered() {
        var _a;
        this.targets.entity = (_a = this.getClosestEntity()) !== null && _a !== void 0 ? _a : undefined;
    }
    /**
       * Gets the closest entity to the bot, filtering entities as needed.
       *
       * @returns The closest entity, or null if there are none.
       */
    getClosestEntity() {
        let closest = null;
        let distance = 0;
        for (const entityName of Object.keys(this.bot.entities)) {
            const entity = this.bot.entities[entityName];
            if (entity === this.bot.entity) {
                continue;
            }
            if (!this.filter(entity)) {
                continue;
            }
            const dist = entity.position.distanceTo(this.bot.entity.position);
            if (closest === null || dist < distance) {
                closest = entity;
                distance = dist;
            }
        }
        return closest;
    }
}
exports.BehaviorGetClosestEntity = BehaviorGetClosestEntity;
/**
 * Gets a list of many default entity filters which can be applied to
 * default state behaviors.
 */
function EntityFilters() {
    return {
        AllEntities: function () {
            return true;
        },
        PlayersOnly: function (entity) {
            return entity.type === 'player';
        },
        MobsOnly: function (entity) {
            return entity.type === 'mob';
        },
        ItemDrops: function (entity) {
            if (entity.objectType === 'Item') {
                return true;
            }
            if (entity.objectType === 'Arrow') {
                // TODO Check if arrow can be picked up
                // Current NBT parsing is too limited to effectively check.
                return true;
            }
            return false;
        }
    };
}
