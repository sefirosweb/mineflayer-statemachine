"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorIdle = void 0;
/**
 * The bot will stand idle and do... nothing.
 */
class BehaviorIdle {
    constructor() {
        this.stateName = 'idle';
        this.active = false;
    }
}
exports.BehaviorIdle = BehaviorIdle;
