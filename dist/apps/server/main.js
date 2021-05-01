(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/server/src/app/game/GameServer.ts":
/*!************************************************!*\
  !*** ./apps/server/src/app/game/GameServer.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
const game_logic_1 = __webpack_require__(/*! @orbitweb/game-logic */ "./libs/game-logic/src/index.ts");
const gameloop = __webpack_require__(/*! node-gameloop */ "node-gameloop");
class GameServer extends game_logic_1.GameLogic {
    constructor(io) {
        super();
        this.io = io;
        this.activeConnectionCount = 0;
        this.tickRate = 1000 / 60;
        this.boundries.x1 = { x: -1200, y: -300 };
        this.boundries.x2 = { x: 600, y: 600 };
    }
    stop() {
        console.log("Server stoped:", this.gameLoopId);
        gameloop.clearGameLoop(this.gameLoopId);
        this.gameLoopId = undefined;
    }
    start() {
        if (this.gameLoopId === undefined) {
            this.gameLoopId = gameloop.setGameLoop((delta) => {
                this.serverLoop(delta);
            }, this.tickRate);
            console.log("Server started: ", this.gameLoopId);
        }
        if (this.players.length === 0) {
            this.spawnDefaultEnemy();
            console.log("Enemy spawned");
        }
    }
    checkOnlineState() {
        return this.hasActivePlayer() || this.activeConnectionCount > 0;
    }
    hasActivePlayer() {
        return this.players.filter((player) => !player.isNPC).length > 0;
    }
    serverLoop(delta) {
        if (this.checkOnlineState() === false) {
            this.stop();
        }
        this.gameLoop(delta);
        this.gc();
    }
    onMessage(msg, broadCast, singleCast) {
        super.onMessage(msg, broadCast, singleCast);
    }
    send(msg) {
        this.io.emit("message", msg);
    }
}
exports.GameServer = GameServer;


/***/ }),

/***/ "./apps/server/src/app/server.ts":
/*!***************************************!*\
  !*** ./apps/server/src/app/server.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServer = void 0;
const http_1 = __webpack_require__(/*! http */ "http");
const express = __webpack_require__(/*! express */ "express");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const GameServer_1 = __webpack_require__(/*! ./game/GameServer */ "./apps/server/src/app/game/GameServer.ts");
class ChatServer {
    constructor() {
        this.httpServer = http_1.createServer();
        this.config();
        this.sockets();
        this.listen();
        this.httpServer.listen(this.port);
        console.log('Running server on port %s', this.port);
    }
    createApp() {
        this.app = express();
    }
    config() {
        this.port = process.env.PORT || ChatServer.PORT;
    }
    sockets() {
        this.io = new socket_io_1.Server(this.httpServer, { cors: {
                origin: "http://localhost:4200",
                methods: ["GET", "POST"]
            } });
        this.gameServer = new GameServer_1.GameServer(this.io);
    }
    listen() {
        this.io.on('connection', (socket) => {
            console.log('Connected client on port %s.', this.port);
            this.gameServer.activeConnectionCount++;
            this.gameServer.start();
            socket.on('message', (m) => {
                this.gameServer.onMessage(m, this.io, socket);
            });
            socket.on('disconnect', () => {
                this.gameServer.activeConnectionCount--;
            });
        });
    }
    getApp() {
        return this.app;
    }
}
exports.ChatServer = ChatServer;
ChatServer.PORT = 8000;


/***/ }),

/***/ "./apps/server/src/main.ts":
/*!*********************************!*\
  !*** ./apps/server/src/main.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const server_1 = __webpack_require__(/*! ./app/server */ "./apps/server/src/app/server.ts");
let app = new server_1.ChatServer().getApp();
exports.app = app;


/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
// models
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/Cannon */ "./libs/common/src/lib/model/Cannon.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/Inventory */ "./libs/common/src/lib/model/Inventory.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/Particle */ "./libs/common/src/lib/model/Particle.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/Projectile */ "./libs/common/src/lib/model/Projectile.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/ScoreboardEntry */ "./libs/common/src/lib/model/ScoreboardEntry.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/ShipEquipment */ "./libs/common/src/lib/model/ShipEquipment.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/ShipFitting */ "./libs/common/src/lib/model/ShipFitting.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/Skill */ "./libs/common/src/lib/model/Skill.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/Spaceship */ "./libs/common/src/lib/model/Spaceship.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/Structure */ "./libs/common/src/lib/model/Structure.ts"), exports);
//export * from './lib/model/TargetSkill';
tslib_1.__exportStar(__webpack_require__(/*! ./lib/model/TimedAbility */ "./libs/common/src/lib/model/TimedAbility.ts"), exports);
// util
tslib_1.__exportStar(__webpack_require__(/*! ./lib/util/Factories */ "./libs/common/src/lib/util/Factories.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/util/VectorInterface */ "./libs/common/src/lib/util/VectorInterface.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/util/CMath */ "./libs/common/src/lib/util/CMath.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/util/Util */ "./libs/common/src/lib/util/Util.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/physics/Physics */ "./libs/common/src/lib/physics/Physics.ts"), exports);
// messages
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/BoundryUpdateMessage */ "./libs/common/src/lib/message/game/BoundryUpdateMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/ScoreboardUpdateMessage */ "./libs/common/src/lib/message/game/ScoreboardUpdateMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/SpawnEnemyMessage */ "./libs/common/src/lib/message/game/SpawnEnemyMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/equipment/ProjectileUpdateMessage */ "./libs/common/src/lib/message/game/equipment/ProjectileUpdateMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/equipment/ShipEquipmentMessage */ "./libs/common/src/lib/message/game/equipment/ShipEquipmentMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/equipment/ShipEquipmentStartMessage */ "./libs/common/src/lib/message/game/equipment/ShipEquipmentStartMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/equipment/ShipEquipmentStopMessage */ "./libs/common/src/lib/message/game/equipment/ShipEquipmentStopMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/movement/PlayerMoveToMessage */ "./libs/common/src/lib/message/game/player/movement/PlayerMoveToMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/movement/PlayerOrbitMessage */ "./libs/common/src/lib/message/game/player/movement/PlayerOrbitMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/movement/PlayerStructureMessage */ "./libs/common/src/lib/message/game/player/movement/PlayerStructureMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/PlayerActionMessage */ "./libs/common/src/lib/message/game/player/PlayerActionMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/PlayerJoinedMessage */ "./libs/common/src/lib/message/game/player/PlayerJoinedMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/PlayerKilledMessage */ "./libs/common/src/lib/message/game/player/PlayerKilledMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/PlayerSelfKillMessage */ "./libs/common/src/lib/message/game/player/PlayerSelfKillMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/PlayerSkillUsedMessage */ "./libs/common/src/lib/message/game/player/PlayerSkillUsedMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/player/PlayerUpdateMessage */ "./libs/common/src/lib/message/game/player/PlayerUpdateMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/projectile/ProjectileDestroyMessage */ "./libs/common/src/lib/message/game/projectile/ProjectileDestroyMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/projectile/ProjectileMessage */ "./libs/common/src/lib/message/game/projectile/ProjectileMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/projectile/ProjectileSpawnMessage */ "./libs/common/src/lib/message/game/projectile/ProjectileSpawnMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/projectile/ProjectileUpdateMessage */ "./libs/common/src/lib/message/game/projectile/ProjectileUpdateMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/structures/StructureDestroyMessage */ "./libs/common/src/lib/message/game/structures/StructureDestroyMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/structures/StructureMessage */ "./libs/common/src/lib/message/game/structures/StructureMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/game/structures/StructureSpawnMessage */ "./libs/common/src/lib/message/game/structures/StructureSpawnMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/generic/PlayerTargetMessage */ "./libs/common/src/lib/message/generic/PlayerTargetMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/login/LobbyQueryMessage */ "./libs/common/src/lib/message/login/LobbyQueryMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/login/PlayerLoginMessage */ "./libs/common/src/lib/message/login/PlayerLoginMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/DebugMessage */ "./libs/common/src/lib/message/DebugMessage.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/Message */ "./libs/common/src/lib/message/Message.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/message/MessageFactory */ "./libs/common/src/lib/message/MessageFactory.ts"), exports);


/***/ }),

/***/ "./libs/common/src/lib/message/DebugMessage.ts":
/*!*****************************************************!*\
  !*** ./libs/common/src/lib/message/DebugMessage.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMessage = void 0;
const Message_1 = __webpack_require__(/*! ./Message */ "./libs/common/src/lib/message/Message.ts");
class DebugMessage extends Message_1.Message {
    constructor() {
        super();
        this.type = "debugMessage";
    }
}
exports.DebugMessage = DebugMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/Message.ts":
/*!************************************************!*\
  !*** ./libs/common/src/lib/message/Message.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
}
exports.Message = Message;


/***/ }),

/***/ "./libs/common/src/lib/message/MessageFactory.ts":
/*!*******************************************************!*\
  !*** ./libs/common/src/lib/message/MessageFactory.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFactory = void 0;
class MessageFactory {
    static create(message) {
        return null;
    }
}
exports.MessageFactory = MessageFactory;


/***/ }),

