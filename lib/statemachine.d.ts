import { Bot, Player } from 'mineflayer';
import { EventEmitter } from 'events';
import { Entity } from 'prismarine-entity';
import { Vec3 } from 'vec3';
/**
 * A simple behavior state plugin for handling AI state machine
 * changes.
 */
export interface StateBehavior {
    /**
       * The name of this behavior state.
       */
    stateName: string;
    /**
       * Gets whether or not this state is currently active.
       */
    active: boolean;
    /**
       * The x position of this behavior state for webservice.
       */
    x?: number;
    /**
      * The y position of this behavior state for webservice.
      */
    y?: number;
    /**
       * Called when the bot enters this behavior state.
       */
    onStateEntered?: () => void;
    /**
       * Called each tick to update this behavior.
       */
    update?: () => void;
    /**
       * Called when the bot leaves this behavior state.
       */
    onStateExited?: () => void;
}
/**
 * The parameters for initializing a state transition.
 */
export interface StateTransitionParameters {
    parent: StateBehavior;
    child: StateBehavior;
    name?: string;
    shouldTransition?: () => boolean;
    onTransition?: () => void;
}
/**
 * A transition that links when one state (the parent) should transition
 * to another state (the child).
 */
export declare class StateTransition {
    readonly parentState: StateBehavior;
    readonly childState: StateBehavior;
    private triggerState;
    shouldTransition: () => boolean;
    onTransition: () => void;
    name?: string;
    /**
       * Creates a new one-way state transition between two states.
       *
       * @param parent - The state to move from.
       * @param child - The state to move to.
       * @param name - The name of this transition.
       * @param shouldTransition - Runs each tick to check if this transition should be called.
       * @param onTransition - Called when this transition is run.
       * @param transitionName - The unique name of this transition.
       */
    constructor({ parent, child, name, shouldTransition, onTransition }: StateTransitionParameters);
    /**
       * Triggers this transition to occur on the next Minecraft tick,
       * regardless of the "shouldTransition" function.
       *
       * @throws Exception if this transition is not yet bound to a
       * state machine.
       */
    trigger: () => void;
    /**
       * Checks if this transition if currently triggered to run. This is
       * separate from the shouldTransition function.
       *
       * @returns True if this transition was triggered to occur.
       */
    isTriggered: () => boolean;
    /**
       * Resets the triggered state to false.
       */
    resetTrigger: () => void;
}
/**
 * An AI state machine which runs on a bot to help simplify complex
 * behavior trees.
 */
export declare class BotStateMachine extends EventEmitter {
    /**
       * The bot this state machine is operating on.
       */
    readonly bot: Bot;
    /**
       * The root-level state machine in the behavior tree.
       */
    readonly rootStateMachine: NestedStateMachine;
    /**
       * An unrolled list of all transitions in this state machine across all layers.
       */
    readonly transitions: StateTransition[];
    /**
       * An unrolled list of all states in this state machine across all layers.
       */
    readonly states: StateBehavior[];
    /**
       * An unrolled list of all nested state machines in this state machine across
       * all layers.
       */
    readonly nestedStateMachines: NestedStateMachine[];
    /**
       * Creates a new, simple state machine for handling bot behavior.
       *
       * @param bot - The bot being acted on.
       * @param rootStateMachine - The root level state machine.
       */
    constructor(bot: Bot, rootStateMachine: NestedStateMachine);
    private readonly findNestedStateMachines;
    private readonly findStatesRecursive;
    private readonly findTransitionsRecursive;
    /**
       * Called each tick to update the root state machine.
       */
    private readonly update;
}
/**
 * A collection of targets which the bot is currently
 * storing in memory. These are primarily used to allow
 * states to communicate with each other more effectively.
 */
export interface StateMachineTargets {
    entity?: Entity;
    position?: Vec3;
    item?: any;
    player?: Player;
    blockFace?: Vec3;
    entities?: Entity[];
    positions?: Vec3[];
    items?: any[];
    players?: Player[];
}
/**
 * A single state machine layer within the global state machine. Can recursively
 * contain nested state machines as well.
 *
 * This can be treated as a state behavior, allowing users to transition into
 * and out of this state machine without knowing it's internal components.
 */
export declare class NestedStateMachine extends EventEmitter implements StateBehavior {
    /**
       * A list of all states within this state machine layer.
       */
    readonly states: StateBehavior[];
    /**
       * A list of all transitions within this state machine layer.
       */
    readonly transitions: StateTransition[];
    /**
       * The state to initialize from when entering this behavior.
       */
    readonly enter: StateBehavior;
    /**
       * The state to symbolize this state machine operation has finished.
       */
    readonly exit?: StateBehavior;
    /**
       * The currently active state within this state machine layer.
       */
    activeState?: StateBehavior;
    /**
       * The name of this state behavior.
       */
    stateName: string;
    /**
       * Whether or not this state machine layer is active.
       */
    active: boolean;
    /**
       * The x position of this behavior state for webservice.
       */
    x?: number;
    /**
      * The y position of this behavior state for webservice.
      */
    y?: number;
    /**
       * The depth of this layer within the entire state machine.
       */
    depth: number;
    /**
       * Called when the bot enters this nestedStateMachine.
       */
    onStateMachineEntered?: () => void;
    /**
       * Called each tick to update this nestedStateMachine.
       */
    stateMachineUpdate?: () => void;
    /**
       * Called when the bot leaves this nestedStateMachine.
       */
    onStateMachineExited?: () => void;
    /**
       * Creates a new nested state machine layer.
       * @param transitions - The list of transitions within this layer.
       * @param enter - The state to activate when entering this state.
       * @param exit - The state used to symbolize this layer has completed.
       */
    constructor(transitions: StateTransition[], enter: StateBehavior, exit?: StateBehavior);
    private readonly findStates;
    onStateEntered: () => void;
    update: () => void;
    onStateExited: () => void;
    /**
       * Checks whether or not this state machine layer has finished running.
       */
    isFinished: () => boolean;
}
