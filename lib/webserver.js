"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachineWebserver = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const _1 = require(".");
const publicFolder = './../web';
// TODO Add option to shutdown server
/**
 * A web server which allows users to view the current state of the
 * bot behavior state machine.
 */
class StateMachineWebserver {
    /**
       * Creates and starts a new webserver.
       * @param bot - The bot being observed.
       * @param stateMachine - The state machine being observed.
       * @param port - The port to open this server on.
       */
    constructor(bot, stateMachine, port = 8934) {
        this.serverRunning = false;
        this.bot = bot;
        this.stateMachine = stateMachine;
        this.port = port;
    }
    /**
       * Checks whether or not this server is currently running.
       */
    isServerRunning() {
        return this.serverRunning;
    }
    /**
       * Configures and starts a basic static web server.
       */
    startServer() {
        if (this.serverRunning) {
            throw new Error('Server already running!');
        }
        this.serverRunning = true;
        const app = (0, express_1.default)();
        app.use('/web', express_1.default.static(path_1.default.join(__dirname, publicFolder)));
        app.get('/', (req, res) => res.sendFile(path_1.default.join(__dirname, publicFolder, 'index.html')));
        const http = http_1.default.createServer(app);
        // @ts-expect-error ; Why? Not sure. Probably a type-def loading issue. Either way, it's safe.
        const io = (0, socket_io_1.default)(http);
        io.on('connection', (socket) => this.onConnected(socket));
        http.listen(this.port, () => this.onStarted());
    }
    /**
       * Called when the web server is started.
       */
    onStarted() {
        if (_1.globalSettings.debugMode) {
            console.log(`Started state machine web server at http://localhost:${this.port}.`);
        }
    }
    /**
       * Called when a web socket connects to this server.
       */
    onConnected(socket) {
        if (_1.globalSettings.debugMode) {
            console.log(`Client ${socket.handshake.address} connected to webserver.`);
        }
        this.sendStatemachineStructure(socket);
        this.updateClient(socket);
        const updateClient = () => this.updateClient(socket);
        this.stateMachine.on('stateChanged', updateClient);
        socket.on('disconnect', () => {
            this.stateMachine.removeListener('stateChanged', updateClient);
            if (_1.globalSettings.debugMode) {
                console.log(`Client ${socket.handshake.address} disconnected from webserver.`);
            }
        });
    }
    sendStatemachineStructure(socket) {
        const states = this.getStates();
        const transitions = this.getTransitions();
        const nestGroups = this.getNestGroups();
        const packet = {
            states,
            transitions,
            nestGroups
        };
        socket.emit('connected', packet);
    }
    updateClient(socket) {
        const states = this.stateMachine.states;
        const activeStates = [];
        for (const layer of this.stateMachine.nestedStateMachines) {
            if (layer.activeState == null)
                continue;
            const index = states.indexOf(layer.activeState);
            if (index > -1) {
                activeStates.push(index);
            }
        }
        const packet = {
            activeStates
        };
        socket.emit('stateChanged', packet);
    }
    getStates() {
        const states = [];
        for (let i = 0; i < this.stateMachine.states.length; i++) {
            const state = this.stateMachine.states[i];
            states.push({
                id: i,
                name: state.stateName,
                x: state.x,
                y: state.y,
                nestGroup: this.getNestGroup(state)
            });
        }
        return states;
    }
    getNestGroup(state) {
        for (let i = 0; i < this.stateMachine.nestedStateMachines.length; i++) {
            const n = this.stateMachine.nestedStateMachines[i];
            if (n.states == null)
                continue;
            if (n.states.includes(state))
                return i;
        }
        throw new Error('Unexpected state!');
    }
    getTransitions() {
        const transitions = [];
        for (let i = 0; i < this.stateMachine.transitions.length; i++) {
            const transition = this.stateMachine.transitions[i];
            transitions.push({
                id: i,
                name: transition.name,
                parentState: this.stateMachine.states.indexOf(transition.parentState),
                childState: this.stateMachine.states.indexOf(transition.childState)
            });
        }
        return transitions;
    }
    getNestGroups() {
        var _a;
        const nestGroups = [];
        for (let i = 0; i < this.stateMachine.nestedStateMachines.length; i++) {
            const nest = this.stateMachine.nestedStateMachines[i];
            nestGroups.push({
                id: i,
                enter: this.stateMachine.states.indexOf(nest.enter),
                exit: nest.exit != null ? this.stateMachine.states.indexOf(nest.exit) : undefined,
                indent: (_a = nest.depth) !== null && _a !== void 0 ? _a : -1,
                name: nest.stateName
            });
        }
        return nestGroups;
    }
}
exports.StateMachineWebserver = StateMachineWebserver;