/***/ "./libs/common/src/lib/message/game/BoundryUpdateMessage.ts":
/*!******************************************************************!*\
  !*** ./libs/common/src/lib/message/game/BoundryUpdateMessage.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundryUpdateMessage = void 0;
const Message_1 = __webpack_require__(/*! ../Message */ "./libs/common/src/lib/message/Message.ts");
class BoundryUpdateMessage extends Message_1.Message {
    constructor(boundry) {
        super();
        this.boundry = boundry;
        this.type = "boundryUpdateMessage";
    }
}
exports.BoundryUpdateMessage = BoundryUpdateMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/ScoreboardUpdateMessage.ts":
/*!*********************************************************************!*\
  !*** ./libs/common/src/lib/message/game/ScoreboardUpdateMessage.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreboardUpdateMessage = void 0;
const Message_1 = __webpack_require__(/*! ../Message */ "./libs/common/src/lib/message/Message.ts");
class ScoreboardUpdateMessage extends Message_1.Message {
    constructor(entries) {
        super();
        this.entries = entries;
        this.type = "scoreboardUpdateMessage";
    }
}
exports.ScoreboardUpdateMessage = ScoreboardUpdateMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/SpawnEnemyMessage.ts":
/*!***************************************************************!*\
  !*** ./libs/common/src/lib/message/game/SpawnEnemyMessage.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EnemySpawnMessage = void 0;
const Message_1 = __webpack_require__(/*! ../Message */ "./libs/common/src/lib/message/Message.ts");
class EnemySpawnMessage extends Message_1.Message {
    constructor(name) {
        super();
        this.name = name;
        //this.fitting.fitting = spaceship.fitting.fitting;
        this.type = "enemyJoinedMessage";
    }
}
exports.EnemySpawnMessage = EnemySpawnMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/equipment/ProjectileUpdateMessage.ts":
/*!*******************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/equipment/ProjectileUpdateMessage.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEquipmentUpdateMessage = void 0;
const ShipEquipmentMessage_1 = __webpack_require__(/*! ./ShipEquipmentMessage */ "./libs/common/src/lib/message/game/equipment/ShipEquipmentMessage.ts");
class ShipEquipmentUpdateMessage extends ShipEquipmentMessage_1.ShipEquipmentMessage {
}
exports.ShipEquipmentUpdateMessage = ShipEquipmentUpdateMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/equipment/ShipEquipmentMessage.ts":
/*!****************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/equipment/ShipEquipmentMessage.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEquipmentMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class ShipEquipmentMessage extends PlayerMessage_1.PlayerMessage {
    constructor(id, index, active) {
        super(id);
        this.id = id;
        this.index = index;
        this.active = active;
        this.type = "shipEquipmentMessage";
    }
}
exports.ShipEquipmentMessage = ShipEquipmentMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/equipment/ShipEquipmentStartMessage.ts":
/*!*********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/equipment/ShipEquipmentStartMessage.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEquipmentStartMessage = void 0;
const ShipEquipmentMessage_1 = __webpack_require__(/*! ./ShipEquipmentMessage */ "./libs/common/src/lib/message/game/equipment/ShipEquipmentMessage.ts");
class ShipEquipmentStartMessage extends ShipEquipmentMessage_1.ShipEquipmentMessage {
}
exports.ShipEquipmentStartMessage = ShipEquipmentStartMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/equipment/ShipEquipmentStopMessage.ts":
/*!********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/equipment/ShipEquipmentStopMessage.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEquipmentStopMessage = void 0;
const ShipEquipmentMessage_1 = __webpack_require__(/*! ./ShipEquipmentMessage */ "./libs/common/src/lib/message/game/equipment/ShipEquipmentMessage.ts");
class ShipEquipmentStopMessage extends ShipEquipmentMessage_1.ShipEquipmentMessage {
}
exports.ShipEquipmentStopMessage = ShipEquipmentStopMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/PlayerActionMessage.ts":
/*!************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerActionMessage.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerActionMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class PlayerActionMessage extends PlayerMessage_1.PlayerMessage {
    constructor(player, skillIndex) {
        super(player);
        this.skillIndex = skillIndex;
        this.type = "playerActionMessage";
    }
}
exports.PlayerActionMessage = PlayerActionMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/PlayerJoinedMessage.ts":
/*!************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerJoinedMessage.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerJoinedMessage = void 0;
const PlayerUpdateMessage_1 = __webpack_require__(/*! ./PlayerUpdateMessage */ "./libs/common/src/lib/message/game/player/PlayerUpdateMessage.ts");
class PlayerJoinedMessage extends PlayerUpdateMessage_1.PlayerUpdateMessage {
    constructor(spaceship) {
        super(spaceship);
        this.fitting.fitting = spaceship.fitting.fitting;
        this.type = "playerJoinedMessage";
    }
}
exports.PlayerJoinedMessage = PlayerJoinedMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/PlayerKilledMessage.ts":
/*!************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerKilledMessage.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerKilledMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class PlayerKilledMessage extends PlayerMessage_1.PlayerMessage {
    constructor(spaceship, killer) {
        super(spaceship.id);
        this.killer = killer;
        this.type = "playerKilledMessage";
    }
}
exports.PlayerKilledMessage = PlayerKilledMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/PlayerSelfKillMessage.ts":
/*!**************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerSelfKillMessage.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSelfKillMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class PlayerSelfKillMessage extends PlayerMessage_1.PlayerMessage {
    constructor(name) {
        super(name);
        this.type = "playerSelfKillMessage";
    }
}
exports.PlayerSelfKillMessage = PlayerSelfKillMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/PlayerSkillUsedMessage.ts":
/*!***************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerSkillUsedMessage.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTargetSkillUsedMessage = void 0;
const PlayerTargetMessage_1 = __webpack_require__(/*! ../../generic/PlayerTargetMessage */ "./libs/common/src/lib/message/generic/PlayerTargetMessage.ts");
class PlayerTargetSkillUsedMessage extends PlayerTargetMessage_1.PlayerTargetMessage {
    constructor(player, target, skillId) {
        super(player, target);
        this.skillId = skillId;
        this.type = "playerTargetSkillUsedMessage";
    }
}
exports.PlayerTargetSkillUsedMessage = PlayerTargetSkillUsedMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/PlayerUpdateMessage.ts":
/*!************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerUpdateMessage.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerUpdateMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
const ShipFitting_1 = __webpack_require__(/*! ../../../model/ShipFitting */ "./libs/common/src/lib/model/ShipFitting.ts");
class PlayerUpdateMessage extends PlayerMessage_1.PlayerMessage {
    constructor(spaceship) {
        super(spaceship.id);
        this.activationProgress = 0;
        this.color = spaceship.color;
        this.x = spaceship.position.x;
        this.y = spaceship.position.y;
        this.speedX = spaceship.speed.x;
        this.speedY = spaceship.speed.y;
        this.rotation = spaceship.rotation;
        this.fitting = new ShipFitting_1.ShipFitting();
        this.fitting.fitting = spaceship.fitting.fitting.map((fit) => {
            return {
                name: fit.name,
                state: fit.state,
                remainingTime: fit.remainingTime
            };
        });
        this.health = spaceship.health;
        this.power = spaceship.power;
        this.target = spaceship.targetPlayer !== undefined ? spaceship.targetPlayer.id : undefined;
        this.activationProgress = spaceship.activationProgress;
        this.type = "playerUpdateMessage";
    }
}
exports.PlayerUpdateMessage = PlayerUpdateMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/movement/PlayerMoveToMessage.ts":
/*!*********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/movement/PlayerMoveToMessage.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerMoveToMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../../../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class PlayerMoveToMessage extends PlayerMessage_1.PlayerMessage {
    constructor(player, position) {
        super(player);
        this.position = position;
        this.type = "playerMoveToMessage";
    }
}
exports.PlayerMoveToMessage = PlayerMoveToMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/movement/PlayerOrbitMessage.ts":
/*!********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/movement/PlayerOrbitMessage.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerOrbitMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../../../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class PlayerOrbitMessage extends PlayerMessage_1.PlayerMessage {
    constructor(player, target) {
        super(player);
        this.target = target;
        this.type = "playerOrbitMessage";
    }
}
exports.PlayerOrbitMessage = PlayerOrbitMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/player/movement/PlayerStructureMessage.ts":
/*!************************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/movement/PlayerStructureMessage.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStructureMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../../../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class PlayerStructureMessage extends PlayerMessage_1.PlayerMessage {
    constructor(player, structureId) {
        super(player);
        this.structureId = structureId;
        this.type = "playerStructureMessage";
    }
}
exports.PlayerStructureMessage = PlayerStructureMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/projectile/ProjectileDestroyMessage.ts":
/*!*********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/projectile/ProjectileDestroyMessage.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectileDestroyMessage = void 0;
const ProjectileMessage_1 = __webpack_require__(/*! ./ProjectileMessage */ "./libs/common/src/lib/message/game/projectile/ProjectileMessage.ts");
class ProjectileDestroyMessage extends ProjectileMessage_1.ProjectileMessage {
    constructor(projectile) {
        super(projectile.id);
        this.type = "projectileDestroyMessage";
    }
}
exports.ProjectileDestroyMessage = ProjectileDestroyMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/projectile/ProjectileMessage.ts":
/*!**************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/projectile/ProjectileMessage.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectileMessage = void 0;
const Message_1 = __webpack_require__(/*! ../../Message */ "./libs/common/src/lib/message/Message.ts");
class ProjectileMessage extends Message_1.Message {
    constructor(id) {
        super();
        this.id = id;
        this.type = "projectileMessage";
    }
}
exports.ProjectileMessage = ProjectileMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/projectile/ProjectileSpawnMessage.ts":
/*!*******************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/projectile/ProjectileSpawnMessage.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectileSpawnMessage = void 0;
const ProjectileMessage_1 = __webpack_require__(/*! ./ProjectileMessage */ "./libs/common/src/lib/message/game/projectile/ProjectileMessage.ts");
class ProjectileSpawnMessage extends ProjectileMessage_1.ProjectileMessage {
    constructor(projectile, source, target) {
        super(projectile.id);
        this.source = source;
        this.target = target;
        this.x = projectile.position.x;
        this.y = projectile.position.y;
        this.projType = projectile.type;
        this.type = "projectileSpawnMessage";
    }
}
exports.ProjectileSpawnMessage = ProjectileSpawnMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/projectile/ProjectileUpdateMessage.ts":
/*!********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/projectile/ProjectileUpdateMessage.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectileUpdateMessage = void 0;
const ProjectileMessage_1 = __webpack_require__(/*! ./ProjectileMessage */ "./libs/common/src/lib/message/game/projectile/ProjectileMessage.ts");
class ProjectileUpdateMessage extends ProjectileMessage_1.ProjectileMessage {
    constructor(projectile) {
        super(projectile.id);
        this.x = projectile.position.x;
        this.y = projectile.position.y;
        this.speedX = projectile.speed.x;
        this.speedY = projectile.speed.y;
        this.rotation = projectile.rotation;
        this.type = "projectileUpdateMessage";
    }
}
exports.ProjectileUpdateMessage = ProjectileUpdateMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/structures/StructureDestroyMessage.ts":
/*!********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/structures/StructureDestroyMessage.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureDestroyMessage = void 0;
const StructureMessage_1 = __webpack_require__(/*! ./StructureMessage */ "./libs/common/src/lib/message/game/structures/StructureMessage.ts");
class StructureDestroyMessage extends StructureMessage_1.StructureMessage {
    constructor(structure) {
        super(structure.id);
        this.type = "structureDestroyMessage";
    }
}
exports.StructureDestroyMessage = StructureDestroyMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/structures/StructureMessage.ts":
/*!*************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/structures/StructureMessage.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureMessage = void 0;
const Message_1 = __webpack_require__(/*! ../../Message */ "./libs/common/src/lib/message/Message.ts");
class StructureMessage extends Message_1.Message {
    constructor(id) {
        super();
        this.id = id;
        this.type = "structureMessage";
    }
}
exports.StructureMessage = StructureMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/game/structures/StructureSpawnMessage.ts":
/*!******************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/structures/StructureSpawnMessage.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureSpawnMessage = void 0;
const StructureMessage_1 = __webpack_require__(/*! ./StructureMessage */ "./libs/common/src/lib/message/game/structures/StructureMessage.ts");
class StructureSpawnMessage extends StructureMessage_1.StructureMessage {
    constructor(structure) {
        super(structure.id);
        this.x = structure.position.x;
        this.y = structure.position.y;
        this.activationDuration = structure.activationDuration;
        this.activationRange = structure.activationRange;
        this.info = structure.info;
        this.structureType = structure.type;
        this.type = "structureSpawnMessage";
    }
}
exports.StructureSpawnMessage = StructureSpawnMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/generic/PlayerMessage.ts":
/*!**************************************************************!*\
  !*** ./libs/common/src/lib/message/generic/PlayerMessage.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerMessage = void 0;
const Message_1 = __webpack_require__(/*! ../Message */ "./libs/common/src/lib/message/Message.ts");
class PlayerMessage extends Message_1.Message {
    constructor(source) {
        super();
        this.source = source;
        this.type = "playerMessage";
    }
}
exports.PlayerMessage = PlayerMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/generic/PlayerTargetMessage.ts":
/*!********************************************************************!*\
  !*** ./libs/common/src/lib/message/generic/PlayerTargetMessage.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTargetMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ./PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class PlayerTargetMessage extends PlayerMessage_1.PlayerMessage {
    constructor(source, target) {
        super(source);
        this.target = target;
        this.type = "playerTargetMessage";
    }
}
exports.PlayerTargetMessage = PlayerTargetMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/login/LobbyQueryMessage.ts":
/*!****************************************************************!*\
  !*** ./libs/common/src/lib/message/login/LobbyQueryMessage.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyQueryMessage = void 0;
const Message_1 = __webpack_require__(/*! ../Message */ "./libs/common/src/lib/message/Message.ts");
class LobbyQueryMessage extends Message_1.Message {
    constructor() {
        super();
        this.type = "lobbyQueryMessage";
    }
}
exports.LobbyQueryMessage = LobbyQueryMessage;


/***/ }),

/***/ "./libs/common/src/lib/message/login/PlayerLoginMessage.ts":
/*!*****************************************************************!*\
  !*** ./libs/common/src/lib/message/login/PlayerLoginMessage.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerLoginMessage = void 0;
const PlayerMessage_1 = __webpack_require__(/*! ../generic/PlayerMessage */ "./libs/common/src/lib/message/generic/PlayerMessage.ts");
class PlayerLoginMessage extends PlayerMessage_1.PlayerMessage {
    constructor(source, fitting) {
        super(source);
        this.source = source;
        this.fitting = fitting;
        this.type = "playerLoginMessage";
    }
}
exports.PlayerLoginMessage = PlayerLoginMessage;


/***/ }),

/***/ "./libs/common/src/lib/model/Cannon.ts":
/*!*********************************************!*\
  !*** ./libs/common/src/lib/model/Cannon.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Cannon = void 0;
class Cannon {
    constructor(spaceship) {
        this.rotation = 0;
        this.maxOmega = 0.3;
        this.remainingCooldown = 0;
        this.cooldownDuration = 5;
        this.range = 200;
        this.damage = 10;
        this.maxAimAngle = 0.01;
        this.parent = spaceship;
    }
    get targetPlayer() {
        return this.parent.targetPlayer;
    }
}
exports.Cannon = Cannon;


/***/ }),

/***/ "./libs/common/src/lib/model/Inventory.ts":
/*!************************************************!*\
  !*** ./libs/common/src/lib/model/Inventory.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
    constructor(name) {
        this.name = name;
        this.amount = 0;
    }
}
exports.Inventory = Inventory;


/***/ }),

/***/ "./libs/common/src/lib/model/Particle.ts":
/*!***********************************************!*\
  !*** ./libs/common/src/lib/model/Particle.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
class Particle {
    constructor() {
        this.rotation = 0;
        this.omega = 0;
        this.mass = 1;
        this.radius = 10;
        this.position = { x: 0, y: 0 };
        this.speed = { x: 0, y: 0 };
        this.accel = { x: 0, y: 0 };
    }
}
exports.Particle = Particle;


/***/ }),

/***/ "./libs/common/src/lib/model/Projectile.ts":
/*!*************************************************!*\
  !*** ./libs/common/src/lib/model/Projectile.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Projectile = void 0;
const Particle_1 = __webpack_require__(/*! ./Particle */ "./libs/common/src/lib/model/Particle.ts");
class Projectile extends Particle_1.Particle {
    constructor(id, color) {
        super();
        this.id = id;
        this.color = color;
        this.timeToLife = 1;
        this.type = "projectile";
    }
    onInit() {
    }
    iterate(delta) {
        this.timeToLife -= delta;
    }
    onDestroy() {
    }
}
exports.Projectile = Projectile;


/***/ }),

/***/ "./libs/common/src/lib/model/ScoreboardEntry.ts":
/*!******************************************************!*\
  !*** ./libs/common/src/lib/model/ScoreboardEntry.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreboardEntry = void 0;
class ScoreboardEntry {
    constructor(name, kills) {
        this.name = name;
        this.kills = kills;
    }
}
exports.ScoreboardEntry = ScoreboardEntry;


/***/ }),

/***/ "./libs/common/src/lib/model/ShipEquipment.ts":
/*!****************************************************!*\
  !*** ./libs/common/src/lib/model/ShipEquipment.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEquipment = void 0;
class ShipEquipment {
    constructor(name, tier, cpuCost, powerCost, cycleTime, passive, action) {
        this.name = name;
        this.tier = tier;
        this.cpuCost = cpuCost;
        this.powerCost = powerCost;
        this.cycleTime = cycleTime;
        this.passive = passive;
        this.action = action;
        this.state = {
            active: false,
            pendingState: false,
            rotation: 0
        };
        this.remainingTime = 0.0;
    }
    onInit(parent) {
    }
    iterate(parent, delta) {
        this.remainingTime -= delta;
        this.remainingTime = this.remainingTime >= 0 ? this.remainingTime : 0;
    }
    onDestroy(parent) {
    }
}
exports.ShipEquipment = ShipEquipment;


/***/ }),

/***/ "./libs/common/src/lib/model/ShipFitting.ts":
/*!**************************************************!*\
  !*** ./libs/common/src/lib/model/ShipFitting.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipFitting = void 0;
class ShipFitting {
    constructor() {
        this.fitting = [];
    }
}
exports.ShipFitting = ShipFitting;


/***/ }),

/***/ "./libs/common/src/lib/model/Skill.ts":
/*!********************************************!*\
  !*** ./libs/common/src/lib/model/Skill.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = void 0;
class Skill {
    constructor() {
        this.animationDuration = 4.0;
        this.remainingTime = 4.0;
    }
    onInit() {
    }
    iterate(delta) {
        this.remainingTime -= delta;
    }
    onDestroy() {
    }
}
exports.Skill = Skill;


/***/ }),

