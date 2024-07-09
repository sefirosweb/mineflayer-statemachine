import { Bot } from 'mineflayer';
import { BotStateMachine } from './statemachine';
/**
 * A web server which allows users to view the current state of the
 * bot behavior state machine.
 */
export declare class StateMachineWebserver {
    private serverRunning;
    readonly bot: Bot;
    readonly stateMachine: BotStateMachine;
    readonly port: number;
    /**
       * Creates and starts a new webserver.
       * @param bot - The bot being observed.
       * @param stateMachine - The state machine being observed.
       * @param port - The port to open this server on.
       */
    constructor(bot: Bot, stateMachine: BotStateMachine, port?: number);
    /**
       * Checks whether or not this server is currently running.
       */
    isServerRunning(): boolean;
    /**
       * Configures and starts a basic static web server.
       */
    startServer(): void;
    /**
       * Called when the web server is started.
       */
    private onStarted;
    /**
       * Called when a web socket connects to this server.
       */
    private onConnected;
    private sendStatemachineStructure;
    private updateClient;
    private getStates;
    private getNestGroup;
    private getTransitions;
    private getNestGroups;
}
