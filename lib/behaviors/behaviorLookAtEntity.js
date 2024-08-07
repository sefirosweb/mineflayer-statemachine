"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorLookAtEntity = void 0;
/**
 * The bot will look at the target entity.
 */
class BehaviorLookAtEntity {
    constructor(bot, targets) {
        this.stateName = 'lookAtEntity';
        this.active = false;
        this.bot = bot;
        this.targets = targets;
    }
    update() {
        const entity = this.targets.entity;
        if (entity != null) {
            this.bot.lookAt(entity.position.offset(0, entity.height, 0)).catch(err => {
                console.log(err);
            });
        }
    }
    /**
       * Gets the distance to the target entity.
       *
       * @returns The distance, or 0 if no target entity is assigned.
       */
    distanceToTarget() {
        const entity = this.targets.entity;
        if (entity == null)
            return 0;
        return this.bot.entity.position.distanceTo(entity.position);
    }
}
exports.BehaviorLookAtEntity = BehaviorLookAtEntity;