/***/ "./libs/common/src/lib/model/Spaceship.ts":
/*!************************************************!*\
  !*** ./libs/common/src/lib/model/Spaceship.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Spaceship = void 0;
const Particle_1 = __webpack_require__(/*! ./Particle */ "./libs/common/src/lib/model/Particle.ts");
const ShipFitting_1 = __webpack_require__(/*! ./ShipFitting */ "./libs/common/src/lib/model/ShipFitting.ts");
class Spaceship extends Particle_1.Particle {
    constructor(id, color) {
        super();
        this.maxSpeed = 50;
        this.health = 100;
        this.maxHealth = 150;
        this.color = "#00FF00";
        this.curSpeedDEP = 0;
        this.fitting = new ShipFitting_1.ShipFitting();
        this.inventory = [];
        this.timeToMaxSpeed = 2;
        this.power = 100;
        this.shipSize = 7;
        this.speedInput = 1;
        this.maxOmega = 1 * Math.PI;
        this.cpuCapacity = 200;
        this.activationProgress = 0;
        this.energyRechargeRate = 1.0;
        this.energyCapacity = 150;
        this.isNPC = false;
        this.maxIdleTimeMs = 30 * 60 * 1000;
        this.orbitRadius = 100;
        this.actionOrbitTarget = false;
        this.actionKeepAtRange = false;
        this.actionUseStructure = false;
        this.id = id;
        this.color = color;
    }
    set targetPlayer(target) {
        this._targetPlayer = target;
    }
    ;
    get targetPlayer() {
        return this._targetPlayer;
    }
    get acceleration() {
        return this.maxSpeed / (this.timeToMaxSpeed * this.mass);
    }
    removeTarget() {
        this.targetPlayer = undefined;
        this.actionOrbitTarget = false;
    }
    onInit() {
    }
    onDestroy() {
    }
}
exports.Spaceship = Spaceship;


/***/ }),

/***/ "./libs/common/src/lib/model/Structure.ts":
/*!************************************************!*\
  !*** ./libs/common/src/lib/model/Structure.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Structure = void 0;
class Structure {
    constructor(x, y) {
        this.activationDuration = 4;
        this.activationRange = 300;
        this.maxIdleTimeMs = 60 * 30 * 1000;
        this.isStatic = false;
        this.position = {
            x: x,
            y: y
        };
        this.type = "structure";
    }
}
exports.Structure = Structure;


/***/ }),

/***/ "./libs/common/src/lib/model/TimedAbility.ts":
/*!***************************************************!*\
  !*** ./libs/common/src/lib/model/TimedAbility.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./libs/common/src/lib/physics/Physics.ts":
/*!************************************************!*\
  !*** ./libs/common/src/lib/physics/Physics.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Physics = void 0;
class Physics {
    constructor() {
    }
    static iterate(particle, delta) {
        particle.position.x += particle.speed.x * delta;
        particle.position.y += particle.speed.y * delta;
        particle.speed.x += particle.accel.x * delta;
        particle.speed.y += particle.accel.y * delta;
        particle.rotation += particle.omega * delta;
        particle.rotation = particle.rotation % (2 * Math.PI);
        particle.omega = 0;
        particle.accel.x = 0;
        particle.accel.y = 0;
    }
    static renderParticle() {
    }
}
exports.Physics = Physics;


/***/ }),

/***/ "./libs/common/src/lib/util/CMath.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/lib/util/CMath.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CMath = void 0;
const math = __webpack_require__(/*! mathjs */ "mathjs");
class CMath {
    constructor() {
    }
    static normalize3(vec) {
        const res = math.norm([vec.x, vec.y, vec.z]);
        return { x: vec.x / res, y: vec.y / res, z: vec.z / res };
    }
    static normalize(vec) {
        const res = math.norm([vec.x, vec.y]);
        return { x: vec.x / res, y: vec.y / res };
    }
    static clamp(vec) {
    }
    static rotate(vec, a) {
        //const angle = a / 180 * math.pi;
        const angle = a;
        return {
            x: math.cos(angle) * vec.x - math.sin(angle) * vec.y,
            y: math.sin(angle) * vec.x + math.cos(angle) * vec.y
        };
    }
    static angle(tDir, orient) {
        /*
            const dotProduct = math.dot( [tDir.x, tDir.y], [orient.x, orient.y])
        
            return math.acos(dotProduct / ( math.norm( [tDir.x, tDir.y]) * math.norm( [orient.x, orient.y])));
        
        */
        //const a = A.x - C.x;
        //float b = A.y - C.y;
        //float c = B.x - C.x;
        //float d = B.y - C.y;
        /*
            const a = tDir.x;
            const b = tDir.y;
            const c = orient.x;
            const d = orient.y;
        
            const angleA = math.atan2(b, a);
            const angleB = math.atan2(d, c);
            const rotationAngleRad = angleA - angleB;
            return rotationAngleRad;
        */
        let angle = math.acos(this.dot(tDir, orient));
        const cross = this.cross(tDir, orient);
        /*
        if (dotProduct(Vn, cross) < 0) { // Or > 0
          angle = -angle;
        }
    
    
    
        */
        if (this.dot3({ x: 0, y: 0, z: 1 }, cross) > 0) {
            angle = -angle;
        }
        if (angle.hasOwnProperty("re")) {
            //angle = angle.re;
            console.error("winkel ist komplex!", angle);
            angle = 0;
        }
        if (isNaN(angle))
            return 0;
        return angle;
    }
    static degree(tDir, orient) {
        const dotProduct = math.dot([tDir.x, tDir.y], [orient.x, orient.y]);
        const l_tDir = math.norm([tDir.x, tDir.y]);
        const l_orient = math.norm([orient.x, orient.y]);
        return math.acos(dotProduct / (l_tDir * l_orient));
    }
    static constructTangent(center, radius, point) {
        const b = math.sqrt((point.x - center.x) * (point.x - center.x) + (point.y - center.y) * (point.y - center.y));
        if (radius > b) {
            // Inside circle
            return {
                isInside: true
            };
        }
        else if (radius === b) {
            // on tangent
            return {
                isOnTangent: true
            };
        }
        else {
            const th = math.acos(radius / b); //  # angle theta
            const d = math.atan2(point.y - center.y, point.x - center.x); //  # direction angle of point P from C
            const d1 = d + th; //  # direction angle of point T1 from C
            const d2 = d - th; // # direction angle of point T2 from C
            const T1x = center.x + radius * math.cos(d1);
            const T1y = center.y + radius * math.sin(d1);
            const T2x = center.x + radius * math.cos(d2);
            const T2y = center.y + radius * math.sin(d2);
            return {
                tangents: {
                    t1: { x: T1x, y: T1y },
                    t2: { x: T2x, y: T2y },
                }
            };
        }
    }
    static scale(v1, scale) {
        return {
            x: v1.x * scale,
            y: v1.y * scale
        };
    }
    static add(v1, v2) {
        return {
            x: v1.x + v2.x,
            y: v1.y + v2.y
        };
    }
    static sub(v1, v2) {
        return {
            x: v1.x - v2.x,
            y: v1.y - v2.y
        };
    }
    static len(v) {
        return math.norm([v.x, v.y]);
    }
    static dot(v1, v2) {
        const v1n = this.normalize(v1);
        const v2n = this.normalize(v2);
        const res = math.dot([v1n.x, v1n.y], [v2n.x, v2n.y]);
        return res;
    }
    static dot3(v1, v2) {
        const v1n = this.normalize(v1);
        const v2n = this.normalize(v2);
        const res = math.dot([v1.x, v1.y, v1.z], [v2.x, v2.y, v2.z]);
        return res;
    }
    static cross3(v1, v2) {
        const v1n = this.normalize3(v1);
        const v2n = this.normalize3(v2);
        const res = math.cross([v1n.x, v1n.y, v1n.z], [v2n.x, v2n.y, v2.z]);
        return {
            x: res[0],
            y: res[1],
            z: res[2]
        };
    }
    static cross(v1, v2) {
        const v1n = this.normalize(v1);
        const v2n = this.normalize(v2);
        const res = math.cross([v1n.x, v1n.y, 0], [v2n.x, v2n.y, 0]);
        return {
            x: res[0],
            y: res[1],
            z: res[2]
        };
    }
    static isInsideCircle(center, point, radius) {
        const v = CMath.sub(point, center);
        const distance = math.norm([v.x, v.y]);
        return distance < radius;
    }
    static getAngularVelocity(particle, target) {
        const r = {
            x: particle.position.x - target.x,
            y: particle.position.y - target.y
        };
        // TODO: winkel nur zwischen 0 und 180 grad
        const alpha = CMath.angle(r, particle.speed);
        const v_norm = math.norm([particle.speed.x, particle.speed.y]);
        const r_norm = math.norm([r.x, r.y]);
        //console.log(v_norm);
        //console.log(alpha * 180 / math.pi);
        //console.log(particle.speed);
        const omega = v_norm * math.sin(alpha) / r_norm;
        return math.abs(omega);
    }
}
exports.CMath = CMath;


/***/ }),

/***/ "./libs/common/src/lib/util/Factories.ts":
/*!***********************************************!*\
  !*** ./libs/common/src/lib/util/Factories.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Factories = void 0;
const Spaceship_1 = __webpack_require__(/*! ../model/Spaceship */ "./libs/common/src/lib/model/Spaceship.ts");
class Factories {
    static createSpaceship(msg) {
        return new Spaceship_1.Spaceship(msg.source, msg.color);
    }
}
exports.Factories = Factories;


/***/ }),

/***/ "./libs/common/src/lib/util/Util.ts":
/*!******************************************!*\
  !*** ./libs/common/src/lib/util/Util.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = void 0;
function getRandomColor() {
    return '#' + Math.random().toString(16).substr(2, 6);
}
exports.getRandomColor = getRandomColor;


/***/ }),

/***/ "./libs/common/src/lib/util/VectorInterface.ts":
/*!*****************************************************!*\
  !*** ./libs/common/src/lib/util/VectorInterface.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./libs/game-engine/src/index.ts":
/*!***************************************!*\
  !*** ./libs/game-engine/src/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/CollisionDetection */ "./libs/game-engine/src/lib/CollisionDetection.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/impl/IPhysics */ "./libs/game-engine/src/lib/impl/IPhysics.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/impl/ArcadePhysics */ "./libs/game-engine/src/lib/impl/ArcadePhysics.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/impl/HybridPhysics */ "./libs/game-engine/src/lib/impl/HybridPhysics.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/impl/RealPhysics */ "./libs/game-engine/src/lib/impl/RealPhysics.ts"), exports);


/***/ }),

/***/ "./libs/game-engine/src/lib/CollisionDetection.ts":
/*!********************************************************!*\
  !*** ./libs/game-engine/src/lib/CollisionDetection.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionDetection = void 0;
const CollisionParticleWall_1 = __webpack_require__(/*! ./collision/CollisionParticleWall */ "./libs/game-engine/src/lib/collision/CollisionParticleWall.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const CollisionParticleParticle_1 = __webpack_require__(/*! ./collision/CollisionParticleParticle */ "./libs/game-engine/src/lib/collision/CollisionParticleParticle.ts");
class CollisionDetection {
    static detect(particles, structures, boundries) {
        particles.forEach((particle) => {
            this.checkBoundries(particle, boundries);
        });
        this.partitionSpace(particles, boundries, 10);
    }
    static checkBoundries(particle, boundry) {
        if (particle.position.x - particle.radius < boundry.x1.x) {
            CollisionParticleWall_1.CollisionParticleWall.collide(particle, { x: 1, y: 0 }, boundry.x1.x - (particle.position.x - particle.radius));
        }
        if (particle.position.x + particle.radius > boundry.x2.x) {
            CollisionParticleWall_1.CollisionParticleWall.collide(particle, { x: -1, y: 0 }, (particle.position.x + particle.radius) - boundry.x2.x);
        }
        if (particle.position.y - particle.radius < boundry.x1.y) {
            CollisionParticleWall_1.CollisionParticleWall.collide(particle, { x: 0, y: 1 }, boundry.x1.y - (particle.position.y - particle.radius));
        }
        if (particle.position.y + particle.radius > boundry.x2.y) {
            CollisionParticleWall_1.CollisionParticleWall.collide(particle, { x: 0, y: -1 }, (particle.position.y + particle.radius) - boundry.x2.y);
        }
    }
    static partitionSpace(particles, boundry, depth) {
        const r1c = 10;
        const r2c = 10;
        if (particles.length < 2)
            return;
        if (particles.length === 2) {
            const distanceBetweenCircles = common_1.CMath.len(common_1.CMath.sub(particles[0].position, particles[1].position));
            //        console.log(distanceBetweenCircles);
            if (distanceBetweenCircles < (r1c + r2c)) {
                const penDepth = r1c + r2c - distanceBetweenCircles;
                CollisionParticleParticle_1.CollisionParticleParticle.collide(particles[0], particles[1], penDepth);
            }
            return;
        }
        if (depth === 0) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const distanceBetweenCircles = common_1.CMath.len(common_1.CMath.sub(particles[i].position, particles[j].position));
                    if (distanceBetweenCircles < (r1c + r2c)) {
                        const penDepth = r1c + r2c - distanceBetweenCircles;
                        CollisionParticleParticle_1.CollisionParticleParticle.collide(particles[i], particles[j], penDepth);
                    }
                }
            }
            return;
        }
        const w = boundry.x2.x - boundry.x1.x;
        const h = boundry.x2.y - boundry.x1.y;
        let r1;
        let r2;
        if (w > h) {
            r1 = {
                x1: {
                    x: boundry.x1.x,
                    y: boundry.x1.y,
                },
                x2: {
                    x: boundry.x1.x + w / 2,
                    y: boundry.x2.y
                }
            };
            r2 = {
                x1: {
                    x: boundry.x1.x + w / 2,
                    y: boundry.x1.y,
                },
                x2: {
                    x: boundry.x2.x,
                    y: boundry.x2.y
                }
            };
        }
        else {
            r1 = {
                x1: {
                    x: boundry.x1.x,
                    y: boundry.x1.y,
                },
                x2: {
                    x: boundry.x2.x,
                    y: boundry.x1.y + h / 2
                }
            };
            r2 = {
                x1: {
                    x: boundry.x1.x,
                    y: boundry.x1.y + h / 2,
                },
                x2: {
                    x: boundry.x2.x,
                    y: boundry.x2.y
                }
            };
        }
        const s1 = [];
        const s2 = [];
        particles.forEach((particle) => {
            if (this.isInRectangle(particle, r1))
                s1.push(particle);
            else
                s2.push(particle);
        });
        this.partitionSpace(s1, r1, depth - 1);
        this.partitionSpace(s2, r2, depth - 1);
    }
    static isInRectangle(particle, boundry) {
        if (particle.position.x >= boundry.x1.x && particle.position.x <= boundry.x2.x) {
            if (particle.position.y >= boundry.x1.y && particle.position.y <= boundry.x2.y)
                return true;
        }
        return false;
    }
}
exports.CollisionDetection = CollisionDetection;


