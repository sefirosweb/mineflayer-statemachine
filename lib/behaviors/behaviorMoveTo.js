"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorMoveTo = void 0;
const index_1 = require("../index");
const mineflayer_pathfinder_1 = require("mineflayer-pathfinder");
/**
 * Causes the bot to move to the target position.
 *
 * This behavior relies on the mineflayer-pathfinding plugin to be installed.
 */
class BehaviorMoveTo {
    constructor(bot, targets) {
        this.stateName = 'moveTo';
        this.active = false;
        /**
           * How close the bot should attempt to get to this location before
           * considering the goal reached. A value of 0 will mean the bot must
           * be inside the target position.
           */
        this.distance = 0;
        this.bot = bot;
        this.targets = targets;
        this.movements = new mineflayer_pathfinder_1.Movements(bot);
    }
    onStateEntered() {
        // @ts-expect-error
        this.bot.on('path_update', this.path_update);
        this.bot.on('goal_reached', this.goal_reached);
        this.startMoving();
    }
    onStateExited() {
        // @ts-expect-error
        this.bot.removeListener('path_update', this.path_update);
        this.bot.removeListener('goal_reached', this.goal_reached);
        this.stopMoving();
    }
    path_update(r) {
        if (r.status === 'noPath') {
            console.log('[MoveTo] No path to target!');
        }
    }
    goal_reached() {
        if (index_1.globalSettings.debugMode) {
            console.log('[MoveTo] Target reached.');
        }
    }
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
    setMoveTarget(position) {
        if (this.targets.position === position) {
            return;
        }
        this.targets.position = position;
        this.restart();
    }
    /**
       * Cancels the current path finding operation.
       */
    stopMoving() {
        const pathfinder = this.bot.pathfinder;
        pathfinder.setGoal(null);
    }
    /**
       * Starts a new path finding operation.
       */
    startMoving() {
        const position = this.targets.position;
        if (position == null) {
            if (index_1.globalSettings.debugMode) {
                console.log('[MoveTo] Target not defined. Skipping.');
            }
            return;
        }
        if (index_1.globalSettings.debugMode) {
            console.log(`[MoveTo] Moving from ${this.bot.entity.position.toString()} to ${position.toString()}`);
        }
        const pathfinder = this.bot.pathfinder;
        let goal;
        if (this.distance === 0) {
            goal = new mineflayer_pathfinder_1.goals.GoalBlock(position.x, position.y, position.z);
        }
        else {
            goal = new mineflayer_pathfinder_1.goals.GoalNear(position.x, position.y, position.z, this.distance);
        }
        pathfinder.setMovements(this.movements);
        pathfinder.setGoal(goal);
    }
    /**
       * Stops and restarts this movement behavior. Does nothing if
       * this behavior is not active.
       */
    restart() {
        if (!this.active) {
            return;
        }
        this.stopMoving();
        this.startMoving();
    }
    /**
       * Checks if the bot has finished moving or not.
       */
    isFinished() {
        const pathfinder = this.bot.pathfinder;
        return !pathfinder.isMoving();
    }
    /**
       * Gets the distance to the target position.
       *
       * @returns The distance, or 0 if no target position is assigned.
       */
    distanceToTarget() {
        const position = this.targets.position;
        if (position == null)
            return 0;
        return this.bot.entity.position.distanceTo(position);
    }
}
exports.BehaviorMoveTo = BehaviorMoveTo;