/***/ }),

/***/ "./libs/game-engine/src/lib/collision/CollisionParticleParticle.ts":
/*!*************************************************************************!*\
  !*** ./libs/game-engine/src/lib/collision/CollisionParticleParticle.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionParticleParticle = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class CollisionParticleParticle {
    static collide(p1, p2, penetrationDepth) {
        const r1 = 10;
        const r2 = 10;
        const deltaVector = common_1.CMath.sub(p1.position, p2.position);
        const distanceBetweenCircles = common_1.CMath.len(deltaVector);
        // Changing speed of colliders
        const getV = (v1, v2, m1, m2) => {
            return (v1 * (m1 - m2) + (2 * m2 * v2)) / (m1 + m2);
        };
        const v1 = {
            x: getV(p1.speed.x, p2.speed.x, p1.mass, p2.mass),
            y: getV(p1.speed.y, p2.speed.y, p1.mass, p2.mass),
        };
        const v2 = {
            x: getV(p2.speed.x, p1.speed.x, p2.mass, p1.mass),
            y: getV(p2.speed.y, p1.speed.y, p2.mass, p1.mass),
        };
        p1.speed = v1;
        p2.speed = v2;
        // Changing orientation of colliders
        const viewDir = { x: 0, y: 1 };
        const rot1 = common_1.CMath.angle(common_1.CMath.normalize(v1), viewDir);
        const rot2 = common_1.CMath.angle(common_1.CMath.normalize(v2), viewDir);
        p1.rotation = rot1;
        p2.rotation = rot2;
        const pCollision = {
            x: (p1.position.x * p2.radius + p2.position.x * p1.radius) / (p1.radius + p2.radius),
            y: (p1.position.y * p2.radius + p2.position.y * p1.radius) / (p1.radius + p2.radius),
        };
        // Particle displacement
        const dist1 = common_1.CMath.sub(p1.position, pCollision);
        const dist2 = common_1.CMath.sub(p2.position, pCollision);
        const f1 = 1 - (common_1.CMath.len(dist1) / p1.radius);
        const f2 = 1 - (common_1.CMath.len(dist2) / p2.radius);
        const dn1 = common_1.CMath.normalize(dist1);
        const dn2 = common_1.CMath.normalize(dist2);
        p1.position.x += dn1.x * (1 + f1);
        p1.position.y += dn1.y * (1 + f1);
        p2.position.x += dn2.x * (1 + f2);
        p2.position.y += dn2.y * (1 + f2);
    }
}
exports.CollisionParticleParticle = CollisionParticleParticle;


/***/ }),

/***/ "./libs/game-engine/src/lib/collision/CollisionParticleWall.ts":
/*!*********************************************************************!*\
  !*** ./libs/game-engine/src/lib/collision/CollisionParticleWall.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionParticleWall = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class CollisionParticleWall {
    static collide(particle, n, penetrationDepth) {
        //console.log("collide");
        const d = common_1.CMath.normalize(particle.speed);
        const curSpeed = common_1.CMath.len(particle.speed);
        //console.log("normal", n);
        //console.log("speed", d);
        const r = common_1.CMath.sub(d, common_1.CMath.scale(n, 2 * common_1.CMath.dot(d, n)));
        const viewDir = common_1.CMath.rotate({ x: 0, y: 1 }, 0);
        //console.log("viewDir", viewDir);
        //console.log("r", r);
        //particle.speed = r;
        const angle = common_1.CMath.angle(r, viewDir);
        //console.log(angle);
        particle.rotation = angle;
        const displacementVector = common_1.CMath.scale(n, penetrationDepth);
        particle.position.x += displacementVector.x;
        particle.position.y += displacementVector.y;
        //console.log(particle.position);
        particle.speed = common_1.CMath.scale(r, curSpeed);
        //console.log("---");
    }
}
exports.CollisionParticleWall = CollisionParticleWall;


/***/ }),

/***/ "./libs/game-engine/src/lib/impl/ArcadePhysics.ts":
/*!********************************************************!*\
  !*** ./libs/game-engine/src/lib/impl/ArcadePhysics.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ArcadePhysics = void 0;
const IPhysics_1 = __webpack_require__(/*! ./IPhysics */ "./libs/game-engine/src/lib/impl/IPhysics.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class ArcadePhysics extends IPhysics_1.IPhysics {
    getOrientation(particle) {
        return common_1.CMath.rotate({ x: 0, y: 1 }, particle.rotation);
    }
    iterate(spaceship, delta) {
        super.iterate(spaceship, delta);
        const orientation = this.getOrientation(spaceship);
        if (spaceship.curSpeedDEP > spaceship.maxSpeed) {
            spaceship.curSpeedDEP = spaceship.maxSpeed;
        }
        if (spaceship.curSpeedDEP > 1.05 * (spaceship.speedInput * spaceship.maxSpeed)) {
            spaceship.curSpeedDEP -= spaceship.acceleration * delta;
        }
        else if (spaceship.curSpeedDEP < 0.95 * (spaceship.speedInput * spaceship.maxSpeed)) {
            spaceship.curSpeedDEP += spaceship.acceleration * delta;
        }
        else {
        }
        spaceship.speed = {
            x: orientation.x * spaceship.curSpeedDEP,
            y: orientation.y * spaceship.curSpeedDEP
        };
    }
    moveTo(particle, target, stopAtTarget) {
        const dir = {
            x: target.x - particle.position.x,
            y: target.y - particle.position.y
        };
        const orientation = this.getOrientation(particle);
        const angleTarget = common_1.CMath.angle(dir, orientation);
        return {
            r: angleTarget,
            a: {
                x: 0,
                y: 0
            },
            vCap: 1
        };
    }
}
exports.ArcadePhysics = ArcadePhysics;


/***/ }),

/***/ "./libs/game-engine/src/lib/impl/HybridPhysics.ts":
/*!********************************************************!*\
  !*** ./libs/game-engine/src/lib/impl/HybridPhysics.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HybridPhysics = void 0;
const IPhysics_1 = __webpack_require__(/*! ./IPhysics */ "./libs/game-engine/src/lib/impl/IPhysics.ts");
const math = __webpack_require__(/*! mathjs */ "mathjs");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class HybridPhysics extends IPhysics_1.IPhysics {
    getOrientation(particle) {
        const n = math.norm([particle.speed.x, particle.speed.y]);
        //console.log(n);
        //
        if (n == 0) {
            return common_1.CMath.rotate({ x: 0, y: 1 }, particle.rotation);
        }
        else {
            return {
                x: particle.speed.x / n,
                y: particle.speed.y / n
            };
        }
        //return particle.speed;
    }
    iterate(spaceship, delta) {
        super.iterate(spaceship, delta);
        const orientation = this.getOrientation(spaceship);
        const v = common_1.CMath.len(spaceship.speed);
        if (v > spaceship.speedInput * spaceship.maxSpeed) {
            const bremskraft = {
                x: spaceship.speed.x / v,
                y: spaceship.speed.y / v
            };
            spaceship.speed.x -= 2 * bremskraft.x * spaceship.acceleration * delta;
            spaceship.speed.y -= 2 * bremskraft.y * spaceship.acceleration * delta;
        }
        /*
            if ( math.abs(spaceship.omega) > spaceship.maxOmega ) {
              spaceship.omega = math.sign(spaceship.omega) * spaceship.maxOmega;
            }
            */
        spaceship.omega = spaceship.omega / (4 * delta);
    }
    moveTo(particle, target, stopAtTarget) {
        const dir = {
            x: target.x - particle.position.x,
            y: target.y - particle.position.y
        };
        const orientation = this.getOrientation(particle);
        const angle = common_1.CMath.angle(dir, common_1.CMath.rotate({ x: 0, y: 1 }, particle.rotation));
        let angleTarget = common_1.CMath.angle(dir, orientation);
        let ang = angleTarget;
        /*
            //ang = 0;
        
                if ( math.abs(ang) > this.maxOmega / delta) {
                  ang = math.sign(ang) * this.maxOmega;
                }
        
        
            const newSpeed = CMath.rotate(this.speed, ang);
        */
        const a = {
            x: 0,
            y: 0
        };
        if (math.abs(angleTarget) > 0) {
            //const schub: Vector2 = CMath.rotate(this.getOrientation(this), angleTarget);
            const b = {
                x: particle.position.x + particle.speed.x * 0.016,
                y: particle.position.y + particle.speed.y * 0.016,
            };
            const schub = common_1.CMath.sub(target, b);
            const schub_len = common_1.CMath.len(schub);
            a.x = particle.acceleration * schub.x / schub_len;
            a.y = particle.acceleration * schub.y / schub_len;
        }
        else {
            a.x = particle.acceleration * orientation.x;
            a.y = particle.acceleration * orientation.y;
        }
        return {
            a: a,
            r: angle,
            vCap: 1
        };
    }
}
exports.HybridPhysics = HybridPhysics;


/***/ }),

/***/ "./libs/game-engine/src/lib/impl/IPhysics.ts":
/*!***************************************************!*\
  !*** ./libs/game-engine/src/lib/impl/IPhysics.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IPhysics = void 0;
const math = __webpack_require__(/*! mathjs */ "mathjs");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class IPhysics {
    orbitOutside(spaceship, target, t1, t2) {
        const orient = this.getOrientation(spaceship);
        const v1 = {
            x: t1.x - spaceship.position.x,
            y: t1.y - spaceship.position.y,
        };
        const v2 = {
            x: t2.x - spaceship.position.x,
            y: t2.y - spaceship.position.y,
        };
        const angle1 = common_1.CMath.degree(v1, orient);
        const angle2 = common_1.CMath.degree(v2, orient);
        if (math.abs(angle2) < math.abs(angle1))
            return this.moveTo(spaceship, t2);
        else
            return this.moveTo(spaceship, t1);
    }
    orbitTangent(spaceship, target) {
        const angle = common_1.CMath.angle(this.getOrientation(spaceship), { x: 0, y: 1 });
        return {
            r: angle,
            a: {
                x: 0,
                y: 0
            },
            vCap: 1
        };
    }
    orbitInside(spaceship, target) {
        return this.keepAtRange(spaceship, target, spaceship.orbitRadius);
    }
    keepAtRange(spaceship, target, range) {
        const dir = {
            x: target.x - spaceship.position.x,
            y: target.y - spaceship.position.y
        };
        const len = common_1.CMath.len(dir);
        const targetPoint = {
            x: dir.x * range / len,
            y: dir.y * range / len,
        };
        return this.moveTo(spaceship, targetPoint);
    }
    orbitTarget(spaceship, target) {
        const tangents = common_1.CMath.constructTangent(target, spaceship.orbitRadius, spaceship.position);
        if (tangents.tangents !== undefined) {
            return this.orbitOutside(spaceship, target, tangents.tangents.t1, tangents.tangents.t2);
        }
        else if (tangents.isInside) {
            return this.orbitInside(spaceship, target);
        }
        else {
            return this.orbitTangent(spaceship, target);
        }
    }
    iterate(spaceship, delta) {
        const angle = spaceship.rotation;
        let acc = {
            x: 0,
            y: 0
        };
        if (common_1.CMath.len(spaceship.speed) > 0) {
            acc = common_1.CMath.scale(common_1.CMath.rotate({
                x: 0,
                y: 1
            }, angle), spaceship.acceleration);
        }
        let input = {
            r: 0,
            a: acc
        };
        if (spaceship.actionOrbitTarget) {
            if (spaceship.targetPlayer !== undefined)
                input = this.orbitTarget(spaceship, spaceship.targetPlayer.position);
        }
        else if (spaceship.actionKeepAtRange) {
            if (spaceship.targetPlayer !== undefined)
                input = this.keepAtRange(spaceship, spaceship.targetPlayer.position, spaceship.orbitRadius);
        }
        else {
            if (spaceship.targetPosition !== undefined) {
                const a = this.getOrientation(spaceship);
                const b = common_1.CMath.normalize(common_1.CMath.sub(spaceship.targetPosition, spaceship.position));
                if (math.abs(common_1.CMath.angle(a, b)) < 0.5) {
                    spaceship.targetPosition = undefined;
                }
                else {
                    input = this.moveTo(spaceship, spaceship.targetPosition);
                }
            }
        }
        spaceship.accel = input.a;
        spaceship.omega = input.r;
    }
}
exports.IPhysics = IPhysics;


/***/ }),

/***/ "./libs/game-engine/src/lib/impl/RealPhysics.ts":
/*!******************************************************!*\
  !*** ./libs/game-engine/src/lib/impl/RealPhysics.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RealPhysics = void 0;
const IPhysics_1 = __webpack_require__(/*! ./IPhysics */ "./libs/game-engine/src/lib/impl/IPhysics.ts");
const math = __webpack_require__(/*! mathjs */ "mathjs");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class RealPhysics extends IPhysics_1.IPhysics {
    getOrientation(particle) {
        return common_1.CMath.rotate({ x: 0, y: 1 }, particle.rotation);
    }
    iterate(spaceship, delta) {
        super.iterate(spaceship, delta);
        const orientation = this.getOrientation(spaceship);
        const v = common_1.CMath.len(spaceship.speed);
        if (v > spaceship.speedInput * spaceship.maxSpeed) {
            spaceship.speed.x -= orientation.x * spaceship.acceleration * delta;
            spaceship.speed.y -= orientation.y * spaceship.acceleration * delta;
        }
        if (math.abs(spaceship.omega) > spaceship.maxOmega) {
            spaceship.omega = math.sign(spaceship.omega) * spaceship.maxOmega;
        }
    }
    moveTo(particle, target, stopAtTarget) {
        const dir = {
            x: target.x - particle.position.x,
            y: target.y - particle.position.y
        };
        const orientation = this.getOrientation(particle);
        const angle = common_1.CMath.angle(orientation, { x: 0, y: 1 });
        let angleTarget = common_1.CMath.angle(dir, orientation);
        const d = common_1.CMath.rotate(orientation, angleTarget);
        return {
            r: angleTarget,
            a: {
                x: d.x * particle.acceleration,
                y: d.y * particle.acceleration
            },
            vCap: 1
        };
    }
}
exports.RealPhysics = RealPhysics;


/***/ }),

/***/ "./libs/game-logic/src/index.ts":
/*!**************************************!*\
  !*** ./libs/game-logic/src/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/GameLogic */ "./libs/game-logic/src/lib/GameLogic.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/EventManager */ "./libs/game-logic/src/lib/EventManager.ts"), exports);


/***/ }),

/***/ "./libs/game-logic/src/lib/EventManager.ts":
/*!*************************************************!*\
  !*** ./libs/game-logic/src/lib/EventManager.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const events = __webpack_require__(/*! events */ "events");
class EventManager {
}
exports.EventManager = EventManager;
EventManager.shootProjectile = new events.EventEmitter();


/***/ }),

/***/ "./libs/game-logic/src/lib/GameLogic.ts":
/*!**********************************************!*\
  !*** ./libs/game-logic/src/lib/GameLogic.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLogic = void 0;
const Scoreboard_1 = __webpack_require__(/*! ./core/Scoreboard */ "./libs/game-logic/src/lib/core/Scoreboard.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_2 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_3 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const CollisionDetection_1 = __webpack_require__(/*! ../../../game-engine/src/lib/CollisionDetection */ "./libs/game-engine/src/lib/CollisionDetection.ts");
const EventManager_1 = __webpack_require__(/*! ./EventManager */ "./libs/game-logic/src/lib/EventManager.ts");
const common_4 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const StructurePortalEntity_1 = __webpack_require__(/*! ./entity/structures/StructurePortalEntity */ "./libs/game-logic/src/lib/entity/structures/StructurePortalEntity.ts");
const MessageDeserializer_1 = __webpack_require__(/*! ./serialize/MessageDeserializer */ "./libs/game-logic/src/lib/serialize/MessageDeserializer.ts");
const GarbageCollector_1 = __webpack_require__(/*! ./core/GarbageCollector */ "./libs/game-logic/src/lib/core/GarbageCollector.ts");
const ServerEnemySpawnMessage_1 = __webpack_require__(/*! ./entity/message/ServerEnemySpawnMessage */ "./libs/game-logic/src/lib/entity/message/ServerEnemySpawnMessage.ts");
const common_5 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class GameLogic {
    constructor() {
        this.uniqueIterator = 0;
        this.players = [];
        this.skills = [];
        this.projectiles = [];
        this.structures = [];
        this.boundries = {
            x1: {
                x: -1000,
                y: -500,
            },
            x2: {
                x: 2000,
                y: 1000
            }
        };
        this.scoreboard = new Scoreboard_1.Scoreboard();
        this.spawnPortal(-700, 450);
        EventManager_1.EventManager.shootProjectile.on('shootProjectile', (msg) => {
            this.onShootProjectile(msg);
        });
        EventManager_1.EventManager.shootProjectile.on('playerHit', (msg) => {
            this.onPlayerHit(msg);
        });
    }
    gameLoop(delta) {
        this.players.forEach((player) => {
            player.iterate(delta);
            common_1.Physics.iterate(player, delta);
            const msg = new common_2.PlayerUpdateMessage(player);
            this.send(msg);
        });
        this.projectiles.forEach((value) => {
            value.iterate(delta);
            const msg = new common_3.ProjectileUpdateMessage(value);
            this.send(msg);
        });
        this.skills.forEach((skill) => {
            skill.iterate(delta);
        });
        CollisionDetection_1.CollisionDetection.detect(this.players, this.structures, this.boundries);
    }
    send(msg) { }
    onMessage(msg, broadCast, singleCast) {
        const serverMessage = MessageDeserializer_1.MessageDeserializer.deserialize(msg);
        if (serverMessage) {
            serverMessage.onRecieve(this);
        }
        if (!!msg.source) {
            const playerName = msg.source;
            const spaceShip = this.getPlayer(playerName);
            if (spaceShip !== undefined) {
                spaceShip.timestampLastActionMs = new Date().getTime();
            }
        }
    }
    getPlayer(name) {
        return this.players.find((p) => p.id === name);
    }
    getUniqueId() {
        return this.uniqueIterator++;
    }
    gc() {
        GarbageCollector_1.GarbageCollector.execute(this);
    }
    spawnDefaultEnemy() {
        const msg = new ServerEnemySpawnMessage_1.ServerEnemySpawnMessage(new common_5.EnemySpawnMessage("Enemy"));
        msg.onRecieve(this);
    }
    spawnPortal(x, y) {
        let structure = new StructurePortalEntity_1.StructurePortalEntity(x, y, this.scoreboard);
        structure.id = '' + this.getUniqueId();
        this.structures.push(structure);
    }
    onPlayerHit(msg) {
        msg.target.health -= msg.damage;
    }
    onShootProjectile(msg) {
        const projectileEntity = msg.projectile;
        projectileEntity.id = '' + this.getUniqueId();
        projectileEntity.onInit();
        this.projectiles.push(projectileEntity);
        const res = new common_4.ProjectileSpawnMessage(projectileEntity, projectileEntity.source.id, projectileEntity.target.id);
        this.send(res);
    }
}
exports.GameLogic = GameLogic;


/***/ }),

/***/ "./libs/game-logic/src/lib/core/GarbageCollector.ts":
/*!**********************************************************!*\
  !*** ./libs/game-logic/src/lib/core/GarbageCollector.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GarbageCollector = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_2 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_3 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const StructureLootEntity_1 = __webpack_require__(/*! ../entity/structures/StructureLootEntity */ "./libs/game-logic/src/lib/entity/structures/StructureLootEntity.ts");
const common_4 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_5 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_6 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class GarbageCollector {
    static execute(context) {
        this.gcPlayer(context);
        this.gcProjectile(context);
        this.gcStructure(context);
        this.gcSkill(context);
    }
    static gcPlayer(context) {
        const now = new Date().getTime();
        // Player
        const removePlayer = [];
        context.players.forEach((player) => {
            if (player.health <= 0)
                removePlayer.push(player);
            else if (!player.isNPC) {
                const lastPlayerAction = player.timestampLastActionMs ? player.timestampLastActionMs : 0;
                const timeSinceLastAction = now - lastPlayerAction;
                if (timeSinceLastAction > player.maxIdleTimeMs) {
                    player.silentRemove = true;
                    removePlayer.push(player);
                }
            }
        });
        removePlayer.forEach((value) => {
            const msgSB = new common_1.ScoreboardUpdateMessage(context.scoreboard.scoreboard);
            context.send(msgSB);
            const msg = new common_2.PlayerKilledMessage(value, undefined);
            context.send(msg);
            if (!value.silentRemove) {
                const inventoryLoot = value.inventory;
                const fittingLoot = value.fitting.fitting.reduce((acc, cur) => {
                    if (cur.name !== "Empty") {
                        const inventory = new common_3.Inventory(cur.name);
                        inventory.amount = 1;
                        acc.push(inventory);
                    }
                    return acc;
                }, []);
                const inventory = inventoryLoot.concat(fittingLoot).reduce((acc, cur) => {
                    let loot = acc.find((l) => l.name === cur.name);
                    if (loot === undefined) {
                        loot = new common_3.Inventory(cur.name);
                        acc.push(loot);
                    }
                    loot.amount += cur.amount;
                    return acc;
                }, []);
                const lootStructure = new StructureLootEntity_1.StructureLootEntity(value.position.x, value.position.y, inventory);
                lootStructure.id = '' + context.getUniqueId();
                lootStructure.info = value.id;
                lootStructure.timestampSpawnMs = now;
                context.structures.push(lootStructure);
                const loot = new common_4.StructureSpawnMessage(lootStructure);
                context.send(loot);
            }
            context.players.forEach(value1 => {
                if (value1.targetPlayer !== undefined && value1.targetPlayer.id === value.id)
                    value1.targetPlayer = undefined;
            });
            const index = context.players.findIndex(value1 => value1.id === value.id);
            context.players[index].onDestroy();
            context.players.splice(index, 1);
        });
    }
    static gcProjectile(context) {
        // Projectiles
        const removeProjectiles = [];
        context.projectiles.forEach(value => {
            if (value.timeToLife <= 0)
                removeProjectiles.push(value);
        });
        removeProjectiles.forEach(value => {
            const index = context.projectiles.findIndex(value1 => value1.id === value.id);
            context.projectiles[index].onDestroy();
            context.projectiles.splice(index, 1);
            const msg = new common_5.ProjectileDestroyMessage(value);
            context.send(msg);
        });
    }
    static gcStructure(context) {
        const now = new Date().getTime();
        // Structures
        const removeStructures = [];
        context.structures.forEach((structure) => {
            if (structure.destroy)
                removeStructures.push(structure);
            else if (!structure.isStatic) {
                const spawnTime = structure.timestampSpawnMs ? structure.timestampSpawnMs : 0;
                const timeSinceSpawn = now - spawnTime;
                if (timeSinceSpawn > structure.maxIdleTimeMs) {
                    removeStructures.push(structure);
                }
            }
        });
        removeStructures.forEach(value => {
            const index = context.structures.findIndex(value1 => value1.id === value.id);
            context.structures[index].onDestroy();
            context.structures.splice(index, 1);
            context.players.forEach((player) => {
                if (player.targetStructure !== undefined && player.targetStructure.id === value.id) {
                    player.targetStructure = undefined;
                    player.actionUseStructure = false;
                }
            });
            const msg = new common_6.StructureDestroyMessage(value);
            context.send(msg);
        });
    }
    static gcSkill(context) {
        // Skills
        const removeSkills = [];
        context.skills.forEach((skill) => {
            if (skill.remainingTime < 0)
                removeSkills.push(skill);
        });
        removeSkills.forEach(value => {
            const index = context.skills.findIndex(value1 => value1.id === value.id);
            context.skills[index].onDestroy();
            context.skills.splice(index, 1);
        });
    }
}
exports.GarbageCollector = GarbageCollector;


/***/ }),

/***/ "./libs/game-logic/src/lib/core/Scoreboard.ts":
/*!****************************************************!*\
  !*** ./libs/game-logic/src/lib/core/Scoreboard.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Scoreboard = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class Scoreboard {
    constructor() {
        this.scoreboard = [];
    }
    addKill(name) {
        let score = this.scoreboard.find((sb) => sb.name === name);
        if (score === undefined) {
            score = new common_1.ScoreboardEntry(name, 0);
            this.scoreboard.push(score);
        }
        score.kills++;
    }
    depositLoot(name, loot) {
        let score = this.scoreboard.find((sb) => sb.name === name);
        if (score === undefined) {
            score = new common_1.ScoreboardEntry(name, 0);
            this.scoreboard.push(score);
        }
        loot.forEach((l) => {
            score.kills += l.amount;
        });
    }
}
exports.Scoreboard = Scoreboard;


/***/ }),

/***/ "./libs/game-logic/src/lib/core/Spawner.ts":
/*!*************************************************!*\
  !*** ./libs/game-logic/src/lib/core/Spawner.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Spawner = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class Spawner {
    constructor(boundry) {
        this.boundry = boundry;
    }
    spawnPosition(spaceship) {
        if (spaceship.position === undefined || spaceship.position === null)
            this.spawnRandom(spaceship);
    }
    spawnRandom(spaceship) {
        const spawnArea = this.getSpawnArea(this.boundry);
        const spawn = this.getSpawnPosition(spawnArea);
        spaceship.position = spawn.pos;
        spaceship.rotation = spawn.rotation;
        if (!spaceship.isNPC)
            spaceship.timestampLastActionMs = new Date().getTime();
    }
    getSpawnArea(boundries) {
        return {
            x1: {
                x: -600,
                y: 200,
            },
            x2: {
                x: -200,
                y: 400,
            }
        };
    }
    getSpawnPosition(boundries, index) {
        let xRand = Math.random();
        let yRand = Math.random();
        const center = {
            x: boundries.x1.x + (boundries.x2.x - boundries.x1.x) / 2,
            y: boundries.x1.y + (boundries.x2.y - boundries.x1.y) / 2
        };
        const pos = {
            x: boundries.x1.x + Math.floor(xRand * Math.floor(boundries.x2.x - boundries.x1.x)),
            y: boundries.x1.y + Math.floor(yRand * Math.floor(boundries.x2.y - boundries.x1.y)),
        };
        const angle = common_1.CMath.angle(common_1.CMath.sub(center, pos), { x: 0, y: 1 });
        return {
            pos: pos,
            rotation: angle
        };
    }
}
exports.Spawner = Spawner;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityBattery.ts":
/*!****************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntityBattery.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntityBattery = void 0;
const ShipEquipmentEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentEntity.ts");
class EquipmentEntityBattery extends ShipEquipmentEntity_1.ShipEquipmentEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
        this.bonusRate = 0.6;
    }
    onInit(parent) {
        super.onInit(parent);
        parent.energyRechargeRate *= (1 + this.bonusRate);
    }
    iterate(parent, delta) { }
}
exports.EquipmentEntityBattery = EquipmentEntityBattery;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityEmpty.ts":
/*!**************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntityEmpty.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntityEmpty = void 0;
const ShipEquipmentEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentEntity.ts");
class EquipmentEntityEmpty extends ShipEquipmentEntity_1.ShipEquipmentEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    iterate(parent, delta) {
    }
    onStartEquipment(parent) {
    }
    onEndEquipment(parent) {
    }
}
exports.EquipmentEntityEmpty = EquipmentEntityEmpty;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityLaser.ts":
/*!**************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntityLaser.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntityLaser = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const math = __webpack_require__(/*! mathjs */ "mathjs");
const EventManager_1 = __webpack_require__(/*! ../../EventManager */ "./libs/game-logic/src/lib/EventManager.ts");
const ProjectileEntity_1 = __webpack_require__(/*! ../../model/ProjectileEntity */ "./libs/game-logic/src/lib/model/ProjectileEntity.ts");
const ShipEquipmentTargetEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentTargetEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentTargetEntity.ts");
class EquipmentEntityLaser extends ShipEquipmentTargetEntity_1.ShipEquipmentTargetEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
        this.maxOmega = 0.4;
        this.maxAimAngle = 0.2;
        this.damage = 5;
        this.range = 400;
    }
    iterate(parent, delta) {
        super.iterate(parent, delta);
        if (parent.targetPlayer !== undefined) {
            this.alignCannon(parent, delta);
        }
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
        this.shoot(parent);
    }
    isTargetInRange(parent) {
        const targetVector = common_1.CMath.sub(parent.targetPlayer.position, parent.position);
        const len = common_1.CMath.len(targetVector);
        const angle = common_1.CMath.angle(targetVector, this.getOrientation(parent));
        return math.abs(angle) < this.maxAimAngle && len < this.range;
    }
    alignCannon(parent, delta) {
        const targetVector = common_1.CMath.sub(parent.targetPlayer.position, parent.position);
        let omega = common_1.CMath.angle(targetVector, this.getOrientation(parent)) / delta;
        if (math.abs(omega) > this.maxOmega)
            omega = math.sign(omega) * this.maxOmega;
        this.state.rotation += omega * delta;
    }
    shoot(parent) {
        const targetVector = common_1.CMath.sub(parent.targetPlayer.position, parent.position);
        const angle = common_1.CMath.angle(targetVector, this.getOrientation(parent));
        const start = {
            x: parent.position.x,
            y: parent.position.y
        };
        let end = {
            x: parent.targetPlayer.position.x,
            y: parent.targetPlayer.position.y
        };
        const v = common_1.CMath.sub(end, start);
        const length = math.norm([v.x, v.y]);
        parent.targetPlayer.health -= this.damage;
        parent.targetPlayer.lastHitBy = parent;
        const proj = new ProjectileEntity_1.ProjectileEntity(undefined, parent, parent.targetPlayer);
        EventManager_1.EventManager.shootProjectile.emit("shootProjectile", { projectile: proj });
    }
    getOrientation(parent) {
        return common_1.CMath.rotate({ x: 0, y: 1 }, this.state.rotation);
    }
}
exports.EquipmentEntityLaser = EquipmentEntityLaser;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityMass.ts":
/*!*************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntityMass.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntityMass = void 0;
const ShipEquipmentEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentEntity.ts");
class EquipmentEntityMass extends ShipEquipmentEntity_1.ShipEquipmentEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
        this.bonusRate = 0.6;
    }
    onInit(parent) {
        super.onInit(parent);
        parent.mass = 1.5;
    }
    iterate(parent, delta) { }
}
exports.EquipmentEntityMass = EquipmentEntityMass;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityNosferatu.ts":
/*!******************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntityNosferatu.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntityNosferatu = void 0;
const ShipEquipmentTargetEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentTargetEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentTargetEntity.ts");
class EquipmentEntityNosferatu extends ShipEquipmentTargetEntity_1.ShipEquipmentTargetEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
        this.drain = 40;
        this.gain = 20;
        this.range = 150;
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
        parent.targetPlayer.power -= this.drain;
    }
    onEndEquipment(parent) {
        super.onEndEquipment(parent);
        parent.power += this.gain;
    }
    isTargetInRange(parent) {
        //return parent.targetPlayer.power > this.drain && super.isTargetInRange(parent);
        return super.isTargetInRange(parent);
    }
}
exports.EquipmentEntityNosferatu = EquipmentEntityNosferatu;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityRepair.ts":
/*!***************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntityRepair.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntityRepair = void 0;
const ShipEquipmentEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentEntity.ts");
class EquipmentEntityRepair extends ShipEquipmentEntity_1.ShipEquipmentEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
        this.repairAmount = 30;
        this.powerCost = 1;
    }
    onEndEquipment(parent) {
        super.onEndEquipment(parent);
        parent.health += this.repairAmount;
    }
}
exports.EquipmentEntityRepair = EquipmentEntityRepair;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityRocketLauncher.ts":
/*!***********************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntityRocketLauncher.ts ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntityRocketLauncher = void 0;
const EventManager_1 = __webpack_require__(/*! ../../EventManager */ "./libs/game-logic/src/lib/EventManager.ts");
const ProjectileRocket_1 = __webpack_require__(/*! ../projectiles/ProjectileRocket */ "./libs/game-logic/src/lib/entity/projectiles/ProjectileRocket.ts");
const ShipEquipmentTargetEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentTargetEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentTargetEntity.ts");
class EquipmentEntityRocketLauncher extends ShipEquipmentTargetEntity_1.ShipEquipmentTargetEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
        const proj = new ProjectileRocket_1.ProjectileRocket(undefined, parent, parent.targetPlayer);
        EventManager_1.EventManager.shootProjectile.emit("shootProjectile", { projectile: proj });
    }
    isTargetInRange(parent) {
        return true;
    }
}
exports.EquipmentEntityRocketLauncher = EquipmentEntityRocketLauncher;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntitySpeedBooster.ts":
/*!*********************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntitySpeedBooster.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntitySpeedBooster = void 0;
const ShipEquipmentEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentEntity.ts");
class EquipmentEntitySpeedBooster extends ShipEquipmentEntity_1.ShipEquipmentEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
        this.absoluteChange = 0;
        this.bonus = 0.4;
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
        this.absoluteChange = parent.maxSpeed * this.bonus;
        parent.maxSpeed += this.absoluteChange;
    }
    onEndEquipment(parent) {
        super.onEndEquipment(parent);
        parent.maxSpeed -= this.absoluteChange;
        this.absoluteChange = 0;
    }
}
exports.EquipmentEntitySpeedBooster = EquipmentEntitySpeedBooster;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityWebber.ts":
/*!***************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/equipment/EquipmentEntityWebber.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentEntityWebber = void 0;
const ShipEquipmentTargetEntity_1 = __webpack_require__(/*! ../../model/ShipEquipmentTargetEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentTargetEntity.ts");
class EquipmentEntityWebber extends ShipEquipmentTargetEntity_1.ShipEquipmentTargetEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
        this.absoluteChange = 0;
        this.bonus = 0.4;
        this.range = 250;
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
        this.targetPlayer = parent.targetPlayer;
        this.absoluteChange = this.targetPlayer.maxSpeed * this.bonus;
        this.targetPlayer.maxSpeed -= this.absoluteChange;
    }
    onEndEquipment(parent) {
        super.onEndEquipment(parent);
        if (this.targetPlayer !== undefined) {
            this.targetPlayer.maxSpeed += this.absoluteChange;
            this.absoluteChange = 0.0;
            this.targetPlayer = undefined;
        }
    }
}
exports.EquipmentEntityWebber = EquipmentEntityWebber;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerDebugMessage.ts":
/*!**********************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerDebugMessage.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerDebugMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
const MovementGoalIdle_1 = __webpack_require__(/*! ../movement/MovementGoalIdle */ "./libs/game-logic/src/lib/entity/movement/MovementGoalIdle.ts");
class ServerDebugMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        context.players.forEach((player) => {
            player.speed = { x: 0, y: 0 };
            player.movementGoal = new MovementGoalIdle_1.MovementGoalIdle();
        });
    }
}
exports.ServerDebugMessage = ServerDebugMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerEnemySpawnMessage.ts":
/*!***************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerEnemySpawnMessage.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerEnemySpawnMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const SpaceshipEntity_1 = __webpack_require__(/*! ../../model/SpaceshipEntity */ "./libs/game-logic/src/lib/model/SpaceshipEntity.ts");
const common_2 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const MovementGoalIdle_1 = __webpack_require__(/*! ../movement/MovementGoalIdle */ "./libs/game-logic/src/lib/entity/movement/MovementGoalIdle.ts");
const common_3 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_4 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const Spawner_1 = __webpack_require__(/*! ../../core/Spawner */ "./libs/game-logic/src/lib/core/Spawner.ts");
class ServerEnemySpawnMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const sp = new common_1.Spaceship("Enemy", common_4.getRandomColor());
        const player = new SpaceshipEntity_1.SpaceshipEntity(sp);
        player.isNPC = true;
        new Spawner_1.Spawner(context.boundries).spawnRandom(player);
        player.movementGoal = new MovementGoalIdle_1.MovementGoalIdle();
        //player.movementGoal = new MovementGoalFreeFly();
        player.fitting = new common_2.ShipFitting();
        const eq = new common_3.ShipEquipment("Loot", 3, 0, 0, 1, true, {});
        player.fitting.fitting.push(eq);
        player.onInit();
        context.players.push(player);
    }
}
exports.ServerEnemySpawnMessage = ServerEnemySpawnMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerLobbyQueryMessage.ts":
/*!***************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerLobbyQueryMessage.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerLobbyQueryMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_2 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_3 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_4 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_5 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class ServerLobbyQueryMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        context.players.forEach((player) => {
            const resmsg = new common_1.PlayerJoinedMessage(player);
            context.send(resmsg);
        });
        context.projectiles.forEach((proj) => {
            const resmsg1 = new common_2.ProjectileSpawnMessage(proj, proj.source.id, proj.target.id);
            context.send(resmsg1);
        });
        context.structures.forEach((structure) => {
            const resmsg2 = new common_3.StructureSpawnMessage(structure);
            context.send(resmsg2);
        });
        const ansmsg = new common_4.ScoreboardUpdateMessage(context.scoreboard.scoreboard);
        context.send(ansmsg);
        const boundryMsg = new common_5.BoundryUpdateMessage(context.boundries);
        context.send(boundryMsg);
    }
}
exports.ServerLobbyQueryMessage = ServerLobbyQueryMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerPlayerActionMessage.ts":
/*!*****************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerPlayerActionMessage.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPlayerActionMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
class ServerPlayerActionMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const player = context.getPlayer(this.message.source);
        if (player === undefined) {
            console.error("Action from unkown user", this.message);
            return;
        }
        let res;
        if (this.message.skillIndex >= player.fitting.fitting.length) {
            console.log("skill not available");
            return;
        }
        const shipEquipment = player.fitting.fitting[this.message.skillIndex];
        if (shipEquipment.name !== "Empty")
            shipEquipment.state.pendingState = !shipEquipment.state.pendingState;
    }
}
exports.ServerPlayerActionMessage = ServerPlayerActionMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerPlayerJoinedMessage.ts":
/*!*****************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerPlayerJoinedMessage.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPlayerJoinedMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_2 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const SpaceshipEntity_1 = __webpack_require__(/*! ../../model/SpaceshipEntity */ "./libs/game-logic/src/lib/model/SpaceshipEntity.ts");
const common_3 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const EquipmentDeserializer_1 = __webpack_require__(/*! ../../serialize/EquipmentDeserializer */ "./libs/game-logic/src/lib/serialize/EquipmentDeserializer.ts");
const Spawner_1 = __webpack_require__(/*! ../../core/Spawner */ "./libs/game-logic/src/lib/core/Spawner.ts");
const common_4 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class ServerPlayerJoinedMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        let player = context.players.find((p) => p.id === this.message.source);
        if (player === undefined) {
            const sp = new common_2.Spaceship(this.message.source, common_4.getRandomColor());
            player = new SpaceshipEntity_1.SpaceshipEntity(sp);
            player.fitting = new common_3.ShipFitting();
            player.fitting.fitting = this.message.fitting.fitting.map((fit) => {
                const eq = EquipmentDeserializer_1.EquipmentDeserializer.deserialize(fit);
                eq.onInit(player);
                return eq;
            });
            new Spawner_1.Spawner(context.boundries).spawnRandom(player);
            player.onInit();
            context.players.push(player);
        }
        const resmsg = new common_1.PlayerJoinedMessage(player);
        context.send(resmsg);
    }
}
exports.ServerPlayerJoinedMessage = ServerPlayerJoinedMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerPlayerMoveToMessage.ts":
/*!*****************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerPlayerMoveToMessage.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPlayerMoveToMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const MovementGoalAlignTo_1 = __webpack_require__(/*! ../movement/MovementGoalAlignTo */ "./libs/game-logic/src/lib/entity/movement/MovementGoalAlignTo.ts");
class ServerPlayerMoveToMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const player = context.getPlayer(this.message.source);
        if (player !== undefined) {
            const dir = common_1.CMath.sub(this.message.position, player.position);
            const reqAngle = common_1.CMath.angle(dir, { x: 0, y: 1 });
            player.movementGoal = new MovementGoalAlignTo_1.MovementGoalAlignTo(reqAngle);
        }
    }
}
exports.ServerPlayerMoveToMessage = ServerPlayerMoveToMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerPlayerOrbitMessage.ts":
/*!****************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerPlayerOrbitMessage.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPlayerOrbitMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
class ServerPlayerOrbitMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const player = context.getPlayer(this.message.source);
        if (player !== undefined) {
            const target = context.getPlayer(this.message.target);
            if (target !== undefined) {
                player.targetPlayer = target;
                player.actionOrbitTarget = true;
            }
        }
    }
}
exports.ServerPlayerOrbitMessage = ServerPlayerOrbitMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerPlayerSelfKillMessage.ts":
/*!*******************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerPlayerSelfKillMessage.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPlayerSelfKillMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
class ServerPlayerSelfKillMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const player = context.getPlayer(this.message.source);
        if (player !== undefined) {
            player.health = 0;
        }
    }
}
exports.ServerPlayerSelfKillMessage = ServerPlayerSelfKillMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/message/ServerPlayerStructureMessage.ts":
/*!********************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/message/ServerPlayerStructureMessage.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPlayerStructureMessage = void 0;
const ServerMessageRecieved_1 = __webpack_require__(/*! ../../model/ServerMessageRecieved */ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts");
const MovementGoalUseStructure_1 = __webpack_require__(/*! ../movement/MovementGoalUseStructure */ "./libs/game-logic/src/lib/entity/movement/MovementGoalUseStructure.ts");
class ServerPlayerStructureMessage extends ServerMessageRecieved_1.ServerMessageRecieved {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const player = context.getPlayer(this.message.source);
        const structure = context.structures.find((structure) => {
            return structure.id === this.message.structureId;
        });
        if (player !== undefined && structure !== undefined) {
            player.movementGoal = new MovementGoalUseStructure_1.MovementGoalUseStructure(structure);
        }
    }
}
exports.ServerPlayerStructureMessage = ServerPlayerStructureMessage;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/movement/MovementGoalAlignTo.ts":
/*!************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/movement/MovementGoalAlignTo.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementGoalAlignTo = void 0;
const MovementGoal_1 = __webpack_require__(/*! ../../model/MovementGoal */ "./libs/game-logic/src/lib/model/MovementGoal.ts");
const MovementGoalFreeFly_1 = __webpack_require__(/*! ./MovementGoalFreeFly */ "./libs/game-logic/src/lib/entity/movement/MovementGoalFreeFly.ts");
const math = __webpack_require__(/*! mathjs */ "mathjs");
class MovementGoalAlignTo extends MovementGoal_1.MovementGoal {
    constructor(reqAngle) {
        super();
        this.reqAngle = reqAngle;
    }
    iterate(player, deltaTime) {
        let deltaAngle = player.rotation - this.reqAngle;
        if (this.isAligned(player, this.reqAngle)) {
            player.movementGoal = new MovementGoalFreeFly_1.MovementGoalFreeFly();
        }
        deltaAngle = MovementGoalAlignTo.capOmega(deltaAngle, player.maxOmega, deltaTime);
        return {
            a: {
                x: 1,
                y: 0
            },
            r: deltaAngle,
            vCap: 1
        };
    }
    static capOmega(angle, maxOmega, deltaTime) {
        let deltaAngle = angle;
        if (deltaAngle > Math.PI) {
        }
        else {
            deltaAngle *= -1;
        }
        if (math.abs(deltaAngle) > maxOmega * deltaTime) {
            deltaAngle = math.sign(deltaAngle) * maxOmega;
        }
        return deltaAngle;
    }
}
exports.MovementGoalAlignTo = MovementGoalAlignTo;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/movement/MovementGoalFreeFly.ts":
/*!************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/movement/MovementGoalFreeFly.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementGoalFreeFly = void 0;
const MovementGoal_1 = __webpack_require__(/*! ../../model/MovementGoal */ "./libs/game-logic/src/lib/model/MovementGoal.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class MovementGoalFreeFly extends MovementGoal_1.MovementGoal {
    constructor() {
        super();
    }
    iterate(player, delta) {
        const dir = common_1.CMath.rotate({ x: 0, y: 1 }, player.rotation);
        return {
            r: 0,
            a: {
                x: dir.x * player.acceleration,
                y: dir.y * player.acceleration
            },
            vCap: 1
        };
    }
}
exports.MovementGoalFreeFly = MovementGoalFreeFly;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/movement/MovementGoalIdle.ts":
/*!*********************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/movement/MovementGoalIdle.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementGoalIdle = void 0;
const MovementGoal_1 = __webpack_require__(/*! ../../model/MovementGoal */ "./libs/game-logic/src/lib/model/MovementGoal.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class MovementGoalIdle extends MovementGoal_1.MovementGoal {
    constructor() {
        super();
    }
    iterate(player, delta) {
        const dir = common_1.CMath.rotate({ x: 0, y: 1 }, player.rotation);
        return {
            r: 0,
            a: {
                x: 0,
                y: 0
            },
            vCap: 1
        };
    }
}
exports.MovementGoalIdle = MovementGoalIdle;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/movement/MovementGoalUseStructure.ts":
/*!*****************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/movement/MovementGoalUseStructure.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementGoalUseStructure = void 0;
const MovementGoal_1 = __webpack_require__(/*! ../../model/MovementGoal */ "./libs/game-logic/src/lib/model/MovementGoal.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const MovementGoalAlignTo_1 = __webpack_require__(/*! ./MovementGoalAlignTo */ "./libs/game-logic/src/lib/entity/movement/MovementGoalAlignTo.ts");
const MovementGoalIdle_1 = __webpack_require__(/*! ./MovementGoalIdle */ "./libs/game-logic/src/lib/entity/movement/MovementGoalIdle.ts");
class MovementGoalUseStructure extends MovementGoal_1.MovementGoal {
    constructor(structure) {
        super();
        this.structure = structure;
        this.acivationTime = 0;
    }
    iterate(player, delta) {
        if (this.structure === undefined) {
            console.error("structure is already dead", this.structure);
            return undefined;
            /*
            player.movementGoal = new MovementGoalIdle();
            return player.movementGoal.iterate(player, delta);
             */
        }
        const viewDir = common_1.CMath.rotate({ x: 0, y: 1 }, player.rotation);
        // Distance Check
        const distanceToTarget = common_1.CMath.len(common_1.CMath.sub(player.position, this.structure.position));
        if (distanceToTarget < this.structure.activationRange) {
            //console.log("ticking");
            this.acivationTime += delta;
        }
        else {
            this.acivationTime -= delta;
            this.acivationTime = this.acivationTime > 0 ? this.acivationTime : 0;
        }
        player.activationProgress = this.acivationTime / this.structure.activationDuration;
        // Activation Time Check
        if (this.acivationTime > this.structure.activationDuration) {
            this.structure.onActivateStructure(player);
            player.movementGoal = new MovementGoalIdle_1.MovementGoalIdle();
            return player.movementGoal.iterate(player, delta);
        }
        const targetDir = common_1.CMath.sub(this.structure.position, player.position);
        const reqAngle = common_1.CMath.angle(targetDir, { x: 0, y: 1 });
        const deltaAngle = player.rotation - reqAngle;
        const cappedAngle = MovementGoalAlignTo_1.MovementGoalAlignTo.capOmega(deltaAngle, player.maxOmega, delta);
        let bremsweg = (player.curSpeed * player.curSpeed) / (2 * player.acceleration);
        if (distanceToTarget < this.structure.activationRange) {
            const curSpeed = player.curSpeed;
            let bremskraft = {
                x: 0,
                y: 0
            };
            if (curSpeed > 0) {
                bremskraft = {
                    x: -1 * player.speed.x / player.curSpeed,
                    y: -1 * player.speed.y / player.curSpeed
                };
            }
            const f = curSpeed / player.maxSpeed;
            let a = {
                x: (0 + f) * bremskraft.x * player.acceleration,
                y: (0 + f) * bremskraft.y * player.acceleration
            };
            return {
                r: cappedAngle,
                a: a,
                vCap: 1
            };
        }
        else if (distanceToTarget > bremsweg) {
            return {
                r: cappedAngle,
                a: {
                    x: viewDir.x * player.acceleration,
                    y: viewDir.y * player.acceleration
                },
                vCap: 1
            };
        }
        let vCap = distanceToTarget / bremsweg;
        vCap = vCap > 0 ? vCap : 0;
        vCap = vCap <= 1 ? vCap : 1;
        const curSpeed = player.curSpeed;
        let bremskraft = {
            x: 0,
            y: 0
        };
        if (curSpeed > 0) {
            bremskraft = {
                x: -1 * player.speed.x / player.curSpeed,
                y: -1 * player.speed.y / player.curSpeed
            };
        }
        const f = curSpeed / player.maxSpeed;
        let a = {
            x: (0 + f) * bremskraft.x * player.acceleration,
            y: (0 + f) * bremskraft.y * player.acceleration
        };
        return {
            r: cappedAngle,
            a: a,
            vCap: 1
        };
    }
}
exports.MovementGoalUseStructure = MovementGoalUseStructure;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/projectiles/ProjectileRocket.ts":
/*!************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/projectiles/ProjectileRocket.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectileRocket = void 0;
const ProjectileEntity_1 = __webpack_require__(/*! ../../model/ProjectileEntity */ "./libs/game-logic/src/lib/model/ProjectileEntity.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const common_2 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class ProjectileRocket extends ProjectileEntity_1.ProjectileEntity {
    constructor(id, source, target) {
        super(id, source, target);
        this.minDistanceToExplode = 30.0;
        this.maxSpeed = 40;
        this.damage = 10;
        this.flightTime = 15;
        this.type = "rocketProjectile";
        this.duration = 20;
        this.timeToLife = this.flightTime;
    }
    onInit() {
        super.onInit();
        this.position.x = this.source.position.x;
        this.position.y = this.source.position.y;
    }
    iterate(delta) {
        super.iterate(delta);
        /*
            this.speed.x = 10.0;
            this.speed.y = 3.0;
        */
        const distVector = common_2.CMath.sub(this.target.position, this.position);
        const len = common_2.CMath.len(distVector);
        if (len < this.minDistanceToExplode) {
            this.target.health -= this.damage;
            this.target.lastHitBy = this.source;
            this.timeToLife = 0;
            return;
        }
        const dir = common_2.CMath.normalize(distVector);
        const orient = this.getOrientation(this);
        const angle = common_2.CMath.angle(dir, { x: 1, y: 0 });
        this.rotation = angle;
        this.speed = common_2.CMath.scale(dir, this.maxSpeed);
        common_1.Physics.iterate(this, delta);
    }
    getOrientation(particle) {
        return common_2.CMath.rotate({ x: 1, y: 0 }, particle.rotation);
    }
}
exports.ProjectileRocket = ProjectileRocket;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/structures/StructureLootEntity.ts":
/*!**************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/structures/StructureLootEntity.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureLootEntity = void 0;
const StructureEntity_1 = __webpack_require__(/*! ../../model/StructureEntity */ "./libs/game-logic/src/lib/model/StructureEntity.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class StructureLootEntity extends StructureEntity_1.StructureEntity {
    constructor(x, y, inventory) {
        super(x, y);
        this.inventory = inventory;
        this.type = "Loot";
        this.activationRange = 20;
    }
    onActivateStructure(user) {
        super.onActivateStructure(user);
        user.inventory = this.inventory.reduce((acc, cur) => {
            let loot = acc.find((l) => l.name === cur.name);
            if (loot === undefined) {
                loot = new common_1.Inventory(cur.name);
                acc.push(loot);
            }
            loot.amount += cur.amount;
            return acc;
        }, user.inventory);
        this.destroy = true;
    }
}
exports.StructureLootEntity = StructureLootEntity;


/***/ }),

/***/ "./libs/game-logic/src/lib/entity/structures/StructurePortalEntity.ts":
/*!****************************************************************************!*\
  !*** ./libs/game-logic/src/lib/entity/structures/StructurePortalEntity.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StructurePortalEntity = void 0;
const StructureEntity_1 = __webpack_require__(/*! ../../model/StructureEntity */ "./libs/game-logic/src/lib/model/StructureEntity.ts");
class StructurePortalEntity extends StructureEntity_1.StructureEntity {
    constructor(x, y, scoreboard) {
        super(x, y);
        this.scoreboard = scoreboard;
        this.type = "Portal";
        this.activationRange = 30;
        this.activationDuration = 30;
        this.isStatic = true;
    }
    onActivateStructure(user) {
        super.onActivateStructure(user);
        user.lastHitBy = user;
        user.health = 0;
        user.silentRemove = true;
        this.scoreboard.depositLoot(user.id, user.inventory);
    }
}
exports.StructurePortalEntity = StructurePortalEntity;


/***/ }),

/***/ "./libs/game-logic/src/lib/model/MovementGoal.ts":
/*!*******************************************************!*\
  !*** ./libs/game-logic/src/lib/model/MovementGoal.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementGoal = void 0;
const math = __webpack_require__(/*! mathjs */ "mathjs");
const MovementGoalFreeFly_1 = __webpack_require__(/*! ../entity/movement/MovementGoalFreeFly */ "./libs/game-logic/src/lib/entity/movement/MovementGoalFreeFly.ts");
class MovementGoal {
    constructor() {
    }
    isAligned(player, targetAngle) {
        let deltaAngle = player.rotation - targetAngle;
        if (math.abs(deltaAngle) < (5 * Math.PI / 180) || math.abs(deltaAngle) > (355 * Math.PI / 180)) {
            player.movementGoal = new MovementGoalFreeFly_1.MovementGoalFreeFly();
            return true;
        }
        return false;
    }
    iterate(player, delta) {
        return {
            a: {
                x: 0,
                y: 0
            },
            r: 0,
            vCap: 1
        };
    }
}
exports.MovementGoal = MovementGoal;


/***/ }),

/***/ "./libs/game-logic/src/lib/model/ProjectileEntity.ts":
/*!***********************************************************!*\
  !*** ./libs/game-logic/src/lib/model/ProjectileEntity.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectileEntity = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class ProjectileEntity extends common_1.Projectile {
    constructor(id, source, target) {
        super(id, source.color);
        this.source = source;
        this.target = target;
    }
    iterate(delta) {
        super.iterate(delta);
    }
}
exports.ProjectileEntity = ProjectileEntity;


/***/ }),

/***/ "./libs/game-logic/src/lib/model/ServerMessageRecieved.ts":
/*!****************************************************************!*\
  !*** ./libs/game-logic/src/lib/model/ServerMessageRecieved.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerMessageRecieved = void 0;
class ServerMessageRecieved {
    constructor(message) {
        this.message = message;
    }
    onRecieve(context) {
    }
}
exports.ServerMessageRecieved = ServerMessageRecieved;


/***/ }),

/***/ "./libs/game-logic/src/lib/model/ShipEquipmentEntity.ts":
/*!**************************************************************!*\
  !*** ./libs/game-logic/src/lib/model/ShipEquipmentEntity.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEquipmentEntity = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class ShipEquipmentEntity extends common_1.ShipEquipment {
    constructor(shipEquipment) {
        super(shipEquipment.name, shipEquipment.tier, shipEquipment.cpuCost, shipEquipment.powerCost, shipEquipment.cycleTime, shipEquipment.passive, shipEquipment.action);
        this.alreadyApplied = false;
        this.alreadyRemoved = false;
    }
    iterate(parent, delta) {
        if (this.passive)
            return;
        super.iterate(parent, delta);
        if (this.isOnCooldown())
            return;
        if (this.state.active === false && this.state.pendingState === false) {
            return;
        }
        //    this.state.active = this.state.pendingState;
        this.onUpdateEquipment(parent, delta);
    }
    onStartEquipment(parent) {
        this.state.active = true;
    }
    onUpdateEquipment(parent, delta) {
        if (this.state.active === false && this.state.pendingState === true) {
            if (!this.canAfford(parent, delta)) {
                return;
            }
            this.payPower(parent);
            this.onStartEquipment(parent);
        }
        else if (this.state.active === true && this.state.pendingState === false) {
            this.onEndEquipment(parent);
        }
        else if (this.state.active === true && this.state.pendingState === true) {
            this.onEndEquipment(parent);
            if (!this.canAfford(parent, delta)) {
                return;
            }
            this.payPower(parent);
            this.onStartEquipment(parent);
        }
        /*
            if (this.state.active && !this.alreadyApplied) {
              if (!this.canAfford(parent, delta)) {
                this.state.active = false;
                this.state.pendingState = false;
                return;
              }
        
              // First start
        
              this.alreadyApplied = true;
              this.alreadyRemoved = false;
        
              //this.payPower(parent);
              //this.remainingTime = this.cycleTime;
              this.onStartEquipment(parent);
            } else if ( this.state.active && this.alreadyApplied) {
              // Reapply
        
              this.onEndEquipment(parent);
        
              if (!this.canAfford(parent, delta)) {
                this.state.active = false;
                this.state.pendingState = false;
                return;
              }
        
              this.alreadyRemoved = false;
        
              //this.payPower(parent);
              //this.remainingTime = this.cycleTime;
              this.onStartEquipment(parent);
        
            } else if ( !this.state.active) {
              this.alreadyRemoved = true;
              this.alreadyApplied = false;
              this.onEndEquipment(parent);
            }
        
         */
    }
    onEndEquipment(parent) {
        this.state.active = false;
    }
    payPower(parent) {
        parent.power -= this.powerCost;
        this.remainingTime = this.cycleTime;
    }
    canAfford(parent, delta) {
        const price = this.powerCost;
        return parent.power >= price;
    }
    isOnCooldown() {
        return this.remainingTime > 0;
    }
    onDestroy(parent) {
        super.onDestroy(parent);
        if (this.state.active) {
            this.onEndEquipment(parent);
        }
    }
}
exports.ShipEquipmentEntity = ShipEquipmentEntity;


/***/ }),

/***/ "./libs/game-logic/src/lib/model/ShipEquipmentTargetEntity.ts":
/*!********************************************************************!*\
  !*** ./libs/game-logic/src/lib/model/ShipEquipmentTargetEntity.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEquipmentTargetEntity = void 0;
const ShipEquipmentEntity_1 = __webpack_require__(/*! ./ShipEquipmentEntity */ "./libs/game-logic/src/lib/model/ShipEquipmentEntity.ts");
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class ShipEquipmentTargetEntity extends ShipEquipmentEntity_1.ShipEquipmentEntity {
    constructor(shipEquipment) {
        super(shipEquipment);
        this.range = 180;
        this.wasInRange = false;
        this.wasOutOfRange = false;
    }
    iterate(parent, delta) {
        super.iterate(parent, delta);
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
    }
    onUpdateEquipment(parent, delta) {
        if (!this.hasTarget(parent)) {
            this.state.pendingState = false;
            super.onUpdateEquipment(parent, delta);
            return;
        }
        if (this.state.pendingState === true && !this.isTargetInRange(parent)) {
            if (this.state.active)
                this.onEndEquipment(parent);
        }
        else {
            super.onUpdateEquipment(parent, delta);
        }
    }
    hasTarget(parent) {
        return parent.targetPlayer !== undefined;
    }
    isTargetInRange(parent) {
        const len = common_1.CMath.len(common_1.CMath.sub(parent.position, parent.targetPlayer.position));
        return len < this.range;
    }
}
exports.ShipEquipmentTargetEntity = ShipEquipmentTargetEntity;


/***/ }),

/***/ "./libs/game-logic/src/lib/model/SpaceshipEntity.ts":
/*!**********************************************************!*\
  !*** ./libs/game-logic/src/lib/model/SpaceshipEntity.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceshipEntity = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const game_engine_1 = __webpack_require__(/*! @orbitweb/game-engine */ "./libs/game-engine/src/index.ts");
const common_2 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
const MovementGoalFreeFly_1 = __webpack_require__(/*! ../entity/movement/MovementGoalFreeFly */ "./libs/game-logic/src/lib/entity/movement/MovementGoalFreeFly.ts");
class SpaceshipEntity extends common_1.Spaceship {
    constructor(spaceship) {
        super(spaceship.id, spaceship.color);
        this.activationTime = 0;
        this.silentRemove = false;
        this.movementGoal = new MovementGoalFreeFly_1.MovementGoalFreeFly();
        this.physics = new game_engine_1.HybridPhysics();
    }
    get curSpeed() {
        return common_2.CMath.len(this.speed);
    }
    iterate(delta) {
        //this.physics.iterate(this, delta);
        this.activationProgress = 0;
        const input = this.movementGoal.iterate(this, delta);
        this.accel = input.a;
        this.omega = input.r;
        if (this.curSpeed > input.vCap * this.maxSpeed) {
            this.speed.x = this.speed.x * input.vCap * this.maxSpeed / this.curSpeed;
            this.speed.y = this.speed.y * input.vCap * this.maxSpeed / this.curSpeed;
        }
        this.iterateStructure(delta);
        this.power += this.energyRechargeRate * delta;
        this.power = this.power <= this.energyCapacity ? this.power : this.energyCapacity;
        this.health = this.health <= this.maxHealth ? this.health : this.maxHealth;
        this.fitting.fitting.forEach((eq) => {
            eq.iterate(this, delta);
        });
    }
    iterateStructure(delta) {
        if (this.actionUseStructure === true) {
            if (this.targetStructure === undefined)
                return;
            const dir = common_2.CMath.sub(this.position, this.targetStructure.position);
            if (common_2.CMath.len(dir) < this.targetStructure.activationRange) {
                this.activationTime += delta;
            }
            else {
                this.activationTime = 0;
            }
            if (this.activationTime > this.targetStructure.activationDuration) {
                this.targetStructure.onActivateStructure(this);
            }
        }
        else {
            this.activationTime = 0;
        }
    }
}
exports.SpaceshipEntity = SpaceshipEntity;


/***/ }),

/***/ "./libs/game-logic/src/lib/model/StructureEntity.ts":
/*!**********************************************************!*\
  !*** ./libs/game-logic/src/lib/model/StructureEntity.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureEntity = void 0;
const common_1 = __webpack_require__(/*! @orbitweb/common */ "./libs/common/src/index.ts");
class StructureEntity extends common_1.Structure {
    constructor(x, y) {
        super(x, y);
        this.destroy = false;
    }
    onActivateStructure(user) {
    }
    onDestroy() {
    }
}
exports.StructureEntity = StructureEntity;


/***/ }),

/***/ "./libs/game-logic/src/lib/serialize/EquipmentDeserializer.ts":
/*!********************************************************************!*\
  !*** ./libs/game-logic/src/lib/serialize/EquipmentDeserializer.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentDeserializer = void 0;
const EquipmentEntityLaser_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntityLaser */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityLaser.ts");
const EquipmentEntitySpeedBooster_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntitySpeedBooster */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntitySpeedBooster.ts");
const EquipmentEntityRocketLauncher_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntityRocketLauncher */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityRocketLauncher.ts");
const EquipmentEntityRepair_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntityRepair */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityRepair.ts");
const EquipmentEntityWebber_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntityWebber */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityWebber.ts");
const EquipmentEntityEmpty_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntityEmpty */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityEmpty.ts");
const EquipmentEntityBattery_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntityBattery */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityBattery.ts");
const EquipmentEntityNosferatu_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntityNosferatu */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityNosferatu.ts");
const EquipmentEntityMass_1 = __webpack_require__(/*! ../entity/equipment/EquipmentEntityMass */ "./libs/game-logic/src/lib/entity/equipment/EquipmentEntityMass.ts");
class EquipmentDeserializer {
    static deserialize(shipEquipment) {
        if (shipEquipment === undefined || shipEquipment === null) {
            return undefined;
        }
        switch (shipEquipment.name) {
            case "Empty": return new EquipmentEntityEmpty_1.EquipmentEntityEmpty(shipEquipment);
            case "Repair": return new EquipmentEntityRepair_1.EquipmentEntityRepair(shipEquipment);
            case "Webber": return new EquipmentEntityWebber_1.EquipmentEntityWebber(shipEquipment);
            case "Laser": return new EquipmentEntityLaser_1.EquipmentEntityLaser(shipEquipment);
            case "Battery": return new EquipmentEntityBattery_1.EquipmentEntityBattery(shipEquipment);
            case "SpeedBooster": return new EquipmentEntitySpeedBooster_1.EquipmentEntitySpeedBooster(shipEquipment);
            case "Nosferatu": return new EquipmentEntityNosferatu_1.EquipmentEntityNosferatu(shipEquipment);
            case "RocketLauncher": return new EquipmentEntityRocketLauncher_1.EquipmentEntityRocketLauncher(shipEquipment);
            case "Mass": return new EquipmentEntityMass_1.EquipmentEntityMass(shipEquipment);
        }
        return undefined;
    }
}
exports.EquipmentDeserializer = EquipmentDeserializer;


/***/ }),

/***/ "./libs/game-logic/src/lib/serialize/MessageDeserializer.ts":
/*!******************************************************************!*\
  !*** ./libs/game-logic/src/lib/serialize/MessageDeserializer.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDeserializer = void 0;
const ServerPlayerJoinedMessage_1 = __webpack_require__(/*! ../entity/message/ServerPlayerJoinedMessage */ "./libs/game-logic/src/lib/entity/message/ServerPlayerJoinedMessage.ts");
const ServerLobbyQueryMessage_1 = __webpack_require__(/*! ../entity/message/ServerLobbyQueryMessage */ "./libs/game-logic/src/lib/entity/message/ServerLobbyQueryMessage.ts");
const ServerPlayerMoveToMessage_1 = __webpack_require__(/*! ../entity/message/ServerPlayerMoveToMessage */ "./libs/game-logic/src/lib/entity/message/ServerPlayerMoveToMessage.ts");
const ServerPlayerOrbitMessage_1 = __webpack_require__(/*! ../entity/message/ServerPlayerOrbitMessage */ "./libs/game-logic/src/lib/entity/message/ServerPlayerOrbitMessage.ts");
const ServerPlayerActionMessage_1 = __webpack_require__(/*! ../entity/message/ServerPlayerActionMessage */ "./libs/game-logic/src/lib/entity/message/ServerPlayerActionMessage.ts");
const ServerPlayerSelfKillMessage_1 = __webpack_require__(/*! ../entity/message/ServerPlayerSelfKillMessage */ "./libs/game-logic/src/lib/entity/message/ServerPlayerSelfKillMessage.ts");
const ServerPlayerStructureMessage_1 = __webpack_require__(/*! ../entity/message/ServerPlayerStructureMessage */ "./libs/game-logic/src/lib/entity/message/ServerPlayerStructureMessage.ts");
const ServerDebugMessage_1 = __webpack_require__(/*! ../entity/message/ServerDebugMessage */ "./libs/game-logic/src/lib/entity/message/ServerDebugMessage.ts");
class MessageDeserializer {
    static deserialize(msg) {
        switch (msg.type) {
            case "playerLoginMessage":
                return new ServerPlayerJoinedMessage_1.ServerPlayerJoinedMessage(msg);
            case "playerJoinedMessage":
                break;
            case "lobbyQueryMessage":
                return new ServerLobbyQueryMessage_1.ServerLobbyQueryMessage(msg);
            case "playerMoveToMessage":
                return new ServerPlayerMoveToMessage_1.ServerPlayerMoveToMessage(msg);
            case "playerOrbitMessage":
                return new ServerPlayerOrbitMessage_1.ServerPlayerOrbitMessage(msg);
            case "playerActionMessage":
                return new ServerPlayerActionMessage_1.ServerPlayerActionMessage(msg);
            case "playerSelfKillMessage":
                return new ServerPlayerSelfKillMessage_1.ServerPlayerSelfKillMessage(msg);
                break;
            case "playerStructureMessage":
                return new ServerPlayerStructureMessage_1.ServerPlayerStructureMessage(msg);
                break;
            case "debugMessage":
                return new ServerDebugMessage_1.ServerDebugMessage(msg);
                break;
            default:
                console.log("unknown message", msg);
                break;
        }
    }
}
exports.MessageDeserializer = MessageDeserializer;


/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./apps/server/src/main.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/schles/dev/monorepo/orbitweb/apps/server/src/main.ts */"./apps/server/src/main.ts");


/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "mathjs":
/*!*************************!*\
  !*** external "mathjs" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mathjs");

/***/ }),

/***/ "node-gameloop":
/*!********************************!*\
  !*** external "node-gameloop" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-gameloop");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map