(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+lVC":
/*!********************************************************************!*\
  !*** ./apps/client/src/app/game/core/network/websocket.service.ts ***!
  \********************************************************************/
/*! exports provided: WebsocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketService", function() { return WebsocketService; });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ "jifJ");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");



class WebsocketService {
    constructor() {
        //this.port = 49160;
        this.port = 8000;
        this.server_url = 'http://' + document.location.hostname + ':' + this.port;
    }
    initSocket() {
        this.socket = Object(socket_io_client__WEBPACK_IMPORTED_MODULE_0__["io"])(this.server_url);
    }
    send(message) {
        this.socket.emit('message', message);
    }
    onMessage() {
        return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](observer => {
            this.socket.on('message', (data) => observer.next(data));
        });
    }
    onEvent(event) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
WebsocketService.ɵfac = function WebsocketService_Factory(t) { return new (t || WebsocketService)(); };
WebsocketService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: WebsocketService, factory: WebsocketService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "+yq1":
/*!**************************************************!*\
  !*** ./apps/client/src/app/game/core/Emitter.ts ***!
  \**************************************************/
/*! exports provided: Emitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return Emitter; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");


class ParticleEffect extends _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["Particle"] {
    constructor() {
        super(...arguments);
        this.timeToLive = 0;
        this.lifeTime = 2;
    }
}
class Emitter {
    constructor(size) {
        this.particleIterator = 0;
        this.container = new PIXI.ParticleContainer(size, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        this.size = size;
        this.particles = [];
    }
    init() {
        const maggots = [];
        for (let i = 0; i < this.size; i++) {
            const particle = new ParticleEffect();
            particle.sprite = PIXI.Sprite.from("assets/Particle.jpg");
            particle.sprite.tint = Math.random() * 0xE8D4CD;
            // set the anchor point so the texture is centerd on the sprite
            particle.sprite.anchor.set(0.5);
            // different maggots, different sizes
            particle.sprite.scale.set(0.8 + Math.random() * 0.3);
            // scatter them all
            particle.position.x = Math.random() * 500;
            particle.position.y = Math.random() * 500;
            particle.sprite.tint = Math.random() * 0x808080;
            particle.lifeTime = 3;
            particle.timeToLive = 0;
            /*
                  particle.speed = {
                    x: 4,
                    y: 4
                  }
                  */
            /*
      
            // create a random direction in radians
            dude.direction = Math.random() * Math.PI * 2;
      
            // this number will be used to modify the direction of the sprite over time
            dude.turningSpeed = Math.random() - 0.8;
      
            // create a random speed between 0 - 2, and these maggots are slooww
            dude.speed = (2 + Math.random() * 2) * 0.2;
      
            dude.offset = Math.random() * 100;
      */
            // finally we push the dude into the maggots array so it it can be easily accessed later
            this.particles.push(particle);
            this.container.addChild(particle.sprite);
        }
    }
    getContainer() {
        return this.container;
    }
    update(delta) {
        this.particles.forEach(particle => {
            _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["Physics"].iterate(particle, delta);
            particle.timeToLive -= delta;
            if (particle.timeToLive < 0)
                particle.timeToLive = 0;
        });
        this.render();
    }
    render() {
        this.particles.forEach(value => {
            if (value.timeToLive === 0) {
                value.sprite.alpha = 0;
            }
            else {
                value.sprite.alpha = value.timeToLive / value.lifeTime;
            }
            value.sprite.x = value.position.x;
            value.sprite.y = value.position.y;
            value.sprite.rotation = value.rotation;
        });
    }
    emit(sources) {
        sources.forEach((spaceship) => {
            const particle = this.particles[this.particleIterator];
            particle.timeToLive = particle.lifeTime;
            particle.sprite.tint = PIXI.utils.string2hex(spaceship.c);
            particle.position = {
                x: spaceship.p.position.x,
                y: spaceship.p.position.y
            };
            particle.speed = {
                x: -1 * spaceship.p.speed.x,
                y: -1 * spaceship.p.speed.y
            };
            this.particleIterator++;
            if (this.particleIterator >= this.size) {
                this.particleIterator = 0;
            }
        });
    }
}


/***/ }),

/***/ "/MMM":
/*!***********************************************************************!*\
  !*** ./apps/client/src/app/game/renderer/shader/filter/TestFilter.ts ***!
  \***********************************************************************/
/*! exports provided: TestFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestFilter", function() { return TestFilter; });
var Filter = PIXI.Filter;
class TestFilter extends Filter {
    constructor(a, b) {
        super(a, b);
        this.uniforms.sunPosition = [500, 500];
        this.uniforms.playerPosition = [100, 100];
        this.uniforms.viewPort = [100, 100];
        this.uniforms.localToWorld = [];
    }
    setLocalToWorld(mat) {
        this.uniforms.localToWorld = mat;
    }
    setSize(x, y) {
        this.uniforms.viewPort = [x, y];
    }
    iterate(playerPosition, sunPosition, delta, playerIndex) {
        this.uniforms.sunPosition = [sunPosition.x, sunPosition.y];
        this.uniforms.playerPosition = [playerPosition[playerIndex].x, playerPosition[playerIndex].y];
    }
}


/***/ }),

/***/ "/inu":
/*!************************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/movement/PlayerStructureMessage.ts ***!
  \************************************************************************************/
/*! exports provided: PlayerStructureMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerStructureMessage", function() { return PlayerStructureMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../generic/PlayerMessage */ "sYV4");

class PlayerStructureMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(player, structureId) {
        super(player);
        this.structureId = structureId;
        this.type = "playerStructureMessage";
    }
}


/***/ }),

/***/ "/roC":
/*!************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/equipment/EquipmentGORepair.ts ***!
  \************************************************************************/
/*! exports provided: EquipmentGORepair */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentGORepair", function() { return EquipmentGORepair; });
/* harmony import */ var _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ShipEquipmentGO */ "AGC5");

class EquipmentGORepair extends _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentGO"] {
    constructor(shipEquipment) {
        super(shipEquipment);
        /*
        const sprite = PIXI.Sprite.from("assets/ShipATypeB.png");
        sprite.tint = c;
        sprite.x = -12;
        sprite.y = 12;
        sprite.scale.x = 0.1;
        sprite.scale.y = 0.1;
        //sprite.rotation = Math.PI * -2 / 4;
        cannonCont.addChild(sprite);
        */
    }
    onInit(parent) {
        super.onInit(parent);
        this.repairGraphic = this.getGameObject();
        this.repairGraphic.tint = PIXI.utils.string2hex(parent.color);
        parent.gameObject.addChild(this.repairGraphic);
        /*
            this.repairGraphic = new PIXI.Graphics;
            parent.gameObject.addChild(this.repairGraphic);
            this.repairGraphic.lineStyle(2, 0x00FF00);
            this.repairGraphic.drawCircle(0, 0, 20);
            this.repairGraphic.endFill();
            */
    }
    iterate(parent, delta) {
        super.iterate(parent, delta);
        if (this.state.active)
            this.repairGraphic.rotation += 3 * delta;
        /*
            const a = (<AlphaFilter> this.filter).alpha;
        
            let alpha = (a + delta) % 1;
        
            (<AlphaFilter> this.filter).alpha = alpha;
        */
    }
    onDestroy(parent) {
        super.onDestroy(parent);
        parent.gameObject.removeChild(this.repairGraphic);
        this.repairGraphic = undefined;
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
        this.repairGraphic.visible = true;
    }
    onEndEquipment(parent) {
        super.onEndEquipment(parent);
        this.repairGraphic.visible = false;
        //parent.gameObject.filters.splice(0, 0);
    }
    getGameObject() {
        const sprite = PIXI.Sprite.from("assets/Shield.png");
        console.log(sprite);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.scale.x = 0.1;
        sprite.scale.y = 0.1;
        //sprite.rotation = Math.PI * -2 / 4;
        return sprite;
    }
}


/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./apps/client/src/main.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/schles/dev/monorepo/orbitweb/apps/client/src/main.ts */"Zr4m");


/***/ }),

/***/ "0Yt2":
/*!*******************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientPlayerKilledMessage.ts ***!
  \*******************************************************************************/
/*! exports provided: ClientPlayerKilledMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientPlayerKilledMessage", function() { return ClientPlayerKilledMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Events */ "2rDF");


class ClientPlayerKilledMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const deadPlayer = context.players.find(value => value.id === this.message.source);
        if (deadPlayer !== undefined) {
            context.killPlayer(deadPlayer);
            _Events__WEBPACK_IMPORTED_MODULE_1__["Events"].onPlayerKilled.emit(deadPlayer.id);
        }
    }
}


/***/ }),

/***/ "1wUB":
/*!**************************************************!*\
  !*** ./apps/client/src/app/game/SpaceShooter.ts ***!
  \**************************************************/
/*! exports provided: SpaceShooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceShooter", function() { return SpaceShooter; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _core_Emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Emitter */ "+yq1");
/* harmony import */ var _renderer_shader_filter_TestFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderer/shader/filter/TestFilter */ "/MMM");
/* harmony import */ var _model_Sun__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/Sun */ "QIIW");
/* harmony import */ var _renderer_TargetLayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderer/TargetLayer */ "f7wc");
/* harmony import */ var _renderer_shader_filter_bloom_BloomFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderer/shader/filter/bloom/BloomFilter */ "K5WU");
/* harmony import */ var _renderer_shader_filter_shadow_ShadowFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./renderer/shader/filter/shadow/ShadowFilter */ "w9J7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _model_BoundryGO__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./model/BoundryGO */ "U7V3");
/* harmony import */ var _util_AssetLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/AssetLoader */ "TtIU");
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! pixi.js */ "IqKQ");











//import vertex from '../shader/myVertex.vs';
class SpaceShooter extends pixi_js__WEBPACK_IMPORTED_MODULE_10__["Application"] {
    constructor(options) {
        super(options);
        this.OnResizeWindow = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        this.players = [];
        this.projectiles = [];
        this.structures = [];
        this.skills = [];
        this.boot();
    }
    get gameStage() {
        return this._gameStage;
    }
    get playerStage() {
        return this._playerStage;
    }
    get uiStage() {
        return this._uiStage;
    }
    get targetStage() {
        return this._targetStage;
    }
    get structureStage() {
        return this._structureStage;
    }
    setRenderSize(x, y) {
        //this.renderSizePoint.x = x;
        //this.renderSizePoint.y = y;
    }
    boot() {
        console.log("boot");
        this._gameStage = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Container"]();
        this._uiStage = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Container"]();
        this._structureStage = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Container"]();
        this._playerStage = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Container"]();
        this._targetStage = new _renderer_TargetLayer__WEBPACK_IMPORTED_MODULE_4__["TargetLayer"]();
        this.boundry = new _model_BoundryGO__WEBPACK_IMPORTED_MODULE_8__["BoundryGO"]();
        this.stage.addChild(this.gameStage);
        this.stage.addChild(this.uiStage);
        this.gameStage.addChild(this.structureStage);
        this.gameStage.addChild(this.playerStage);
        this.gameStage.addChild(this.targetStage);
        this.gameStage.addChild(this.boundry.gameObject);
        this.emitter = new _core_Emitter__WEBPACK_IMPORTED_MODULE_1__["Emitter"](1000);
        this.emitter.init();
        this.structureStage.addChild(this.emitter.getContainer());
        this.assetLoader = new _util_AssetLoader__WEBPACK_IMPORTED_MODULE_9__["AssetLoader"]();
        this.assetLoader.load(this.loader);
        _util_AssetLoader__WEBPACK_IMPORTED_MODULE_9__["AssetLoader"].onLoaded.subscribe((val) => { this.onLoaded(val.loader, val.res); });
        this.targeting = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Container"]();
        this.targetingLine = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Graphics"]();
        this.targetingLine2 = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Graphics"]();
        this.targetingCircle = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Graphics"]();
        this.targeting.addChild(this.targetingLine);
        this.targeting.addChild(this.targetingLine2);
        this.targeting.addChild(this.targetingCircle);
        this.targetingText = new pixi_js__WEBPACK_IMPORTED_MODULE_10__["Text"]("", { fontFamily: 'Arial', fontSize: 10, fill: 0xff1010, align: 'center' });
        this.targeting.addChild(this.targetingText);
        this.sunGameObject = new _model_Sun__WEBPACK_IMPORTED_MODULE_3__["SunGameObject"](this.gameStage);
    }
    iterateSelf(spaceship, delta) {
        this.targetStage.setSource(spaceship);
        this.targetStage.iterate(delta);
    }
    iterate(dT) {
        const pl = this.players.map((p) => {
            return {
                p: p,
                c: p.color
            };
        }).concat(this.projectiles.map((p) => {
            return {
                p: p,
                c: p.color
            };
        }));
        const res = pl;
        this.emitter.emit(res);
        this.emitter.update(dT);
        // Camera
        // Targeting
        this.renderTargeting();
        this.sunGameObject.iterate(dT);
        this.iterateProjectiles(dT);
        this.iteratePlayer(dT);
        this.iterateStructure(dT);
    }
    iteratePlayer(delta) {
        this.players.forEach(value => {
            value.setCameraCenter(this.depCamera.localCenterPoint);
            value.setMatrix(this.depCamera.getViewMatrix(), this.depCamera.getModelMatrix());
            value.iterate(delta);
            value.fitting.fitting.forEach((fit) => {
                fit.iterate(value, delta);
            });
        });
    }
    iterateProjectiles(delta) {
        this.projectiles.forEach((projectile) => {
            projectile.iterate(delta);
        });
    }
    iterateStructure(delta) {
        this.structures.forEach((structure) => {
            structure.iterate(delta);
        });
    }
    loadShader() {
        //const container = new PIXI.Container();
    }
    onLoaded(loader, res) {
        //    console.log(res);
        const testFilter = new _renderer_shader_filter_TestFilter__WEBPACK_IMPORTED_MODULE_2__["TestFilter"](null, res.shader.data);
        // first is the horizontal shift, positive is to the right
        // second is the same as scaleY
        //filter.uniforms.shadowDirection = [0.4, 0.5];
        //filter.uniforms.floorY = 0.0;
        // how big is max shadow shift to the side?
        // try to switch that off ;)
        //filter.padding = 100;
        this.sunGameObject.initShader(res.sun.data, this.renderer.screen);
        testFilter.setSize(this.renderer.width, this.renderer.height);
        //console.error(this.gameStage.worldTransform);
        //testFilter.setLocalToWorld(this.gameStage.worldTransform);
        this.filter = testFilter;
        this.stage.filterArea = this.renderer.screen;
        //this.gameStage.filters = [new AdvancedBloomFilter()];
        this.filter2 = new _renderer_shader_filter_bloom_BloomFilter__WEBPACK_IMPORTED_MODULE_5__["BloomFilter"]();
        // this.filter,
        this.filter3 = new _renderer_shader_filter_shadow_ShadowFilter__WEBPACK_IMPORTED_MODULE_6__["ShadowFilter"](this.stage.worldTransform, this.players);
        this.stage.filters = [this.filter];
    }
    // Player
    spawnPlayer(player) {
        this.players.push(player);
        player.onInit();
        this.playerStage.addChild(player.gameObject);
    }
    killPlayer(player) {
        this.playerStage.removeChild(player.gameObject);
        const p = this.players.findIndex(value => value.id === player.id);
        if (p !== undefined) {
            player.fitting.fitting.forEach((fit) => {
                fit.onDestroy(player);
            });
            player.onDestroy();
            this.players.splice(p, 1);
        }
    }
    // Projectiles
    spawnProjectile(projectile) {
        if (this.projectiles.findIndex((p) => p.id === projectile.id) < 0) {
            this.projectiles.push(projectile);
            projectile.onInit();
            this.gameStage.addChild(projectile.gameObject);
        }
    }
    destroyProjectile(projectile) {
        if (this.projectiles.findIndex((p) => p.id === projectile.id) > -1) {
            this.gameStage.removeChild(projectile.gameObject);
            const p = this.projectiles.findIndex(value => value.id === projectile.id);
            if (p !== undefined) {
                projectile.onDestroy();
                this.projectiles.splice(p, 1);
            }
        }
    }
    renderTargeting() {
        this.players.forEach(value => {
            if (value.targetPlayer !== undefined) {
                let source = value.position;
                let target = value.targetPlayer.position;
                this.drawLine(this.targetingLine, source, target, 0xFF0000, 1);
                const dir = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].sub(target, source);
                const len = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].len(dir);
                const center = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(source, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].scale(dir, 0.5));
                this.targetingText.x = center.x;
                this.targetingText.y = center.y;
                this.targetingText.text = len.toFixed(0) + "m";
            }
            if (value.actionOrbitTarget === false) {
                if (value.targetPosition !== undefined) {
                    let source = value.position;
                    let target = value.targetPosition;
                    this.targetingCircle.clear();
                    this.drawCross(this.targetingLine2, target);
                }
            }
            else {
                this.targetingLine2.clear();
                let target = value.targetPlayer.position;
                this.targetingCircle.clear();
                this.targetingCircle.position.x = target.x;
                this.targetingCircle.position.y = target.y;
                this.targetingCircle.lineStyle(1, 0xFFFFFF, 0.1);
                this.targetingCircle.drawCircle(0, 0, value.orbitRadius);
                this.targetingCircle.endFill();
            }
        });
    }
    drawCross(container, pos) {
        container.clear();
        const width = 5;
        const p1 = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].scale({ x: 1, y: 1 }, width));
        const p2 = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].scale({ x: -1, y: -1 }, width));
        const p3 = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].scale({ x: -1, y: 1 }, width));
        const p4 = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].scale({ x: 1, y: -1 }, width));
        container.lineStyle(1, 0xFFFFFF, 0.5);
        container.moveTo(p1.x, p1.y);
        container.lineTo(p2.x, p2.y);
        container.moveTo(p3.x, p3.y);
        container.lineTo(p4.x, p4.y);
    }
    drawLine(container, source, target, c, a) {
        container.clear();
        container.lineStyle(1, c, a);
        container.moveTo(source.x, source.y);
        container.lineTo(target.x, target.y);
    }
}


/***/ }),

/***/ "2Q0a":
/*!***************************************************************!*\
  !*** ./libs/common/src/lib/message/game/SpawnEnemyMessage.ts ***!
  \***************************************************************/
/*! exports provided: EnemySpawnMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnemySpawnMessage", function() { return EnemySpawnMessage; });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Message */ "pdQO");

class EnemySpawnMessage extends _Message__WEBPACK_IMPORTED_MODULE_0__["Message"] {
    constructor(name) {
        super();
        this.name = name;
        //this.fitting.fitting = spaceship.fitting.fitting;
        this.type = "enemyJoinedMessage";
    }
}


/***/ }),

/***/ "2h6S":
/*!********************************************!*\
  !*** ./libs/common/src/lib/model/Skill.ts ***!
  \********************************************/
/*! exports provided: Skill */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skill", function() { return Skill; });
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


/***/ }),

/***/ "2rDF":
/*!********************************************!*\
  !*** ./apps/client/src/app/game/Events.ts ***!
  \********************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");

class Events {
}
Events.onPlayerKilled = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
Events.playerHit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
Events.playerClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
Events.structureClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
Events.worldClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
Events.loginPlayer = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();


/***/ }),

/***/ "3MVe":
/*!************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/equipment/EquipmentGOWebber.ts ***!
  \************************************************************************/
/*! exports provided: EquipmentGOWebber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentGOWebber", function() { return EquipmentGOWebber; });
/* harmony import */ var _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ShipEquipmentGO */ "AGC5");
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @orbitweb/common */ "grfs");


class EquipmentGOWebber extends _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentGO"] {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    onInit(parent) {
        super.onInit(parent);
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0xFF00AA);
        this.graphic.drawPolygon([
            new PIXI.Point(0, 0),
            new PIXI.Point(100, 0),
            new PIXI.Point(0, 100),
        ]);
        this.graphic.endFill();
        parent.equipmentLayer.addChild(this.graphic);
    }
    iterate(parent, delta) {
        super.iterate(parent, delta);
        this.graphic.clear();
        if (parent.targetPlayer === undefined || this.state.active === false) {
            return;
        }
        const dir = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].sub(parent.targetPlayer.position, parent.position);
        const perp = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].normalize3(_orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].cross3({
            x: dir.x,
            y: dir.y,
            z: 0
        }, {
            x: 0,
            y: 0,
            z: 1
        }));
        const p1 = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].add(dir, _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].scale({
            x: perp.x,
            y: perp.y
        }, 10));
        const p2 = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].add(dir, _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].scale({
            x: perp.x,
            y: perp.y
        }, -10));
        this.graphic.beginFill(0x423271, 0.4);
        //this.graphic.drawCircle(parent.targetPlayer.position.x, parent.targetPlayer.position.y, 10);
        this.graphic.drawPolygon([
            new PIXI.Point(0, 0),
            new PIXI.Point(p1.x, p1.y),
            new PIXI.Point(p2.x, p2.y),
        ]);
        this.graphic.endFill();
    }
    onDestroy(parent) {
        super.onDestroy(parent);
        parent.equipmentLayer.removeChild(this.graphic);
        //this.repairGraphic = undefined;
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
    }
    onEndEquipment(parent) {
        super.onEndEquipment(parent);
    }
}


/***/ }),

/***/ "3R5g":
/*!*********************************************************!*\
  !*** ./apps/client/src/app/view/game/game.component.ts ***!
  \*********************************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _service_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/game.service */ "qb5o");
/* harmony import */ var _service_player_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/player.service */ "gSC2");
/* harmony import */ var _ui_ui_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/ui.component */ "VkKP");
/* harmony import */ var _game_renderer_Camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../game/renderer/Camera */ "TJhO");
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _game_Events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../game/Events */ "2rDF");
/* harmony import */ var _service_client_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/client.service */ "9sK3");














const _c0 = ["pixiContainer"];
class GameComponent {
    constructor(gameService, playerService, clientService) {
        this.gameService = gameService;
        this.playerService = playerService;
        this.clientService = clientService;
        this.clickEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.pixiContainer.nativeElement.appendChild(this.gameService.app().view); // this places our pixi application onto the viewable document
        this.gameService.app().renderer.plugins.interaction.on('pointerup', (event) => this.canvasClicked(event));
    }
    canvasClicked(event) {
        const v = this.gameService.app().gameStage.toLocal(event.data.global);
        const localPosition = {
            x: v.x,
            y: v.y
        };
        const clickedPlayer = this.gameService.app().players.find((ship) => _orbitweb_common__WEBPACK_IMPORTED_MODULE_5__["CMath"].isInsideCircle(ship.position, localPosition, 50));
        const clickedStructure = this.gameService.app().structures.find((structure) => _orbitweb_common__WEBPACK_IMPORTED_MODULE_5__["CMath"].isInsideCircle(structure.position, localPosition, 50));
        if (clickedPlayer !== undefined) {
            _game_Events__WEBPACK_IMPORTED_MODULE_6__["Events"].playerClicked.emit({
                target: clickedPlayer,
                localPosition: localPosition,
                event: event,
            });
        }
        else if (clickedStructure !== undefined) {
            _game_Events__WEBPACK_IMPORTED_MODULE_6__["Events"].structureClicked.emit({
                target: clickedStructure,
                event: event,
            });
        }
        else {
            _game_Events__WEBPACK_IMPORTED_MODULE_6__["Events"].worldClicked.emit({
                localPosition: localPosition,
                event: event
            });
        }
    }
    resize() {
        console.log("resize");
        this.gameService.app().renderer.resize(window.innerWidth, window.innerHeight);
        this.gameService.app().OnResizeWindow.emit({ x: this.gameService.app().renderer.width, y: this.gameService.app().renderer.height });
    }
    ngAfterViewInit() {
        this.gameService.onConnect.subscribe(() => {
            this.ui.loginEnabled = true;
            this.gameService.clear();
            this.gameService.send(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_5__["LobbyQueryMessage"]());
        });
        this.camera = new _game_renderer_Camera__WEBPACK_IMPORTED_MODULE_4__["Camera"](this.gameService.app().gameStage, this.gameService, this.playerService);
        this.gameService.app().depCamera = this.camera;
        this.gameService.connect();
    }
}
GameComponent.ɵfac = function GameComponent_Factory(t) { return new (t || GameComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_player_service__WEBPACK_IMPORTED_MODULE_2__["PlayerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_client_service__WEBPACK_IMPORTED_MODULE_7__["ClientService"])); };
GameComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameComponent, selectors: [["app-game"]], viewQuery: function GameComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_ui_ui_component__WEBPACK_IMPORTED_MODULE_3__["UiComponent"], 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.pixiContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.ui = _t.first);
    } }, hostBindings: function GameComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function GameComponent_resize_HostBindingHandler() { return ctx.resize(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, outputs: { clickEvent: "clickEvent" }, decls: 3, vars: 0, consts: [["pixiContainer", ""]], template: function GameComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-ui");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", null, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_ui_ui_component__WEBPACK_IMPORTED_MODULE_3__["UiComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnYW1lLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "5poH":
/*!*****************************************************************************!*\
  !*** ./apps/client/src/app/game/renderer/shader/filter/shadow/ShadowMap.ts ***!
  \*****************************************************************************/
/*! exports provided: ShadowMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShadowMap", function() { return ShadowMap; });
var Filter = PIXI.Filter;
class ShadowMap extends Filter {
    constructor(viewMatrix, spaceships) {
        super();
        this.viewMatrix = viewMatrix;
        this.spaceships = spaceships;
    }
    apply(filterManager, input, output) {
        //super.apply(filterManager, input, output, );
        /*
        const renderTarget = filterManager.getFilterTexture(input);
    
    
         */
        //TODO - copyTexSubImage2D could be used here?
        //filterManager.renderer.render()
        /*
            this.blurXFilter.apply(filterManager, input, renderTarget);
            this.blurYFilter.apply(filterManager, renderTarget, output);
    
        filterManager.returnFilterTexture(renderTarget);
        */
    }
}


/***/ }),

/***/ "60Gs":
/*!************************************************!*\
  !*** ./libs/common/src/lib/model/Inventory.ts ***!
  \************************************************/
/*! exports provided: Inventory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Inventory", function() { return Inventory; });
class Inventory {
    constructor(name) {
        this.name = name;
        this.amount = 0;
    }
}


/***/ }),

/***/ "68Tl":
/*!*******************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/projectile/ProjectileSpawnMessage.ts ***!
  \*******************************************************************************/
/*! exports provided: ProjectileSpawnMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectileSpawnMessage", function() { return ProjectileSpawnMessage; });
/* harmony import */ var _ProjectileMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectileMessage */ "HEA6");

class ProjectileSpawnMessage extends _ProjectileMessage__WEBPACK_IMPORTED_MODULE_0__["ProjectileMessage"] {
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


/***/ }),

/***/ "7NVd":
/*!**********************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientProjectileSpawnMessage.ts ***!
  \**********************************************************************************/
/*! exports provided: ClientProjectileSpawnMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientProjectileSpawnMessage", function() { return ClientProjectileSpawnMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");
/* harmony import */ var _model_ProjectileGO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ProjectileGO */ "XbyA");
/* harmony import */ var _projectiles_Rocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../projectiles/Rocket */ "gAjA");



class ClientProjectileSpawnMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const source = context.players.find((p) => p.id === this.message.source);
        const target = context.players.find((p) => p.id === this.message.target);
        if (source !== undefined && target !== undefined) {
            let projectileGO;
            if (this.message.projType === "rocketProjectile")
                projectileGO = new _projectiles_Rocket__WEBPACK_IMPORTED_MODULE_2__["Rocket"](this.message.id, source, target);
            else
                projectileGO = new _model_ProjectileGO__WEBPACK_IMPORTED_MODULE_1__["ProjectileGO"](this.message.id, source, target);
            context.spawnProjectile(projectileGO);
        }
    }
}


/***/ }),

/***/ "7O9L":
/*!************************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientProjectileDestroyMessage.ts ***!
  \************************************************************************************/
/*! exports provided: ClientProjectileDestroyMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientProjectileDestroyMessage", function() { return ClientProjectileDestroyMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");

class ClientProjectileDestroyMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const projectile = context.projectiles.find((p) => p.id === this.message.id);
        if (projectile !== undefined) {
            context.destroyProjectile(projectile);
        }
    }
}


/***/ }),

/***/ "7Pr8":
/*!************************************************!*\
  !*** ./libs/common/src/lib/model/Spaceship.ts ***!
  \************************************************/
/*! exports provided: Spaceship */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spaceship", function() { return Spaceship; });
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle */ "FBcD");
/* harmony import */ var _ShipFitting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShipFitting */ "pPBT");


class Spaceship extends _Particle__WEBPACK_IMPORTED_MODULE_0__["Particle"] {
    constructor(id, color) {
        super();
        this.maxSpeed = 50;
        this.health = 100;
        this.maxHealth = 150;
        this.color = "#00FF00";
        this.curSpeedDEP = 0;
        this.fitting = new _ShipFitting__WEBPACK_IMPORTED_MODULE_1__["ShipFitting"]();
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


/***/ }),

/***/ "7udm":
/*!************************************************!*\
  !*** ./apps/client/src/app/game/core/Input.ts ***!
  \************************************************/
/*! exports provided: Input */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Events */ "2rDF");






class Input {
    constructor(playerService, gameService) {
        this.playerService = playerService;
        this.gameService = gameService;
        _Events__WEBPACK_IMPORTED_MODULE_1__["Events"].worldClicked.subscribe((event) => {
            //console.log("worldClicked", event.localPosition);
            if (this.playerService.getUserName() !== undefined) {
                const msg = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["PlayerMoveToMessage"](this.playerService.getUserName(), event.localPosition);
                this.gameService.send(msg);
            }
            else {
                console.log("no player");
            }
        });
        _Events__WEBPACK_IMPORTED_MODULE_1__["Events"].structureClicked.subscribe((val) => {
            if (this.playerService.getUserName() !== undefined) {
                const msg = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["PlayerStructureMessage"](this.playerService.getUserName(), val.target.id);
                this.gameService.send(msg);
            }
            else {
                console.log("no player");
            }
        });
        _Events__WEBPACK_IMPORTED_MODULE_1__["Events"].playerClicked.subscribe((value) => {
            if (value.target.id === this.playerService.getUserName()) {
                console.log("self");
            }
            else {
                const msg = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["PlayerOrbitMessage"](this.playerService.getUserName(), value.target.id);
                this.gameService.send(msg);
            }
        });
        window.addEventListener("keydown", (event) => {
            if (this.playerService.isLoggedIn()) {
                if (event.key === "1") {
                    this.keyPressed(1);
                }
                else if (event.key === "2") {
                    this.keyPressed(2);
                }
                else if (event.key === "3") {
                    this.keyPressed(3);
                }
                else if (event.key === "4") {
                    this.keyPressed(4);
                }
                else if (event.key === "5") {
                    this.keyPressed(5);
                }
                else if (event.key === " ") {
                    this.debugPressed(-1);
                }
            }
        });
    }
    keyPressed(key) {
        console.log(key);
        const userName = this.playerService.getUserName();
        if (userName !== undefined) {
            const msg = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["PlayerActionMessage"](userName, key - 1);
            if (msg !== undefined) {
                this.gameService.send(msg);
            }
        }
    }
    debugPressed(key) {
        console.log(key);
        const userName = this.playerService.getUserName();
        if (userName !== undefined) {
            const msg = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["DebugMessage"]();
            if (msg !== undefined) {
                this.gameService.send(msg);
            }
        }
    }
}


/***/ }),

/***/ "7vT3":
/*!*******************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientPlayerJoinedMessage.ts ***!
  \*******************************************************************************/
/*! exports provided: ClientPlayerJoinedMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientPlayerJoinedMessage", function() { return ClientPlayerJoinedMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");
/* harmony import */ var _model_SpaceshipGO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/SpaceshipGO */ "U/bh");
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _core_serialize_EquipmentDeserializer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/serialize/EquipmentDeserializer */ "I/47");





class ClientPlayerJoinedMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        let enemyGO = context.players.find(value => {
            return value.id === this.message.source;
        });
        if (enemyGO === undefined) {
            const enemy = _orbitweb_common__WEBPACK_IMPORTED_MODULE_2__["Factories"].createSpaceship(this.message);
            enemyGO = new _model_SpaceshipGO__WEBPACK_IMPORTED_MODULE_1__["SpaceshipGO"](enemy);
            enemyGO.fitting = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_2__["ShipFitting"]();
            context.spawnPlayer(enemyGO);
            enemyGO.fitting.fitting = this.message.fitting.fitting.map((fit) => {
                const fitGO = _core_serialize_EquipmentDeserializer__WEBPACK_IMPORTED_MODULE_3__["EquipmentDeserializer"].deserialize(fit);
                fitGO.onInit(enemyGO);
                return fitGO;
            });
            enemyGO.iterateGraphics();
        }
        else {
            //console.log("Bereits bekannt");
        }
    }
}


/***/ }),

/***/ "81Ne":
/*!************************************************************************!*\
  !*** ./apps/client/src/app/view/ui/scoreboard/scoreboard.component.ts ***!
  \************************************************************************/
/*! exports provided: ScoreboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreboardComponent", function() { return ScoreboardComponent; });
/* harmony import */ var _service_game_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/game.service */ "qb5o");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");




function ScoreboardComponent_tr_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const score_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](score_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](score_r1.kills);
} }
class ScoreboardComponent {
    constructor(gameService) {
        this.gameService = gameService;
        this.gameService.onMessage.subscribe((msg) => {
            if (msg.type === "scoreboardUpdateMessage") {
                this.scoreboard = msg.entries;
            }
        });
    }
    set scoreboard(val) {
        this._scoreboard = val.sort((a, b) => {
            return b.kills - a.kills;
        });
    }
    get scoreboard() {
        return this._scoreboard;
    }
    ngOnInit() {
    }
}
ScoreboardComponent.ɵfac = function ScoreboardComponent_Factory(t) { return new (t || ScoreboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_service_game_service__WEBPACK_IMPORTED_MODULE_0__["GameService"])); };
ScoreboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ScoreboardComponent, selectors: [["app-scoreboard"]], inputs: { scoreboard: "scoreboard" }, decls: 3, vars: 1, consts: [[4, "ngFor", "ngForOf"]], template: function ScoreboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, "Cashed in:\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ScoreboardComponent_tr_2_Template, 5, 2, "tr", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx._scoreboard);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["table[_ngcontent-%COMP%] {\n  margin: 5px;\n  -webkit-user-select: none;\n          user-select: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Njb3JlYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EseUJBQUE7VUFBQSxpQkFBQTtBQUNGIiwiZmlsZSI6InNjb3JlYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XG4gIG1hcmdpbjo1cHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuIl19 */"] });


/***/ }),

/***/ "8Fsd":
/*!******************************************************************************!*\
  !*** ./apps/client/src/app/view/util/progress-bar/progress-bar.component.ts ***!
  \******************************************************************************/
/*! exports provided: ProgressBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressBarComponent", function() { return ProgressBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");

const _c0 = ["*"];
class ProgressBarComponent {
    constructor() {
        this.maxValue = 100;
        this._currentValue = 40;
    }
    set currentValue(val) {
        this._currentValue = val;
        const p = val * 100 / this.maxValue;
        this.pValue = p <= 100 ? p : 100;
    }
    ngOnInit() {
    }
}
ProgressBarComponent.ɵfac = function ProgressBarComponent_Factory(t) { return new (t || ProgressBarComponent)(); };
ProgressBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProgressBarComponent, selectors: [["app-progress-bar"]], inputs: { title: "title", desc: "desc", maxValue: "maxValue", currentValue: "currentValue" }, ngContentSelectors: _c0, decls: 4, vars: 2, consts: [["cost-label", "20", 1, "progress"], [2, "position", "absolute"], [1, "value"]], template: function ProgressBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", 100 - ctx.pValue, "%");
    } }, styles: [".innerBar[_ngcontent-%COMP%] {\n  background-color: red;\n  height: 3px;\n}\n\n.outerBar[_ngcontent-%COMP%] {\n  background-color: blue;\n  width: 100%;\n}\n\n.progress[_ngcontent-%COMP%] {\n  height: 1.5em;\n  width: 100%;\n  background-color: #c9c9c9;\n  position: relative;\n}\n\n.progress[_ngcontent-%COMP%]:before {\n  content: attr(data-label);\n  font-size: 0.8em;\n  position: absolute;\n  text-align: left;\n  top: 5px;\n  left: 0;\n  right: 0;\n}\n\n.progress[_ngcontent-%COMP%]:after {\n  content: attr(cost-label);\n  font-size: 0.8em;\n  position: absolute;\n  text-align: right;\n  top: 5px;\n  left: 0;\n  right: 0;\n}\n\n.progress[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  background-color: #7cc4ff;\n  display: inline-block;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2dyZXNzLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVFLHFCQUFBO0VBQ0EsV0FBQTtBQUFGOztBQUdBO0VBQ0Usc0JBQUE7RUFDQSxXQUFBO0FBQUY7O0FBS0E7RUFDRSxhQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUFGRjs7QUFJQTtFQUNFLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0FBREY7O0FBSUE7RUFDRSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtBQURGOztBQUlBO0VBQ0UseUJBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7QUFERiIsImZpbGUiOiJwcm9ncmVzcy1iYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW5uZXJCYXIge1xuXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbiAgaGVpZ2h0OiAzcHg7XG59XG5cbi5vdXRlckJhciB7XG4gIGJhY2tncm91bmQtY29sb3I6Ymx1ZTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cblxuXG4ucHJvZ3Jlc3Mge1xuICBoZWlnaHQ6IDEuNWVtO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M5YzljOTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnByb2dyZXNzOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1sYWJlbCk7XG4gIGZvbnQtc2l6ZTogMC44ZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgdG9wOiA1cHg7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xufVxuXG4ucHJvZ3Jlc3M6YWZ0ZXIge1xuICBjb250ZW50OiBhdHRyKGNvc3QtbGFiZWwpO1xuICBmb250LXNpemU6IDAuOGVtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICB0b3A6IDVweDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG59XG5cbi5wcm9ncmVzcyAudmFsdWUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2NjNGZmO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogMTAwJTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ "9FBD":
/*!*********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/movement/PlayerMoveToMessage.ts ***!
  \*********************************************************************************/
/*! exports provided: PlayerMoveToMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerMoveToMessage", function() { return PlayerMoveToMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../generic/PlayerMessage */ "sYV4");

class PlayerMoveToMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(player, position) {
        super(player);
        this.position = position;
        this.type = "playerMoveToMessage";
    }
}


/***/ }),

/***/ "9sK3":
/*!*******************************************************!*\
  !*** ./apps/client/src/app/service/client.service.ts ***!
  \*******************************************************/
/*! exports provided: ClientService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientService", function() { return ClientService; });
/* harmony import */ var _game_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.service */ "qb5o");
/* harmony import */ var _game_core_serialize_MessageDeserializer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/core/serialize/MessageDeserializer */ "z05I");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");




class ClientService {
    constructor(gameService) {
        this.gameService = gameService;
        this.gameService.onMessage.subscribe((msg) => {
            this.parseMessage(msg, this.gameService.app());
        });
    }
    parseMessage(message, app) {
        const msg = _game_core_serialize_MessageDeserializer__WEBPACK_IMPORTED_MODULE_1__["MessageDeserializer"].deserialize(message);
        if (msg !== undefined) {
            msg.onRecieve(app);
        }
    }
}
ClientService.ɵfac = function ClientService_Factory(t) { return new (t || ClientService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_game_service__WEBPACK_IMPORTED_MODULE_0__["GameService"])); };
ClientService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ClientService, factory: ClientService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "A5GZ":
/*!*********************************************************************!*\
  !*** ./libs/common/src/lib/message/game/ScoreboardUpdateMessage.ts ***!
  \*********************************************************************/
/*! exports provided: ScoreboardUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreboardUpdateMessage", function() { return ScoreboardUpdateMessage; });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Message */ "pdQO");

class ScoreboardUpdateMessage extends _Message__WEBPACK_IMPORTED_MODULE_0__["Message"] {
    constructor(entries) {
        super();
        this.entries = entries;
        this.type = "scoreboardUpdateMessage";
    }
}


/***/ }),

/***/ "AGC5":
/*!***********************************************************!*\
  !*** ./apps/client/src/app/game/model/ShipEquipmentGO.ts ***!
  \***********************************************************/
/*! exports provided: ShipEquipmentGO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentGO", function() { return ShipEquipmentGO; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");

class ShipEquipmentGO extends _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"] {
    constructor(shipEquipment) {
        super(shipEquipment.name, shipEquipment.tier, shipEquipment.cpuCost, shipEquipment.powerCost, shipEquipment.cycleTime, shipEquipment.passive, shipEquipment.action);
        this.alreadyApplied = false;
        this.alreadyRemoved = false;
    }
    iterate(parent, delta) {
        super.iterate(parent, delta);
        this.onUpdateEquipment(parent, delta);
    }
    onStartEquipment(parent) {
    }
    onUpdateEquipment(parent, delta) {
        if (this.state.active && !this.alreadyApplied) {
            // First start
            this.alreadyApplied = true;
            this.alreadyRemoved = false;
            this.onStartEquipment(parent);
        }
        else if (!this.state.active && !this.alreadyRemoved) {
            this.alreadyRemoved = true;
            this.alreadyApplied = false;
            this.onEndEquipment(parent);
        }
    }
    onEndEquipment(parent) {
    }
}


/***/ }),

/***/ "AvLL":
/*!****************************************************!*\
  !*** ./libs/common/src/lib/model/ShipEquipment.ts ***!
  \****************************************************/
/*! exports provided: ShipEquipment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipEquipment", function() { return ShipEquipment; });
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


/***/ }),

/***/ "D1wQ":
/*!********************************************************************!*\
  !*** ./libs/common/src/lib/message/generic/PlayerTargetMessage.ts ***!
  \********************************************************************/
/*! exports provided: PlayerTargetMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerTargetMessage", function() { return PlayerTargetMessage; });
/* harmony import */ var _PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerMessage */ "sYV4");

class PlayerTargetMessage extends _PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(source, target) {
        super(source);
        this.target = target;
        this.type = "playerTargetMessage";
    }
}


/***/ }),

/***/ "D2XO":
/*!*****************************************************!*\
  !*** ./libs/common/src/lib/util/VectorInterface.ts ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "Eux7":
/*!************************************************!*\
  !*** ./libs/common/src/lib/model/Structure.ts ***!
  \************************************************/
/*! exports provided: Structure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Structure", function() { return Structure; });
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


/***/ }),

/***/ "FBcD":
/*!***********************************************!*\
  !*** ./libs/common/src/lib/model/Particle.ts ***!
  \***********************************************/
/*! exports provided: Particle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return Particle; });
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


/***/ }),

/***/ "FJrd":
/*!****************************************************************!*\
  !*** ./libs/common/src/lib/message/login/LobbyQueryMessage.ts ***!
  \****************************************************************/
/*! exports provided: LobbyQueryMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LobbyQueryMessage", function() { return LobbyQueryMessage; });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Message */ "pdQO");

class LobbyQueryMessage extends _Message__WEBPACK_IMPORTED_MODULE_0__["Message"] {
    constructor() {
        super();
        this.type = "lobbyQueryMessage";
    }
}


/***/ }),

/***/ "FzS+":
/*!*************************************************!*\
  !*** ./libs/common/src/lib/model/Projectile.ts ***!
  \*************************************************/
/*! exports provided: Projectile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Projectile", function() { return Projectile; });
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle */ "FBcD");

class Projectile extends _Particle__WEBPACK_IMPORTED_MODULE_0__["Particle"] {
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


/***/ }),

/***/ "FzT8":
/*!************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerUpdateMessage.ts ***!
  \************************************************************************/
/*! exports provided: PlayerUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerUpdateMessage", function() { return PlayerUpdateMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generic/PlayerMessage */ "sYV4");
/* harmony import */ var _model_ShipFitting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/ShipFitting */ "pPBT");


class PlayerUpdateMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(spaceship) {
        super(spaceship.id);
        this.activationProgress = 0;
        this.color = spaceship.color;
        this.x = spaceship.position.x;
        this.y = spaceship.position.y;
        this.speedX = spaceship.speed.x;
        this.speedY = spaceship.speed.y;
        this.rotation = spaceship.rotation;
        this.fitting = new _model_ShipFitting__WEBPACK_IMPORTED_MODULE_1__["ShipFitting"]();
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


/***/ }),

/***/ "HEA6":
/*!**************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/projectile/ProjectileMessage.ts ***!
  \**************************************************************************/
/*! exports provided: ProjectileMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectileMessage", function() { return ProjectileMessage; });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Message */ "pdQO");

class ProjectileMessage extends _Message__WEBPACK_IMPORTED_MODULE_0__["Message"] {
    constructor(id) {
        super();
        this.id = id;
        this.type = "projectileMessage";
    }
}


/***/ }),

/***/ "HeP6":
/*!**************************************************************************!*\
  !*** ./apps/client/src/app/game/core/serialize/StructureDeserializer.ts ***!
  \**************************************************************************/
/*! exports provided: StructureDeserializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureDeserializer", function() { return StructureDeserializer; });
/* harmony import */ var _entity_structures_StructureGOPortal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../entity/structures/StructureGOPortal */ "YHM0");
/* harmony import */ var _entity_structures_StructureGOLoot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../entity/structures/StructureGOLoot */ "JnB1");


//import * as eq from "../../entity/equipment";
const classes = {
    StructureGOPortal: _entity_structures_StructureGOPortal__WEBPACK_IMPORTED_MODULE_0__["StructureGOPortal"],
    StructureGOLoot: _entity_structures_StructureGOLoot__WEBPACK_IMPORTED_MODULE_1__["StructureGOLoot"],
};
class StructureDeserializer {
    static deserialize(msg) {
        return StructureDeserializer.create(msg);
        //return undefined;
    }
    static create(msg) {
        const name = "StructureGO" + msg.structureType;
        if (classes[name] !== undefined) {
            return new classes[name](msg.id, msg.x, msg.y, msg.activationRange, msg.activationDuration, msg.info);
        }
        console.error("structure not found", name);
        //    return new EquipmentGOError(shipEquipment);
        return undefined;
    }
}


/***/ }),

/***/ "I/47":
/*!**************************************************************************!*\
  !*** ./apps/client/src/app/game/core/serialize/EquipmentDeserializer.ts ***!
  \**************************************************************************/
/*! exports provided: EquipmentDeserializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentDeserializer", function() { return EquipmentDeserializer; });
/* harmony import */ var _entity_equipment_EquipmentGOError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../entity/equipment/EquipmentGOError */ "qTRG");
/* harmony import */ var _entity_equipment_EquipmentGOEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../entity/equipment/EquipmentGOEmpty */ "uB5d");
/* harmony import */ var _entity_equipment_EquipmentGOLaser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../entity/equipment/EquipmentGOLaser */ "a/Jb");
/* harmony import */ var _entity_equipment_EquipmentGONosferatu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../entity/equipment/EquipmentGONosferatu */ "Rxrz");
/* harmony import */ var _entity_equipment_EquipmentGORepair__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../entity/equipment/EquipmentGORepair */ "/roC");
/* harmony import */ var _entity_equipment_EquipmentGORocketLauncher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../entity/equipment/EquipmentGORocketLauncher */ "Q5L6");
/* harmony import */ var _entity_equipment_EquipmentGOSpeedBooster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../entity/equipment/EquipmentGOSpeedBooster */ "faPN");
/* harmony import */ var _entity_equipment_EquipmentGOWebber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../entity/equipment/EquipmentGOWebber */ "3MVe");








//import * as eq from "../../entity/equipment";
const classes = {
    EquipmentGOError: _entity_equipment_EquipmentGOError__WEBPACK_IMPORTED_MODULE_0__["EquipmentGOError"],
    EquipmentGOEmpty: _entity_equipment_EquipmentGOEmpty__WEBPACK_IMPORTED_MODULE_1__["EquipmentGOEmpty"],
    EquipmentGOLaser: _entity_equipment_EquipmentGOLaser__WEBPACK_IMPORTED_MODULE_2__["EquipmentGOLaser"],
    EquipmentGONosferatu: _entity_equipment_EquipmentGONosferatu__WEBPACK_IMPORTED_MODULE_3__["EquipmentGONosferatu"],
    EquipmentGORepair: _entity_equipment_EquipmentGORepair__WEBPACK_IMPORTED_MODULE_4__["EquipmentGORepair"],
    EquipmentGORocketLauncher: _entity_equipment_EquipmentGORocketLauncher__WEBPACK_IMPORTED_MODULE_5__["EquipmentGORocketLauncher"],
    EquipmentGOSpeedBooster: _entity_equipment_EquipmentGOSpeedBooster__WEBPACK_IMPORTED_MODULE_6__["EquipmentGOSpeedBooster"],
    EquipmentGOWebber: _entity_equipment_EquipmentGOWebber__WEBPACK_IMPORTED_MODULE_7__["EquipmentGOWebber"]
};
class EquipmentDeserializer {
    static deserialize(shipEquipment) {
        return EquipmentDeserializer.create(shipEquipment);
        //return undefined;
    }
    static create(shipEquipment) {
        const name = "EquipmentGO" + shipEquipment.name;
        if (classes[name] !== undefined) {
            return new classes[name](shipEquipment);
        }
        console.error("module not found", name);
        return new _entity_equipment_EquipmentGOError__WEBPACK_IMPORTED_MODULE_0__["EquipmentGOError"](shipEquipment);
    }
}


/***/ }),

/***/ "I8lz":
/*!***************************************************************!*\
  !*** ./apps/client/src/app/game/core/network/client-enums.ts ***!
  \***************************************************************/
/*! exports provided: EventIO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventIO", function() { return EventIO; });
// Socket.io events
var EventIO;
(function (EventIO) {
    EventIO["CONNECT"] = "connect";
    EventIO["DISCONNECT"] = "disconnect";
})(EventIO || (EventIO = {}));


/***/ }),

/***/ "Io7Y":
/*!***********************************************************!*\
  !*** ./apps/client/src/app/game/model/MessageRecieved.ts ***!
  \***********************************************************/
/*! exports provided: ClientMessageRecieved */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientMessageRecieved", function() { return ClientMessageRecieved; });
class ClientMessageRecieved {
    constructor(message) {
        this.message = message;
    }
    onRecieve(context) {
    }
}


/***/ }),

/***/ "JnB1":
/*!***********************************************************************!*\
  !*** ./apps/client/src/app/game/entity/structures/StructureGOLoot.ts ***!
  \***********************************************************************/
/*! exports provided: StructureGOLoot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureGOLoot", function() { return StructureGOLoot; });
/* harmony import */ var _model_StructureGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/StructureGO */ "L9s+");

class StructureGOLoot extends _model_StructureGO__WEBPACK_IMPORTED_MODULE_0__["StructureGO"] {
    getGameObject() {
        const cannonCont = new PIXI.Container();
        this.text = new PIXI.Text("*" + this.info + "*\nDebris", { fontFamily: 'Arial', fontSize: 12, fill: 0xD4AF37, align: 'center' });
        this.text.x = this.text.width / -2;
        this.text.y = this.text.height / -2;
        this.lineObject = new PIXI.Graphics();
        this.lineObject.lineStyle(2, 0xD4AF37);
        this.lineObject.drawRect(-0.5 * this.text.width - 10, -0.5 * this.text.height - 10, this.text.width + 20, this.text.height + 20);
        this.lineObject.endFill();
        this.lineObject.beginFill(0x000000);
        this.lineObject.drawRect(-0.5 * this.text.width - 10, -0.5 * this.text.height - 10, this.text.width + 20, this.text.height + 20);
        this.lineObject.endFill();
        cannonCont.addChild(this.lineObject);
        cannonCont.addChild(this.text);
        return cannonCont;
    }
}


/***/ }),

/***/ "K5WU":
/*!******************************************************************************!*\
  !*** ./apps/client/src/app/game/renderer/shader/filter/bloom/BloomFilter.ts ***!
  \******************************************************************************/
/*! exports provided: BloomFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BloomFilter", function() { return BloomFilter; });
var Filter = PIXI.Filter;
var BlurFilterPass = PIXI.filters.BlurFilterPass;
var BLEND_MODES = PIXI.BLEND_MODES;
var AlphaFilter = PIXI.filters.AlphaFilter;
class BloomFilter extends Filter {
    constructor(blur = 2, quality = 4, resolution = 1, kernelSize = 5) {
        super();
        let blurX;
        let blurY;
        /*
            if (typeof blur === 'number') {
              blurX = blur;
              blurY = blur;
            } else if (blur instanceof Point) {
              blurX = (<any>blur).x;
              blurY = (<any>blur).y;
            }
            else if (Array.isArray(blur)) {
              blurX = blur[0];
              blurY = blur[1];
            }
        
         */
        this.blurXFilter = new BlurFilterPass(true, blurX, quality, resolution, kernelSize);
        this.blurYFilter = new BlurFilterPass(false, blurY, quality, resolution, kernelSize);
        this.blurYFilter.blendMode = BLEND_MODES.SCREEN;
        this.defaultFilter = new AlphaFilter(0.8);
    }
    apply(filterManager, input, output) {
        const renderTarget = filterManager.getFilterTexture(input);
        //TODO - copyTexSubImage2D could be used here?
        this.defaultFilter.apply(filterManager, input, output);
        this.blurXFilter.apply(filterManager, input, renderTarget);
        this.blurYFilter.apply(filterManager, renderTarget, output);
        filterManager.returnFilterTexture(renderTarget);
    }
    /**
     * Sets the strength of both the blurX and blurY properties simultaneously
     *
     * @member {number}
     * @default 2
     */
    get blur() {
        return this.blurXFilter.blur;
    }
    set blur(value) {
        this.blurXFilter.blur = this.blurYFilter.blur = value;
    }
    /**
     * Sets the strength of the blurX property
     *
     * @member {number}
     * @default 2
     */
    get blurX() {
        return this.blurXFilter.blur;
    }
    set blurX(value) {
        this.blurXFilter.blur = value;
    }
    /**
     * Sets the strength of the blurY property
     *
     * @member {number}
     * @default 2
     */
    get blurY() {
        return this.blurYFilter.blur;
    }
    set blurY(value) {
        this.blurYFilter.blur = value;
    }
}


/***/ }),

/***/ "Kba2":
/*!*******************************************************!*\
  !*** ./apps/client/src/app/game/model/NameplateGO.ts ***!
  \*******************************************************/
/*! exports provided: NameplateGO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NameplateGO", function() { return NameplateGO; });
class NameplateGO extends PIXI.Container {
    constructor(spaceship) {
        super();
        this.spaceship = spaceship;
        this.barWidth = 50;
        this.barHeight = 5;
        this.offsetY = -50;
        this.namePlate = new PIXI.Text(spaceship.id, { fontFamily: 'Arial', fontSize: 14, fill: 0xffffff, align: 'center' });
        this.namePlate.position.x = 0;
        this.namePlate.position.y = this.offsetY;
        this.namePlate.anchor.x = 0.5;
        this.addChild(this.namePlate);
        this.health = new PIXI.Graphics();
        this.health.position.x = -1 * this.barWidth / 2;
        this.health.position.y = this.offsetY + 16;
        this.energy = new PIXI.Graphics();
        this.energy.position.x = -1 * this.barWidth / 2;
        this.energy.position.y = this.health.position.y + this.barHeight + 2;
        this.update(spaceship);
        this.addChild(this.health);
        this.addChild(this.energy);
    }
    update(spaceship) {
        this.fillBar(this.health, spaceship.health, spaceship.maxHealth, 0xAAFFAA, 0xa91aff);
        this.fillBar(this.energy, spaceship.power, spaceship.energyCapacity, 0x2f2f9a, 0xa91aff);
    }
    fillBar(bar, value, max, color, bgcolor) {
        bar.clear();
        bar.beginFill(bgcolor);
        bar.drawRect(0, 0, this.barWidth, this.barHeight);
        let v = this.barWidth * value / max;
        v = v <= this.barWidth ? v : this.barWidth;
        bar.beginFill(color);
        bar.drawRect(0, 0, v, this.barHeight);
        bar.endFill();
    }
}


/***/ }),

/***/ "KkI/":
/*!*****************************************************!*\
  !*** ./apps/client/src/environments/environment.ts ***!
  \*****************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "L9s+":
/*!*******************************************************!*\
  !*** ./apps/client/src/app/game/model/StructureGO.ts ***!
  \*******************************************************/
/*! exports provided: StructureGO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureGO", function() { return StructureGO; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");

class StructureGO extends _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["Structure"] {
    constructor(id, x, y, activationRange, activationDuration, info) {
        super(x, y);
        this.id = id;
        this.activationRange = activationRange;
        this.activationDuration = activationDuration;
        this.info = info;
        this.gameObject = this.getGameObject();
    }
    onInit() {
        this.gameObject.x = this.position.x;
        this.gameObject.y = this.position.y;
    }
    onDestroy() {
    }
    iterate(delta) {
    }
    getGameObject() {
        const cannonCont = new PIXI.Container();
        this.lineObject = new PIXI.Graphics();
        // Set the fill color
        //this.lineObject.lineStyle(5, 0xFF00FF);
        this.lineObject.beginFill(0xAA33BB);
        this.lineObject.drawCircle(0, 0, 40);
        this.lineObject.endFill();
        cannonCont.addChild(this.lineObject);
        return cannonCont;
    }
}


/***/ }),

/***/ "LxUT":
/*!***********************************************!*\
  !*** ./apps/client/src/app/game/FittingDB.ts ***!
  \***********************************************/
/*! exports provided: FittingDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FittingDB", function() { return FittingDB; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");

class FittingDB {
    constructor() {
        this.db = [];
        this.desc = [];
        this.init();
        this.initDesc();
    }
    init() {
        this.db.push(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"]("Repair", 2, 10, 30, 15, false, {
            targetSelf: true
        }));
        this.db.push(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"]("Webber", 2, 15, 10, 10, false, {
            targetEnemy: true
        }));
        this.db.push(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"]("Laser", 1, 8, 20, 5, false, {
            targetEnemy: true
        }));
        this.db.push(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"]("SpeedBooster", 2, 70, 30, 6, false, {
            targetSelf: true
        }));
        this.db.push(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"]("RocketLauncher", 1, 5, 5, 2.5, false, {
            targetEnemy: true
        }));
        this.db.push(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"]("Nosferatu", 1, 10, 60, 15, false, {
            targetEnemy: true
        }));
        this.db.push(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"]("Battery", 3, 40, 0, 0, true, {}));
        this.db.push(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["ShipEquipment"]("Mass", 3, 40, 0, 0, true, {}));
    }
    initDesc() {
        this.desc.push({ name: "Repair", desc: "Self Heal for energy cost." });
        this.desc.push({ name: "Webber", desc: "Slows the target ship on activation." });
        this.desc.push({ name: "Laser", desc: "Shoots at the target. Needs to be in range and aligned for the shot." });
        this.desc.push({ name: "RocketLauncher", desc: "Fires rockets which follows the target. Explode after 10s or reached the target." });
        this.desc.push({ name: "SpeedBooster", desc: "Increased Speed for high energy cost." });
        this.desc.push({ name: "Webber", desc: "Slows the target." });
        this.desc.push({ name: "Nosferatu", desc: "Steals target energy." });
        this.desc.push({ name: "Battery", desc: "Highly increases energy regeneration!" });
        this.desc.push({ name: "Battery", desc: "Increases ship mass." });
    }
    search(name) {
        return this.db.find((eq) => eq.name === name);
    }
    getSet(name) {
        const set = [];
        switch (name) {
            case "default":
                set.push(this.search("Repair"));
                set.push(this.search("Webber"));
                set.push(this.search("SpeedBooster"));
                set.push(this.search("RocketLauncher"));
                set.push(this.search("Mass"));
                break;
        }
        return set;
    }
    getDescription(name) {
        const d = this.desc.find((d) => d.name === name);
        if (d === undefined) {
            return "Small description is following soon!";
        }
        return d.desc;
    }
}


/***/ }),

/***/ "MXF6":
/*!***********************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientStructureDestroyMessage.ts ***!
  \***********************************************************************************/
/*! exports provided: ClientStructureDestroyMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientStructureDestroyMessage", function() { return ClientStructureDestroyMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");

class ClientStructureDestroyMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const structureGO = context.structures.find((structure) => structure.id === this.message.id);
        if (structureGO !== undefined) {
            context.structureStage.removeChild(structureGO.gameObject);
            const p = context.structures.findIndex(value => value.id === structureGO.id);
            if (p !== undefined) {
                structureGO.onDestroy();
                context.projectiles.splice(p, 1);
            }
        }
    }
}


/***/ }),

/***/ "NXai":
/*!****************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/equipment/ShipEquipmentMessage.ts ***!
  \****************************************************************************/
/*! exports provided: ShipEquipmentMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentMessage", function() { return ShipEquipmentMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generic/PlayerMessage */ "sYV4");

class ShipEquipmentMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(id, index, active) {
        super(id);
        this.id = id;
        this.index = index;
        this.active = active;
        this.type = "shipEquipmentMessage";
    }
}


/***/ }),

/***/ "Q5L6":
/*!********************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/equipment/EquipmentGORocketLauncher.ts ***!
  \********************************************************************************/
/*! exports provided: EquipmentGORocketLauncher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentGORocketLauncher", function() { return EquipmentGORocketLauncher; });
/* harmony import */ var _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ShipEquipmentGO */ "AGC5");

class EquipmentGORocketLauncher extends _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentGO"] {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    onInit(parent) {
        super.onInit(parent);
        this.gameObject = this.getGameObject(parent);
        parent.equipmentLayer.addChild(this.gameObject);
    }
    iterate(parent, delta) {
        super.iterate(parent, delta);
        this.gameObject.rotation = this.state.rotation;
        /*
        
        
            if ( this.state.active) {
        
              this.repairGraphic.lineStyle(2, 0x00FF00);
        
              this.repairGraphic.drawCircle(0, 0, 20);
        
              this.repairGraphic.endFill();
        
            } else {
              this.repairGraphic.clear();
            }
            */
    }
    onDestroy(parent) {
        super.onDestroy(parent);
        parent.gameObject.removeChild(this.gameObject);
        this.gameObject = undefined;
    }
    getGameObject(parent) {
        const cannonCont = new PIXI.Container();
        const cannon = new PIXI.Graphics();
        const c = PIXI.utils.string2hex("#AA55FF");
        // Set the fill color
        const look = new PIXI.Graphics();
        const invertColor = PIXI.utils.string2hex(parent.invertColor(parent.color));
        // Set the fill color
        look.lineStyle(2, invertColor); // Red
        // Draw a circle
        look.drawCircle(0, 0, parent.shipSize + 3);
        look.endFill();
        cannonCont.addChild(look);
        return cannonCont;
    }
}


/***/ }),

/***/ "QIIW":
/*!***********************************************!*\
  !*** ./apps/client/src/app/game/model/Sun.ts ***!
  \***********************************************/
/*! exports provided: SunGameObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SunGameObject", function() { return SunGameObject; });
class SunGameObject {
    constructor(parent) {
        this.parent = parent;
        this.deltaTime = 0.0;
        this.gameObject = new PIXI.Container();
        this.parent.addChild(this.gameObject);
        this.init(this.gameObject);
    }
    get position() {
        return {
            x: this.gameObject.position.x,
            y: this.gameObject.position.y
        };
    }
    initShader(fragmentShader, screen) {
        const loader = PIXI.Loader.shared;
        loader.add('one', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c6ab025c-4c97-435c-a80d-c4b4fa5d1129/d1kp7kp-6a6b443c-3213-4991-baf2-5d4236041dcb.png/v1/fill/w_600,h_450,q_80,strp/sun_texture_by_amaya_chibi_d1kp7kp-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDUwIiwicGF0aCI6IlwvZlwvYzZhYjAyNWMtNGM5Ny00MzVjLWE4MGQtYzRiNGZhNWQxMTI5XC9kMWtwN2twLTZhNmI0NDNjLTMyMTMtNDk5MS1iYWYyLTVkNDIzNjA0MWRjYi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.JzWZH98Ie7qLggj7rhKSgAz1agYi8edfTkq9H3gKCI0')
            .add('two', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUTExMVFhUXGB0ZGBgYGB0eHRseHSIdHRogHhsbHSggGxolHR0dIjEhJSkrLi4uHR8zODMtNygtLisBCgoKDg0OGxAQGy0mICYyLS0yNy0vLS8vLy01LS8tLy8tLS0tLS8tLS8tLS0tLS0vLS0tLS0vLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAADAQEBAQEBAAAAAAAAAAAFBgcEAwIBAAj/xABBEAABAgMGAwUGBAUEAAcAAAABAhEAAyEEBQYSMUFRYXETIoGR8DKhscHR4RRCUvEHFiMzchU0U2JDVGNzgqLC/8QAGwEAAwEBAQEBAAAAAAAAAAAAAwQFAgEGAAf/xAA3EQACAgEDAgQEBAYCAgMBAAABAgADEQQSITFBBRMiURRhcYEykaHwIzNCscHRUuEV8UNicjT/2gAMAwEAAhEDEQA/AGVM1u+p0hhodvpH5pj+kT2BX+kcwXflvNUqGZJoBDWmqzgg8iMUVAcjrEe87oVnTkFN+fXjFunUrtO6OdSDmOFnw+vskLYGW1G9cYkvqfUTFTqk3lO8FJlzkTEqkgJJJ1oOdIZLVMhFkYOwjDRvXiXsZQBLmhYetYn112NlVOBJZ0C2PmAZtnF5TQoEih6eLbw0jPpQQcZMbyNJXgzSLBJsysqA6hTqeD+tIA1ttwO4z5bHtXJ4EVMV3VMK1THp767RV0GoQKExGFO5QAYBsF5T5KmSSE0dMP20VWjJHMGN+7BGRGS2XHZ54E1ExMqjrTu/KJteruq9DKW9p0g5wR9xCmHkokAKUQqvdVr08awrqy1pwon1wLjAhC2XMFtNlrBoSTy6akQBNQVBRhBJqCPQwk/xJeBmzDlDZaD5xf0dIrTnvDvuC7U6zJcl9zZEwKKizsoGtINqdLXcmMfSKJa2dtv/AKj7dN5SrepToZaR7XGIGoos0YGDkGE3eWvoOR0njEllldmAhFUakUc7tGtHZZv9R6w1Bcn1HrFm0qyTpByl8odz60EU0G6pxmFPXH1jfctpWtbSh3Bz1+/xiPqK1VfX1i9yqFy8bb2uxKECYpQJo4bRxCpqZFGD17frJWm1JdtiiS3FxWhZLjLqD1i74fsZR7y2rYryJ9wLaFzFZVVShJrwau/SOeJ1qi5XqYBbC1W5uvSF7XfKJMztUkKBem4hOvStamwjEKKty7WnKTbe0KZh7udTUrXSo8qxtqtmUHOJrbtGBHOw50gVoKHmIjuQTJtuwn5xPv6bLtM/sQC+wf8ANqX8Ir6VXoq8w/sR+lfLr9RgJazLmCTKAfQkgV9fWHgA6eY8NGqy4Xly8i374DltCYlP4g75XtFTqCSRiGe2/wDT90JbfnA7PnFW577XNCge8Uh+fMaxV1GkWsg+8catRyIRl3QucntGGYfl5b+MAOoWptnaDa9aztM82GSpHcUkkk6Koz6eHOPrWV/UD+U0zBvUDKFhy5iJbTVEpAdto3otGNQzO/CAZnnNdrBv/hjnpJnim1GTasyUukuAD8hG9HWttJGZ6LTeqoA9Z8WEzEBThXdescGa2I6cwg9JxN91WpFmkqWO7/1PE6Pw+0BuR77AvX5wF1ZtYLGC4JItcjMoOSahNenp4Xeh0sIrySIjqrfh7AAeJ7vC4wpCtaVJIqw9awNHdWyBOVaz1D5xAvG4ULQtYUEZO9XcGLNOsZWC4zmVt2SARE+zomqSoJJy1cCukWHNakFusWRbmU4PHPz6QhcVpJ/puQdfLR+WsL6pAPXDad9y4bqI4XLbFGXNJJSEggK28H1JMR9TUA698ztqjcIl2q3IW/dYvrz+8Wkqde815yHIz8pgTLU9EuDvDGV94uFfccDOYxYeuyZKWJhJTo7a+Iibq9QlilBzCpUFUg8kx/tyAqXmGUkcff0iBUSr4MXrJDYMWvwvbB1hIY0+Q6bxS8zyjhY5nb0mOzzjLmZQsBL1bjw6QZ1DpnHM0QCOkb7NiBUwmWtTsl6VHn8+kS7dOQobtnvEDpET1KO8W51h7WaUKqDoD7m5w+tvloGEd3ALmE7JhwyUTQlQ/qJp4e+FrNb5rKSOhi/xCsRx0MRbzsikqCCpzuNni5TYGG4CNMN4hS4bAsBR/KKh9jxhXVXISB3nDhQBN82/lS1JRmLfq38YAujV1LYnPKU84hHCeGlLtPbuQjVya+ED1OqBr8nvFdXqErQjuY1X1gmWlJmS05lULgV6wNvOrA9WV/xJ+m8ULttfiBRbFS5akqOVSBRW3CFvKDuCvIMolAzAjkGJ38yzv1qiz8BV7CN+SntNOBKKKQXW5cNtvWB+KcjJ6f5gGGK8GVO6RL1cEmrachEJAN3q/wBfrIup8zoB/mdrdIlBSVpVXhqX38I1cKgc1njuPnB0vaVKsJmmYiy/0wlQehJO/DlBUtsWoqh69eeohR4fuO8kSXYjtZXPYgmp024N4RW0dYWrIl+pQqDEz3aopqKoBr9C2kEuAPB6zbcxoFiTarMoS2JBBI38fCJnmNRcC0TazyrBujbgC4jKQDmI31p5QWhW1WpDA4x/iSPFdUG9IEL4ntZMtQRRgcxHuj7xHVrdZtRcDPPzMU8PpAcF/tI3e8hZCnOUnQceTQ1p3UEd56xcYwIATdE0JJSpuI08IoHU15wwgDSwGFacLHJUF5VOCaHpG7GBXKzVCMvL9f8AEfrztElVkCQWyhiAXrEClLV1GT3ma1cWEmTyx2ArWqoAfePRWXBFEEmmzYxPSUjD+HEJlJWsO9eB8o83q9axchZq3UYbYsMT7AlNTQbQmtrGCW0t0nKYSAsBDbpAOo6xoYODmaHOOYp3nLUQpblPy8POK1DKCF6x1cdJisNgKlAzFCu/Svnzg9twVcIJ0nAm2/wqzrJQHQpIZtaAMX4coBpCt64Y8iDRty5nnBt5KmTR2uo0O/SO+I0BK/RBsWasnGI/3pN7NJIQFBtdKRBqTc2M4k+gbzycROnXXZ7U/ZTMs5/ZV/8Ak/KLKXW0D1jIlE2PX+MZHuP8zVd1inyUqlrAZQJBP1MBvsqsYMJxnrchhAF83HNVaUgBwpqjTn1bjD2n1dYoJPabDggNngSjWWabNICHZNBm1r8ohFmsYkd5MdBfbu6/KYRjdUtQSHKTRwdHpSHKqLlU7WIm28Lrfk9YtY/vbMkCUoqz+09a/KGvDKPWWs6ximt66zgc9ojfhpnAxb8xPea2WfOOk+wrsX9SX+YhhtEVbk1foftDKy2jbGW7pyyEKUGo5A+cTLlUEhYtYo5Amy9b1RJZSi51AJpWB0UNacLAVUmwYnS0zkz5JWC6lBxSnLSscGa7MNOIpqsC9og21BcqTTaugakXKyMYMrLOQllIUEJqpnUPlGsgkFj0n0O4GlFExkEuWcHXyhPxFi6g/lFdZg18x8vCZPkpZGj1IieN9foJx9PeRqVpuOW6zzZFzVSypR9rXd+ECYtgkHgzVgrVwoHSDLfhsLeeGNNB7+hhiqyxa+OkYq120isxHttiVLUqaoAoq4Lu+3hFOq0OAi9ZXVwRgTqmTJVK7UjvKBcjQcqxktaLNg6CZy27EVkpKcxSCxcMNKxUJBwD1hcQzhi5JnapUoDKGJfQ8G5wnrdWmwqDzAMQin3lIu7KgZluwBISeI0JiDuBbpJl+5/Sn5wXe9uWycqQqUs1d3HRoLRWvIJwRGaalB5PqEYJEiUJaTQOPzeuMAxnqZPay0uR7e0T8TWE50lP6T0MPaO0bSDK2msBXmBbDZlEJJSMqS5fbkftDttijIB5MZZhD97IkTZblRPdyjiT5QhQba3wBFavMVsYilcVh/qFSswCXy+t4raq30YXvGnOBxN19YnmUlkDIOGsA02gT8QPMGlKId0TVTlheZKiKuwiyFUrtYQLs+/cp49pcMEzZc2zBE/vLPsvuDuOVY81YtK2MpH0x2Mm+Iiyu3fVwO8FW+ciTaOyUGAPDQH5QEVOyE947VmyreJpxDbUmWEIyk5dHoX36axihDuyeAIPS1MGLNJPe8/LRJetev2j1GnTdyRHtTaa1yOs5WHtSoIFQo15xu3ywCx7TlfnAjd0jV/Lyv0o8ok/Gr7mE81ZwOIO0mJDd1NUpDtBPg9iE9z3nyoozjrG+6bekpUDXZLatz5xIvqIIIil1bZBH3nC24aVajnUSEpYMSwHoQWjV+SuFH3n3xSVenvDd02JEtIko70s0JB1+YrClrs77j1it9jN6zwRPFouFTlOUkPVtfVI2HcHoczqa1NucwJia7PwqP6gISvQg1SDvD1IsNgDDBxnnvGtLqVvPpPSeMI3jLlz5ZYlhRWuaO3B0Is9iDj6TutpayplHeNF4WkqnZUnukPw10HWJbYOXiFFYSrLDkTVYbemUCiZV6J9ecbqcAHK5/xA3UNaQyce88izzCtwXQdhtyb6wMLkcCd8ysJg/inDFuHe2ldxB7wzbeTQ8ivp3SxQcMMz7Q60K2HPyiJZrKmSBKmpIB14vyENO7Wneh5lwtv9SGfpFnCnSklJ/K252qI+ZyvJ5nS2OTOlikTJUxpii3AneM2MliegTLFWXifr5vEoOZZKkqDUp5R9p6N4wvUTiIMcRkw7arPNlBlh0/qI+BMIamqxHO4dYjqRarcDg+0xYgxEEFKCMwzZU5dB1g2n0rWDOcYELp9Nj1dz1nWyWZapqUzCzgUPNqiBsyhfROvYqoWWY8fTE2eSAgnMd9H6j3wx4dWbbeekxpbCwZ27Sd3XfC0LBX3k7gxfv0qspC8GGqvZsB+8fLSApCVNlLA68fjEFMqxEKuQSIq33OTnKaFOxAqPrFXTK23PeGHTmGbkm2VEoZwkuakir/SEtSuodztMHYLCfTDdmmlU1KpXs0poE/8AUfGEnXahD9f3zAsoCENGbEdjlzDJUUkKWAFHZxT3xl7AFVq+68/UcZH95L0VjoHXOQOkWsUFKv6MsjtQ2UilOvCNaMFf4jfhlHS7gN7dItSMKpUFdtNQlq6jeKTeIkEeWph7HBwNuZ7sEgWUhRBUkHUB9tf25xm1zqBjoZsgMu0TT/Ncrh8YH/46yD8v5wthrBICcyjVyM3BvlAdRr3sOF6fOK361aztUTZdt0GXOKioFOxDQrdqA9YGOZ228NXjHM94yvzLKIRNZtho/wAYJpKmssAYcQej04U7nERrpxdMSoZhTQnhFa/w1GBxHPRZwRiWq58RyTISt0lTAPxeAaXXppayCn8QcZ9xPNanw+03FR06z5iixy7dZylKmUNDR67QTVa2rU7bq+HXse4/fM+0T2aO31DgyOp7a65pC0ul9ToeLHjHWWvXrxwZ6TNVtWc8TPa8crK8yE913CT843X4SgXDHmC8ypVwATG7DVtl2nItSgFnUVLc+QiTqqWoJTt7z6/KJlBkSo3fZESkkpOcs5b6RU0emp06G1WDkAkge30/6nlb7XtbBGIHtWKkq7qQU7U1EJ6rxS65NirtX5R+vwtl9ROYNt0uRaKOO0A7pGh5HnE9XI+R/Q/X2Pz/APcbqN1HP9P9vpF+6azOyUAhjR9SfrBLh6d4OZRuOE3jmZb9w8surOe0KiWegG0Go1aodpHE7RqVPQcRYnoXPPYjvEBiralOvJ4oqVqHmdI3wBkwDelimWdeVy+tIoUW13rmK2b15rJOcxtwYSvvTUeyCUuNTq9YkeI4T0oes3azFPYmbJN8qn2hUlRKeB57e+sBbSrVSLBzPvKWtMgRSxXeC1HsyorKTU8TvFfQ0qo3gYzMag7U2oOTAxsy2FAX0MOeYuYM0W4xwc/pHy55Mw2YFQy5XB6a/GIOoZBcQveNFsNg9YuWm7VqJW1CWfaKSXoo294QqCfnNFluJR1fkOPSBWatR0n2QDzHXD13qdITqGzBqNw84jaq3dn59IpqbQFOY3XhYZsxAVK03CvfC61ErvAJEkU311uVs6/KSrG9lmS1uh1FmzDUcjzi34bYjrhuJaWxjTmscxcPaFCVLU4fTfnFH0BiFELX5m0Fo6XehRk5SWowO7fYPEW0jzcifNjdMP8AJ0z/AJke+D/+TT/iZnz1+cZ8TXtmWZUslISNKiJ+mp48wj6RbSUbV3NyTEG8MRzkvLQpgN94uVaGs+thC3WBGwBzA1rUtTKWSdyB8YcrCLwomLVsKhn6dwJosSe1KZQ1JAfrA7D5YLmHSwMCseMNXSZZ7NSi4c1LDy5xD1mpDjcombH2p7xiE+ajuVY1HEcjziftrb1RfZW/qgbHKB+GZSnc0J8/OHPDCfOyBN0gNuB4GIgXdd65zAJASNVbe+L91y1ZOeZpQXUBgMD9YSuSzrs09Klqypf1SFtS66ioqo5hEo2g85zLpdlrliQkleZSnyjR9oiVGqqk787s8D9OZ5vUVWG4gDAEUL7u9aJhUAW4NrA6mAGxustaa5XQcyf3heK5E50qUQC4SSaPF2mhbqsER52ULzGW78SKUEzJgSrj3d9v3ibbogCVWBbTLjC8R6l2yTNldowKFakGoOrVhF12HBEjeVclmwHkdPpF+3zpIBEkAV2FD14VjSq7NlpSqW3/AOSLl4qRnz5QVMAxPDVnh+kNt254jiA4xN14qmFEtMuXlQQHI25MNRAKRWGYucmDQLkljzOyLhdpydq0b0YydX1QzB1IB2GArwuFM+cpaFEKckJI9N4w9VrGprCsOIXIAUt2hS4MLqK8iksoB+L9IBfrN/4Ocwd+rVE3dpQpFzhEns1gOXJD+TmFrdOa/wAfDdfpIL6svbvTpBcrDEgZk0Ocuz6a0aBm2wkermNHxC3rjpMRu9UlShl7oqKcfhGHbdw3WNLctqg55mrDrBZIoG3aOMxDCB1vKYjxLQMhIDPs0ehqpB07WKMZ7Y5x8p5xmO8Ayc2ySo2lSVJeW7hXwBG8QAyLXlTzPVVOBSCOsAfgJQmKKkgpfugbcdekO+dYUG08945vYqMdYdsFpSspSkBgW8t+YhG2tlyTFbEKgkxh7KT+j3wLevt+sm7rveSiwX5+JtAcJzHupcV6kjWL9uk+Hp4ziXEavYQh6TPNwbOmTFqykd4vyHHpBV8TqRAIOxaWbeT1gm97jmSFGXVqfaG9Pq0uG+feSWTFbcH35mS6iqVNCm0NevDrBb9tlZWY09LI5z88xitN8zJP9QnvEuAd3icmlS30jpG7CirzPV04ltM1fZOkKXoTx5c45foKK139hAIVJwy4xG++bmWqxrSt8zDXzduMSdPeE1AYdIFLkazaOhzF/CtzTEhl/wBs1biOPKHtdqkJyvWMMy1rtHabMaWdBIASaUBHE6adIF4c7DJzPtKSV9UI3deKJUmUJqwMpIprxI5mF7antsbaIKypmZto6zdfmJxOQDJLsks+pH1PyjvkszgW9BxAaXQ+UTv7+0kF62krmZls51Pyj09FYRMLDakjeAenv/ifrPa1A5cysh9Pwj561IzjmbS5g4HUH5S34PukGy5U6KY97Un5GPLWh7rG6cSdr9RsuB9oNtdkCVZHFC7DUnns33gSuev2jldm4bveKGJrKUr7RHeHeJ98VtFYGXa3XiO1NleYLXimeQjKWSmhYb84bHh9OTuHJgtyHkDPv8o53FigzZJlUExqBvfEjU6Pynz/AEwNmlXzBZPOH7otBtAVMoHq27evOO330mvYk1qL61qOJUJCZSFJIYK0YDTevreN1HT1Mr59XsO35zy7m11I7QfjK1NLeWCo/mA+ca8Uem64bG69frGfC6/Xh/tJ/dOIZucrOWiwHGkBs0qJjbn3noLdKjLtj/dy/wAS+YDKdT62hepGvsIf7mQbwNNjb1nb8HKSVEZWSH03HE8I6aqwxwwOIPzrWABzzM9svkqJSg5VMKv5eucct1jvyOPp8oWrRhRufkQbbpAzZc2UnUczTw1hUDb2jlLnbnGYAkXEpRUSx566cXhs6oAACPNqlUCYLfbZdjLksWbKBUke5oNVU+qGP1hB/EXnpBf8+f8AU+cN/wDiPnOeTT7xZwtLUJyFpDkGg+0UtcV8oqTO0V+ks3ef0hctnCpAUpAzEbivn84W8N0NdukZ2QE84+f7PeeT1dhW4qG4ipiSxSkSwshIWSQd3atIhqrLtAlnRXWO5XtIreloAmHs0kOagj4iPUUISnqMr3WFcBRzO4sqZ4QO1CVO2U8zsYx5jUknbke8+tQWjB+vEahhBNnVLmJJUQcxUT9NYlHxJrgVPGYKp6zkAc/rKdh+fKngIJBp58fhC2hoW24U2cZ/X5SDrUsoO8Tnfdx97KghMtIonfmzaj3R3W6b4e5gvTtnqfp9+83pNb6ctyx/f5yPYumzpMwIE1RSS4J+HSKegWq1NxXmXS/pUrgZg+RbVrAKu8PZKT64bww1SISBxGK23LmbZd7ok5ky0a6HVvPWAHTNbhmM+YZ6ztbLVY5nfUhWdhmYgB+LRmuvVJ6QeJgAjqRiFrju2ygFZSpQYkClPHeFNTffnbnExYbBwuBD98YhyWcJsqmIDEKYFtum7QvRTl8PnB6/OJ1aQmwtcM+0AXFe5mLaaWUKA8tYY1WmFa5rHEdsrwvpEIYiu9MxOZCmYaAU5+P1hfSXFDhhB0Ow4aT+aDLJy5kg8RqfnHoFxYPVzGSAo4E13VeSJcxJCT2mzGlfk+0BvoZ0IJ4mWZSdneWbCU+XMGdau8kMRw8fXuiHRXUlubDgCef8RWxPSg4MZPwcsOcwSVF9dODfGKHwVG0tvCk89ent/uSvOsOBjOJPMZqnF0oLhRNEnWJum8vzCzmek0ArCgmT6zyJyJpBSpI3cGo+Z6Rbd6nrBByZU3Z+kp90W7LZwpBUCGqd/DjSPPPuSzjr8pHvp3W4YAgzHPxUtaFCWCDo5DOODwcUMpwx474hE8PRWBbmCrhsMyapUxSsuuWr6cK1jeptRAEUZjWotWsYxmNF3KUoiWp1KFHarcesIFdx9PeTrgqguvAnWbdqpKVMoHUkPp5xu1CDhphdSlzDiRnFdp7SapWpetXcvWPU6BNiASteuKgoGYCzj0IewYnvX2/QSzfw8uGUma5yqVw4faPNva2ouSsjgn7H6znil7rV6eJU7XaciQaasa6R6HW634eoYxnoenE8pVXvbEi38SLxnLmZQ+VNSRs8QdBtsJssOSZ7Lw+lUqGOpiLbVpyjdTVPE/WK1QOflHbSAs64Qukzp4BOXeu7cIz4hqRVVkRGlWq3WNmV6/brXNsgCEqHZ16/UR5vTuV9ZHHv9Ynp71r1B3EeqAbjvdMmZ31dmdg7EtBrarDh6+3cdo9qaDamBzNWJcZyykFE3vGgLu3XjGk0199u+0ExfS6DyvxjiLNnuaZeKgVd1I9mmo3IPWGzqF0Y2ryY7e9VS4bmM1h/h+iXKZRer6sQT84Uu1tzHf0iA8SUHagwJlvLC0uVKKwzgHWMV66x3AMZp1hd9sn1x2A2i0CUGFdx6aPQam0U074bzMMxYcCVuXLlSZeRKU0DUGp4DcR5Mu9jZMR/iWNkmCp9hlTJayXS+r0ZqCGFusRxjmMix1YDrEy/bEUd5BL/ABG0WdLaH4aOBiV4h3Cy1dmBMSVPWmvJ32hHXBd+VOIG4dweZmxVdGdKTnJUkn9oJodTtYjHBnEw/BgW6rmUqakGhG48N/GHb9Uq1kiGbCjcZWcPWBMqXMSVJzqYgOxJ+kQS62hift9c/wCpD1drO6kA4HX6Tlf89UsKC1Aad8nSm0DWsl8HkwmkVHwyj7QDcs9E49mJ5KgSaEgnh4QxqEev1bOI7flBu2xku25wskHvUYPx/YQCsNYcLJ+o1ewZHH+p7mXYpTyykp4Nu1YGq2B8Y5mRqVXDg5nuRYZSmQZbMWOgHUvwjqHccZ/WZe6xcsG6wNe0k9o6RlALMnbm3M/GN1uMYMe07DZhufrB8zEolryoWykli+qmOtPKGa9K+N/9u0L8Irj1jrD/APq/a2dZJbu14ws+8PtPPMRGl8u4YkeVdU2bOWEJKg9VAUFY9ONRXXWCxxK7j1ZPSFv5YV+pHlCnx49jNb19pScO2yxyCSlY7UpqDr6+8TEexfW4JxwOOJF1lWpu9JHpnO/LfNWruMsO5r5NWsLgh2LWk5hdLRWi+ria5lyC0SO9lIYuOe/WPqVsXNiHpAfF+TbiTBGFz+ICfymreOkWz4h/Bz3lnKD1yuXRhCQiShQHeRXpxrAF0bajTNeX57jtgf8AU85f4nabSo6GExe8nIpEtqPQcOPxjNmtoWk1VJgc/f5n5xb4S7cGfvITjHLMtoNMjsW08+MOeH7k0x956da+E3fOCL5s8hMxIlKKkuM0N6d7mQlxg9pyxUyM+/P/AHLlgK8LMqQESmUAGIIrwiNUfJsbz0BLe/8AiRvFKrfM3kw3eqkFKZf6qONm0jGsekqqqOT/AI6fnEtMHDF/b9YuTrknEBCw6TqeUJeXYjZCkSsusp/Ep5gSdhs2deeSWCgzM3vgzareuLRG69Ytow/Wc7Ci0gKM4Monuhh8d+Mcu8ngJ0hGNR4XpBmI5iVFKSrvjZ99dYY0asoJxxDUAgfKZrNaJYZE6uWgU1POCujn1V95tlbqs0TLcUqAlEaPm2+3zgYpyuX/ACmQmR6oYu2VnyiaSX9p9Orwna20+jiL2sVBKQharoSgDsCmhd/vwgfmkk7zmLV6ktnzIl40vAyp3aSlkTmDtoP3it4dT5le2wemPVAinGOPnE+9b9nT2zrMWKNHVT+ERZ7z+FBiM2A7OCSskUqXo3RtYmeKOQNojTk+UOvMo0rECqKkuQKUHCIy+ZU2c7TJh0KniyOiZw7NKzRxU/GLrWIumrt9xyfn+/l06Tz5Q+YUEVcRTk07P2inTiNoh2+Wzjb0lrQo/O/pM0uQUylKKCVEADj4wA8n5QzOGsAB4kvvqyqRMKlCoLgHU8+vKPR6awMgUS2hBHE6XrfSpSEJlkuoVIjNGlWxiX7QTkLyRmYLtvpZmJRPWTLfbY+EMXaVQhaoczCsQxBxz0/1HTNJ5+X2iLi2feuS8zlqIYkq47x6jaqjnpAGx3wE6xxwvLtLgOogigf1SI2ubT4jT4C+uWa47ItCEgIIJqcxp8IT0lFzH0Kcn36YnltZcjuSTwPadZ+H5ZmdoWCgHZtobs8JILZbHBbb8hBpr7AmzseIhY0xWuzZ0JV3S7DeE9HpjqMjJxn9Ja02lq2C1xyJOLrxDNkTe1BosnMHcMdmi3do67q9ntHrCCP4g4Pz6RikyLNaVJApnJKgS7fSkTWe+gHPaFYsF55EXcV4f7BRVL9gmjVpFHQa3zRhusUupDJuUYPeYrivybZVZpRrw9awfU6VLxh4OuwbNjDI/tH25MXTbRVag4rUeUQtXoFqPcw66enZlBwY02TFJ7yAsULMqo0hX+OiYydv5/pE7PDkJ3Y/KG7qvAzcyFgUYigZ92jiOWGx+e46cH9OsQ1NAqwyzzNny1khZcg8NDx3aAMwYksZpa7EAKiIeKLAFzmlFI8KnxHlD+kt2Id2SJc0rkV5eB7bYnSJTF9Sp6eAhqu3B3xgN3g60rMuzUDDORxJ+m/oQwgD3/adJAOYSuO8ZichmE5dia+H7wtqaK2zs6zNiBgcRimYklzgEoYLYhSdH6c2hA6N0OWHHvE00pQ88iJVuMqctUsKIWKgq35RZq8ypQ2OI5uGdkDWS5FLm5NHqfuIds1Sqm6K/BgNnPEcrDZ1SShSQGPdUltW1iLa625BPzEZYhsiON0XxIRLMtYCE8vj0hBqnJ5Gc/nJeo01rPvU5M32y+EKlZZZzJBf1wpA2LbRVzgc8+8BVpGFm5xgwVarf2uUJDEHXcJHGPghX8Ucrp8vOe/94RN9AJCHS2lak/SM+vbtxxFvg/UWiTft3dpMCiW3YVfm+0UtLdsQqJWqYBcRcxQZYly0I9oE+PGKWhDl2Zukzdnbz7jH7+kAWiYSAMpDHWKCKAScwVzs6gbSOZz/ABU3/kVGvLr9ov5t/wDy/tHu5sP5JmcJKgBtXXjy1rEHUa3em0nH77R9mRRxwTGi67wlWOanOjP2hZh+V9yPWsKV5s9ZUEL2PeJ6ml9TWQpxj9ZWJU0EBtCHEexp1NbBAnQgYnjmUgnMyXvOAlrqxyliIneLalUR1PXHH36j7/2h9KhaxfrP5kxOJvbntHLEs/D9ozovL8r0T2FwJZcDiZ7VYDLlpUS4XoOUES4O5HtNGvYhAOcw/gOzdpMU4ogNTnx8oQ8Us2IMd595hFfPY4jlJuNCJQTMILn2Xf5xGbVMz7lgzqCz+kSd4muVUiYVIByGr9eEeh0WqW5MN1nWUk+ZX9xPlwKKAs1HCu/D5+Ed1QDECH06kLg9MzWTnyzSpkpplq7nfr9ID+DKY5MP3jzdVtIlpJVlDaj11iHfVlzgZMStrBbpmL193+qSsolLLqoSf31ihptGLV3OOkMqKQNwnawLJWE586iNBXy+cYtA2k4wJp8YzDFuupUpCZmXMT7QI1fTw5QrXdvbaeB2i1d6uxXMAW+2S5a2UGfiHHi/xh6qp3XiNDpyYQT/AFJYTLSDmLA6gcSOAhc+h8uekwTtOSYIGF1y5uaYCBqOJ6Q4derptWdFtbcr1gvFlkaaWdK9a0eGtBZmv3Ey6F0BQ4MxXLM74KizEZq0MG1I9PpnaGZgQw5EexeSCE5Rlo2pZnq3rRog+Q4JzzOeW3eKuJ7cRPKUuEJo+0VtFUDVk9TO7ymMjibbktSlS1KKypiA23KAamtQ4AGIQ4OMRgsl3Tky+6oqMyoI24DpE97q2fkdIBra93PaYZ10LlJWqYrvNR+O/poOupWwgKOIRbVfG2LC75XVld7R4qDSr3HE3uU5A6wvYLolzO+olSiASnhxhO3UvX6QMCcZiDNN43dLmAaJKRlAGnTkYFTe6E988zikjrBX+iy/1j3/AEhv4p/ab49pVMHXOFjMVByGIbWJNdPxNvlg4/zIfiWqNfpAirjed+FmksCT3WoSOfKDaTTlyaz2MoaOwWUhjHT+HF/9tLKV0UEgs+x0Z+MOaCwaS9lPIIOOe47fWRvGNJtIde8SP4hYrmficqFkUomB6en4stfYOp/SVNDp66qgpHJge+lptFmBUQFoqeJMfaYNTfgdDHDXyR2iUueSAMxd2bh9IthMHpFWvyoAPJOI04St3Y/lJfU1HSm8S9fV5veN+UDWBHaYtSh25FGbj7oiAAHyxF1AU+WJusVnTPQc6QRvT2ekCZmrb0mAtc1H0n/uA78u2RZUKUoguaAa/ThDunttvcKIzRe9vbETJ97SfZShQBOx92jRYXT29SYfzlDYzDtqvRZs3dQAhgM24MIJp1F/qPM+FYD5J5inaLP+YEq/VFdH7ETrVnORHHDNgly5iJiFEsA51AO8RtZc7oUYTF2ShWPNvvGWRnG44+6JBRmbGMSVTRYvpMkGIbItc1a1HUuA70j1WksVawolSyjzF6w7/D29hJzZg+WtT4GE/E6S5DLB20GyoJmP0i3ItRcMlnKRq7a1iLajITniImptMuOuYpYzuorSJik5VDfl9qe+H/Dr9h2DoY/pnU+kHMQ71nOQEjKkU9GL1C4GTyZ3UswwBwJtw1eJQpSVDMACa6Bga8ngGsoDAEcT6hy4Knt3mm+bUJ0rupCXJqfWsD09flWcnMM6bkIz1gq5r2VZlg8DVOx8PnDeo0y3riJJata+XZHkY/lFNAUq1AiF/wCHtB9xOCqonlvzng3wbQCZlSsEBO5cRo6byW9PbnMbWkV4C9IOmYY7HJMTuxrsTsYYGv8AMyhn1bJkgDmabdN7DvDVTd3gBry8IFUvm8HoIRfVxP1mu5awVrPdIzAcQdm4x896KdqjnpOFwOBO/wCGVxHkIx5iz7cJUML21BliYhjnCcoGzvA9Bd8I7kjL8AZ++TPL6+pi+1ugzPd/YRkWllrAcVUeO9TFB9CyVm6p8f8AL69YPS+J20+gc+0Q73tkqzBcyQo5kgpDag/BhEuhHtcK3Q8z0NavauLRJXOtK5kxU6YXUS55/aPTrWiIK06TNe7d5jDGO002K8al/wAwqTsNmgVlHAx2jNWoVzPtkutU0uhJUX2j6zULWMMZ8aUJ3mPWD8OqKf67gOwSrX9oh67WKWxV+cFqNRsXCnJjdfd3NJUiWO6NQOW/WJyNttyxiGmv3OGfqYjKxl2Y7NIAbiK0iqPC953GUmor3ZY8xZva1TLSsJdSlFgB8minRWmnXOMCEsrBXYOP33jLYP4WzVIzTFpSWoHFDzrCr+Lc5RePqJMbUaZTtOSfvNt83YuyyAhTGUE1PM7inhCVNovuzj1Hp9I9TfXaSw6/4iJc1tackEApWcpHWLmoqzWcdRMpqNz47GVmxWaXLSqWHzV215R5Ox2c7jAuzsQ3acjKSiUCphLGoHyju4s/HWb3EvgdZPL4tCVzFMnKjRJb4x6LToUQZOT3j4BAwZ0sl3sAz1qSNufWM2XZJnRgcCMeGhMSUkklFWibrNjAgdYC/aQR3lDvG70WqzsQ9GIbTfbjCi7totr7YH3/AH0nn6rm092DI7iW7QVqRJBIQC77NFvR3kKGs7z0JU2V894As6+zlqJ/MWpyig43uMdoKs+ShLQtYrvVaJWUFgk+bwpZctL5PeMPtZeZivC5lpWEMrM1KfCDVapSpbPEBZpxZgg9JqXhi0s5Qw6awIa+jPWfH1cBh9hD+F7tUlQ7ROXL1cvp4RP1t6sDsPWEsbCYBhy/rzShPZEpzqqeXDSjtCWl07Md46QFFeTu7SdXleJ7T2iQk0ePRU0DZ06w1lwrOIWXiMky2rLSxIpr5QoNCBuz1M2oUjI7w/8AzlZ/+GEP/GX/APKA+Hb/AJzBgDGf4RXYzaoJ7pNcsP6zRsx86rGe8V1OnF/oPBHT5j/qVhF+9ohSipIQatvl3r8ok2669w1bHAPbiSjoRWwAGT7/ADkmx+pE2cPw6SOP3il4d6FJfp2l+iu0U4Y8wNdt2kAFemig1eoEM3XgnCxlBtUCNt04ATNAWNKmnLlzic3iNpJVRnEQu1lVJxjmEbQiTZcquzKNSw0fiRqOmkJKbdRkZzNIXtyM5i7fGNlCcGAGU0G3PxijR4WGr57zXl01DYx6zpeWMlrSMmqk5SQdPCM1eGhT6+0JXpUXpAN33SbRNGUDvPqfTw9bqfJr57QrhF9ZEqNz4UkWdUtRT/UDOOGhcn5RDu1VjHbYft8pHu11lisE6fvpHK3WQolugU3SA/lvDus0D1UB0HB6jGcSLTaHswx+8SMSWtM2QqUtDJO24PEE+ETtOzK4KnpzL2l0+x92c/v2iHcOGVomBUwDVkginEGLGq16smFj4CoCQZWrJdSVS86j3xV2825vEVKg1bNnH+f+5Ct1TLZtUcRdvlJ7Myggs9Rq3J+H2j6g4fcTzKdGC28mLN9XNmSlkkN605mKOm1WGOTHUsBzmZU2aYlJSXCSGFKtw+8FNiM2e8JuUmZU3wtCky0lvynceHWCnSq6l2nxRT1lswTl/Chnfd3d+p3gvhXl+VaTjOfb5cTx/iu74iLuKbqAzTEIDzA1GptwrEQnY4yfT1AlXQandhGPSTnEeHkyZADgqfMehDeFYqaPWm235SqHFwIxxAuHLTNQoplksRVg/rhDusStl3NPqVwNp6CMt5KXMSlKQxDE96teJ3MTaQqMSYRAFOY74WtSSjJRSxQg1p84l3Aq+7HWSNdW27d0E6X3Zgp+zZKzSmkDWxQ3I4n2lsKj1ciJ983X2mQBQSsUUVcNupilptRsycZHylOuzGT2i9brrSlJQqqgKd3XxEUKtQxO5en1hsBxyMiLKkFLjiejPFQENgxIo1e5Qev6T12SePvEc3Gb8mv3/UQjbLqVJZRJYlkwtXqBb6RCrWFbcDN2Gb2m9plJdJPsnTw4GAa3TV7Mjr7zle6xSXGJVLhwmiagzlqcE1B9w9cYmVVW3IzhgoXj7yVrPEmqfy1HM8XjhFSVGaBs1NAODQFhqKqvWvp9/n9ZqnxJG9BM2WC9ZVmSHUkED2KDxgOnexX3gZ/tBX6azUN0494uXvfVntImZT3spLEuzc4OtF1bhiMDMoafT2U4Bk2vC6FvnPGqd+Uegq1K42iHt04scNmdrlsjTGXQK0HEmg8RrGNTZlcr2hErKAxtw9dCrMpapiCSkO/Bt+kSNXqReAqmDssV1AU9ZzV/FScia2UFNAcwFW5w8nhrbM7ufz+3MQt0mlDbCCDKLcP8QpM5DkgKaid+esaXxLUaYFLEzxxj/Mm6jwZ1IKHInO/L5lzUhpYr0r14xH1epGocFUCY9oxpNG9TctEuZbFTVMADlU5Ds7aM+0bFS1jPvLIQII+3LPdAUpVBsSG4tCtXB9R4Eg6tMNhRyYvYuxLmQZSRkUd0MD16Q3XuuYOygD6dfrH9DoPLO9jn6xVslunpZgFDR28PdBrKaj14lNkQ9YUvC3pEoBRDkEFfA8oVqpYvlfygUrO7IiWgJE9Jz/mGnvMWiWNRGI2RLzcFtlrkAIIB0PPn1MIaa2sac1HCt3+Y/wB/6+x8drabEuy3MwX/AHmJacvZksNeXEGEbSHxWBjHcxrR6Yud26Te9bUiZNAX7Jf2t326Q5RW6V+nr8p6GtCqcT1ZZkmzKKpaQoHf3eUfOLbwAxxOMrWDB4mSz5Zk0zXITsH33bkPnBX3ImzvCHIGJusV5Is60sXKwxbbpz0gFlDXKc9oOys2Lgwhe2IUygABmTqSNn58YXo0TWdeDAV6ctyYq33fKlpC06H5RV02lCkq0bVAomI3otaUhsxAbwrtB/h1Uk9BNgDtCMzDSpsvOAAWqOI+sLDXrW+3ME7oTtMHfyyP+/lDHx5+Ux5FU9WK0ImpCJjlIrmJapjliPWSydYbIYZEbbiuJCFSyljmq5HSJOp1bOCDFrr/AEn5Q9emLZdmHZS1aAOGYEmm+kY09NzphDhT1+cQr0BuPmWCcrJjwKeWpVGZ+W9PnBXp1S17Qxx7TT+FKDvXrEDHdJvaIWSlQ8A20UfC+U2MORHSzLT7ERbu4FRLOc3DaKV2APpOaQs2Wz1/SU3B9w50AqLguXIpwblHnNbqCXwvEzq9T5fTrCF43XKlKSQkZiQOghWu6xwVJg6b3sB9p6xpMndmmXJSXyhyNxv1gmkFXmZs7f3mNCqZLse8m8y6kMor7qnLjg3EfKLw1D5AXkSi1SMc4guyylAKWlXsF/pTeGnZSQpHWArQgFg3Q/aOeFr9XMlqSsaAl/XWIuu0a1uCs6ALFDgYnm7i81TKKSTVtAPvHbuEGRmHf8MZ5U5SXFQA1Xd34RLZQeYmVB5ga2TwJp7Qhzz+BaHa0Oz0RlF9PpmkImMPw4BQWBB22cGBZT/5usxlf6+sT8bKnCaQoHICwA5fWLPhoqNeR1g7WYVgpyO+OsC3bMyrdTw7cu5eJ3TEhiDHrD2KFZ8g1NBweIWq0IC7pu7To457R5kInzpRE0ADVJ3PWmnOJj44KyWzU02ZT7yP40scyVPKV0cv9Gj0/h9ivXxH77N1asp4nK4bUpSikk5DVT8BGtVWqruHWEotazOY7Wm7RPYSfaAb9+nxiGl5pybOk0LPL5eYbbdyLOh1KJXwLuTuIPXe9z4A4m0sLnjpFO9LevP367NFeildvpnLbhUQMdZusVmzSmJy1qefSAWPtfIhgTjmGML3WO1dSRkDMo6k8GP2hLXaj+HhTzA2ttU4jniC8UybOzgA68vn4RJ0tRsswJP09Re0se0mX+sD9SvXjHpPhj7CVN6e8GLlLSgKFQTpzhkMrMQYEh0UbOY24St1pLBfsg0fhuBEnX1accr1nCuU/iDn5T7f93OpRIJAL5uugPTSOaS/AAELWwIEV5smYV5UIUBw9bRUVkC5Yzj793HSaF2rIgy5qMz6jcNpXpAxXvYPWcTtjAD1QjcF0CYoKS42KX+cLarUlFIM+bbWMgSv2G7Vok0KXAcUiAamYF5563UI9sA3tZwUjOC5q/yPCPqXKniUqH59PSFrpv6Wo5UgFaU1zasBXpG/XUN20e2YjqNGw5J4J7e8nmMrRImFXYqSlZooHUnevGKegSxMbwdssadbFTax+kQihYDM0XsqTmL7LVTb2/f7+kd8GWMzEKSzAhgeZ26RE8RsCMDGrXCKDGm6sOKSsF3JosnfanOJtuq8wbQMe0Vu1i7TC1+WBlPLTRhTZ/XnAdwDY7RbSX7lw595Or8u9QnFSwWKqD8vTrFvTXKa8L/3K9bArxGi5TNkye0LFPvbn+0S9Rsst2jrFLglj7O8C3pbUT8/Eqb6t4Q7RU1WIzWhQAQReVwBCUgF1mr8B+0N06wuxJHE0CGzDmBk2dMwIUAZtGpSE/EfNZdw/DF9XvFZ29JUr1sqkylKlqDlJbj9IVu03lqtgOVP59szzmntVrArjvJVeFmVPUU2kB2p+p9y/DlDVVgqG6o/6npwEC4Xp+kA3hZpVmBOZyR3RuH3fSH6rLNQcY47zRsVFyeghXAV+TM5RTkTqfGFfE9KgAYRewLcmWEyY0t57QqJ1JD7dOsF8OqGzEKrLTWIuIAWoP7R0iicoOOk0NjsC3WUyw3Kj8PlopaA+nz+Ueas1LeaW7GAe8iz5GcwjLRA77ChG+x9CO5zyx4hM569IFvEzeymCa5dwBu/LlDtPl712Qo2n8MT+yP6VeUWNw95naPYxiN6SVqCkSwCdiaeUTvh7VGGabTkdcyiXfdnaISpAACgDTjx84guzbiOsmW6kVsVabr3syOySkjvFwHFYwpK4I+8BprHNhPaAAmWlQS6XZiCNTyMHy7LulDLEZiHf8kCerKHG4HGL+kY+UMmNqMgZny57WqQ62oqgD6x9qK1u9PtPiuRgys4QxL20vUd0B3+DREsFmmbb2kHX6JVbIHWZ8Y2oIlqWk7bb8uUCpVbLgB0hvD0Y8NJgpc2apXY91h3i7HnXeL4FdYHmcyw3TEXxJmTF6FRB9wihurRfaTzXc9mT2MPS7tXMKZakEOny1fWEDeiAsDKLEFeY34SswlKKFqAKSyVA6+G+0SNdYbAGHf9IpqclPSMyi2AqJ71AGYjcc94UpyTyeBPP3BQOOs54llOkEEBDHffd4NrU2lHTlT0+vf7zWgfDEEc/wCItWCUNZigsGvHyhaxucKMStazdEGJktSiVEO8vRIAoePT5QVAAM94ZAAM95wsVzhiCgAE5gdWfXXlG7NSc5z8p178d4t4kuicJzIUSKb18OVYp6PUVGv1CHqs3qCOI3Ydwp2aUzluCobjx3ifqtQ7jGPTniIajXAsa15xGSTeKgGdw/uGr8ITFrqMA8RB9MpOcRfxLKRMlTVyqK0f4V4QbTtttA/p9pQ0pdGVXkhvCRMSl1bFuJj1lToThYzqQ+zPtPN33gqV3gqujR22kWekiDqvCJlzmHLPdi7VJKg6lBXmOPOEXvXT2BTwI1YUZcN0M63dhyZJUTNBcAEEVjF2uS1cJB0AKOuTHa7FK7MrAJfXYgcGiJcBv2mCtA3YMZLDZEJBmKAKlDxDQuGG3B+3+5MutdiEXoIuYqvKzyx3wFEflevWGdHRbYfRwI9pUsxknAif/NFl/wDLp8vvFf4DUf8AOMeYv/OK13JSFd4kNUD1zipcWI4mdKqAkc5HvKfhG/8A/wAKeoywfYq5bkesec1elwQycjviY1enJG9BkzZiC2CTRCirM5zHZ4W09PmNn2nNMhsGWGIg2q/DnDkKYbetRF5NINvAxHsovEz2y3iYok0J3gldJQTYwOJzst3rVQez+pWg6cI09yL9ZnGI5YQsykhQlqSqvfb7jhEbxBwxG4Ee0X1JXA3Qvia1os8lPaAqzaAEV8/VIU0dL2v6eIvp8uxI6CJ10W2ZNmKKEJy7DK1OsV9RUlaAMeY9kFcmO2HMP2dI7RaWqSX3OuvCJd2qdztLcfKTtVqbAdiTNe9plmarYJBDjRyNOf2jlKNsHzh6EYVjMmJvOYifmBJyk8fTR6b4dGqwZp7mFpXHH6xgk4yW6CpaktQiunwie3hijOADNfwccjGfcShqv6XabIZZUO8KAa6RKJuqArI4Bz0/OT10bVajzFgq6rASgy692idnH0jltnr3DvHLrQp3Q6tYlSkpWEKGxHv0MLYLHiIgGywspInVN9WeShqEkOBwMErViD6cmDbS3WvkxblX9Z+3KlTEkDUnXwgx0l3ljgyi1D+VtHWNN4YgkT5XZS1hmoXqGfy6iCai5zWtewgA8Z5kvT6K6mzzHEDM6CUrfiQfVIS6NyJQz6gCJgl2zsEKMwBSRX0OMMGvzmATrDMnmHg4gO+LoFrWLRIZST7QDa9Ie0+pOnU1W8GERwgCP/7ihNuWbnUkpyipcgtFddVXtBBzMGgszYxgxkwReKZczs1KCWDDg76NE3xKkuu8CEtrBr2jtH3Ek1IsylIOdW3rlEfTIPMAJ+snaRX87DDAgPD145bPmXVSiwbiYY1dObcL0EcvqLOMRosMl0CZMUwY5RuftCRUDP7zJ1r+oog+slOPbMTOUtyXPuj0nhdg8sKZSZCaRt7RS7D/AKnyitv+cS+G/wDqfylNvL+H60r7ZJdJYkD7bR56vxIivaw+8Zq1lTPzw0F4jKUZEKVRIbus78/W0F0eXywHX3jiMMbjBl8XyVoSmhyiijDOn0oRi3vPmwgJEX0oLim+sUCeImEO8HHfrHW6LqlLlgls+7n3fKIuo1FivgdI67lTMmK7CqUlDd3NsC4H3guguWxjnnEwXLoQp5h3Adl7FClzCQSKPppCPilnmsFSA1AYqEHMO4hu0WyzJlyi6s1PtxhTR3eRblhFq38p2NnAIi+mTMkBNnyvkHeLeJBhxilpNpOMx9SjDeDDt2W5SpbEjJvv4AwjdWFbjrFralDZxzPNuVLMpeRgrZ+O3j9Y7WHFg3TqBw4z0kqtQV2pJST4fGPVJt2AZhrNwt3bc8cTgJK1nRydBBNyqIJqrHO5o14ftkuzzEJtGZBGo2B5xJ1dT3oWq5hrM+WBkZj1Z74kzMxQXbumtNNHGlIhtp7KyNwiZodcAz4cigp1HKBp9456lI45m/UCOIARdnbBa3JNabAasYoHUeUQuP8A3GjZsIEAS8LqWoKehJpwigfEFVcTrbN24zqbimSpoKQeXTn9Ix8WliYM2LFYZzG/DVn7KzzpswkAjuj7PEvVMLLAi/sxHVMXtRF+8nGIb6m2hSnURLGgGnUx6DSaWulRgczdmVBC8Dpke/8AqFP4e3ymQshZORVC+0LeKaZrVBA5EyK/Np2qeR7yjX1d65oCZKE5FJCkqGpBqXaIdZFb5OYvp7lrybDyODEy04TCVZgohjUjYvFJPESVwRKK3KecRyui0yRLHakGlTEp1PmHgyfqEtLfw52u+ZYioZEkh9dO9G2yp9YOPrB2rqwpyRNV7zELzJlNmSAGfQQNyu4HHEFpldMGzoYv2TDpnLzKCaak8f2hj4ggbU/YlC3WLUMTV/K4/XL9eEc+J+f6mC+P/wDqZmuu2TOyXmLHLlckFjxAjNyIHGOkLbUm8fWSm8StU1SSXU8eqp2KgI6Qtu532L8jOE2Tkar10gitu7TD1eUAc55jdYcNhcgTgWo78W4iI9uu22msxnzVVtsG9pMlTggk5AaAH3+PzhrallW4dZvkn5QtaSZoR2jqL92tOp4wmmK87PvPgAOkG3hek2WoomAklik8B8+kNVaeuxQy/eYLqrAY6+0pGArUlcok6oGY0pEXU1bLST0HMl+JKwIA78QpbJAtRWUhiWZt/o8K72NmQIGtzpgA3SYbNdqbMlYmIZCe8RqeXON2M7vg9fyh2vNxHlnk8QbeE2XOkqKEsxdtDTyrG6leuwZMZrVkf1HME4du8TZpSZZp3lF6MfjDmqtKJkGG1NvlpnP0jTbbkkS3IlJroQK9fCJ5vs6bjJ1OptfqZMMaXeUTBNUXCjvwj0Xh1wZCg7R6zaQG9uPlASbUqUo9mpWUw8axYPWOZg2eU+E5B/SOd1XupwkBQJSNdGoXiNfphjJxjMbdARkwJeWKpyVKSjuh2LD4vDtPh1RUFuYrdctZwFyYRw9fSsyVlWarFLfH6Qvq9KuCoEY9NqcRotF9ZiwlkpJYOdolLpdozu5gVo2jrNl6q7SQJQDOdvPSBUHY+4wVS7bC5gm8f4fns80ouG7w57+EUKvEm/E449/adTX1lijCL1muJMhYMxPdetIbfVm1cIeY2gQA+XLPghzLLtlA7nEA/DpAfCK1suff0A/X6zy/i2A4x17wBj63ywkypTJU76NCxWltQTSvoEoeFVWfjskrnmenOVAhJ14RVXyWwB1l0ETlZ501CUqBUlz3S+0bda3JBGfefDkcyhYct6ZhCkjvUCnOvXjHntXUycGIamvCkGFcX3qJQMpLoIFDxPMR2unfZgDgdYnoKC/8RucxK7e1frR5w9s0/sZX2p7TFMtihnSlwlSWBOnJ+UHFSnDHqJvbnmABd6lHMhQcetTvFDzlUYYQVlRLblOD9Jwl2Fa5iUGheNm5FQsIJqrGYbjwJW7Bcik2VGVyCC7eFekeWttLWFyO/wDaLvqk84qe0VLThlalqUqmzb+WmkUU16qoUR4XJ2hW5cNrrmBZIoDvwMK6jWA/hgbtUi45hpFwSlJBmpSVD9XnXhCnxVikhTgRVtUwbCdJ5tNuRZ05ZbOSxH7R8lb3HLTS1NccvOWHMaZSs9nlGgHHnXnDoos0zBkIJmdV4cLQOYQt+KUzsqaAliaa8oXtW2zlwOPaCo8P8ok5gNYUueBlBSWrz+EaGFqJzzH8hUzHKwplWZBUUe1qrpu8Artx+IZz0+UiXeZqXwD0nOTe1nJNS40qK9Y4EVeSp+X/AHNtpdQOneIOLLMq0EsCxJ8culIo6GxaeT+8yzSiivY0CXHcDELWl/8ArV32DcIc1OsyNqmbCog4j7ZLkE1JYBDijUNNvKInnsGwOYlbqvKPPMF2rA8plFiDV31hlfFLQQDNrrFY9BzEy13Muzd9J7rnxblyixXqlv8AS3WOVqgPp/KNN03uhVnGZIzDUkfDnEq/TMtvpPEG9Tb8gzbImZVFg+Ye1wOwDwBhlfpMsMiGsOWueEKSrMoKLB9hygV7AHCRHV1VFg3QiEP5Y/EJzEUBoD9oLpdNqXQvUOIufEVpbbNFom/gpbJIKzqE1YDhH2LNOxUMNx647fLMEi/GvlhwPeCFzUWuqpRCtfH94A7PW+QevtHVVtNwG4iubVLKpktTFJOVuLOPMcYe8twquvWUtpwCJxVd8uSgqqqW1UmrHj18I2Lntbb0M6HLHHeCrnvwCelg4csBu5+UN6jSZqOZpwrqQDHq8OytiM6qKSNTro1OURleyl+ucydUr6dto5Bih+Ckf8h930in5t3/ABlLc/tMN1MZbzF12EHvyHwgncnjE9C71Z+4KhXXYMeEc84bfV7Tu4Y5hu67jmTCCCnKKkgA1FSH5QldqkUEYOf3zAW6hEHPWVe5pQQhIFUka7Ny+n0juhXbgN0Pf2+n+v8AueT1bb2JPWYcQlCl91IzDfjrwgHidlTXnyx/388RnQ71Xk8RckGbnZQOV6GoMJsE25HWVX8vbkGer2UqUkkamoB34u+kfVJuYAzNGLDF+VZEzCla1ZVfpZ69YdawoCqjIj5crwBxPN63YmbT8w1aldo7Re1f0n1dhXrMFhlpUvKXC310Y79dIYtYquR0hXJAyI93CEoDKGZ6qI0Dc/lEvepf1DiRtXuc+njER/4gYqtSlqkoTllEM7bbVi1odPVYBa557D2jNGl8lVKDJPU+32izhedMTOSVqUkKIcnSHNcqGshRyI5V5hU+YJUrTbUIs6mALa0rXhTTmI8xWjM4HvEFrZrgTNWG7DmAmZSpanbgBs/1ghV3bYgz/v3gdbdt9JOBCxIevd7wpTr5QA4zzxExnHHPE3XiEEAkgjcjh4aQ9qhWcNn8otRvBIHWTjHoTMlnJUIfKOPr5Rrw87LfkZ6LRB0Hq6mTaXalZclRxH0j0RrXdujaWEjB6w7cluUU5Sphz47NCGppUNnE2QG5jhhW3LKihebO3dpw3f3xJ1lIGGTpEtXWAu4dO8bk3xNlISQ5B8ucCo1eoqG2tyBJR0dVrnMR77xEglSpqnfRtjDVOksY5HXv85Yp04rXA4hzA1pNoQpRBASktXU8YDqNOq2EZ7ExLxHFeMdyJOcVyFSLSSgmpdm049Ys6FxbSAwlJXYoGEJXbOVaLNNQpTKUKDmK+8PTnC1yrRcrKOBOsMEHEVLpQET0Z3DUPjFbUEtUdsDUmx/niN9+3qUZ0IagyhuFK++I+l04fDNDonGTFH8ZM5eX3iv5Vc5us+X7+81WazLly/ZoaniAeT1ECexXfrN1IEXaIRN5JlAdo5dswT8oW8g2H0fbM+sIUZMIKxSqUMshQCDVya1qx+UAXQbzmzr+kGaEf1PDNx4/TlQhZLgksNAD86e+AX+HWryh4ETt0KWMSvUzevFQmK/p779OsKnRsvLzq6EKPVPt14haYhKmOY1HPiI+bS7QWHQT6/SZQlZtvW1ICf6j60PF9g3OFqkdjhYOits+mA7LJJmdolYyAUHDry+0OO4CbCOY4zYXaRzO8q3yrOs9ooZV86eHKMGmy5RsHSDetrFG3qJoTdYnTUqlAEM/T6RxLHClD1mGv8pD5hha0WKclKQpsgDnLoYAw29oql1LElep94Jv21IA/tp7PKKt3np+0G06Eng8xrTo3c8/pF1cuValJyAgpDEAgBI+cPhrNOp3dDHBurHMbpVjV2bMSQAKDUU0iSXBbIk82qH6w1KtQlWUhIYtt8DxEES4+WUHUnr3+kntV5upyeZNb4xnMQSlTle2U18eMVKPDVs9WfzljyqqsAD7T1ceKZs0LzK7pGm0c1OgSvAWb8mpgGUQffF4Ekdlmyb8/wBTvtB9PSAPX1jCLgcxZtRTnzMQDtwinXnbiCs2htzdIw4WtKZs1KQgAJ16cucTtdW1dZJPWfeaHQ7e0st2mzZk5cooNTU/JtokUGnzF3dO+f3iecvGp2nOYwT7DLmSsgAykFm0rvHpn8P0+o048jgc49pLS+yuzcesg+O8Lz0zylKSoB9NIQ0moSndXacMOJ66u1dRUrA/nGf+EMianuTEkAFgT6rWA3iq3WIFPXrFPFfTQMnkQ/jPDksS+2ASFp24tqYDbp20mAW6nGP8j5QHhuud38s9JDpt4lM/tAGAU4bT94uLQGq2H2ley81udw46RwtKfxElMxUsZmdLCv7dWiMh8mwoG4hlwrYzE6ZNWVELJY0B5bV3EWQqAArMKX3FX49pm/BDhBfNMF8EntKtd93pmKrokUSRx2ePKW3Mi8T620oOIoYyswQACnow0+vWK/h1hc5BhWZWrJbmLFmQlQZyDSsVHLKcwNKVum3kGfFyMhYGvEH08fB9wnDT5ZG08wrJvQrRkbKU6Nx36Qq2nCtu65jVNofPHIhGwWKdPeYl3QHUXY8aCFrbaqfQe/SbZ1XAMJ2W+sqHmlw7cfXCFX0u5sJMtWO0J3alMxa5yVDKUsUA+t4WuLIorI594JyVAUxIxLOKp+UlwNNouaJQtWR1nLOSqfeFv4f30ZE3vLOSo108IW8So3qGQeoQbUm6kqTnniUa3YnkzJJUkvy/Vx6REam0ttIxEqdDZXZz/wCpOMQ30oLCQKKD14F6NFnSaVSuTKoITAM7Ycu1YVmDgK51HI8YxrL1K4PUTTkKDLFdUpH4ZlakePI8onVLT8O5frnj/Znl9Sz/ABHpibftCUElnYc+X3gOnHOe8uaYhhuknt0wpnreuo4vwj1dShqhCPYUuz8p4sM4pUMxZJNekatUMOOs+pdk/H3lMumXZzJAQCM4dLir/vHmLzcLMsek+sNm7PaJd/XV/VKEpdR4evdFvS6j+HuJ4hnQWpzPtgs4s4zd7tKUrTyjlrm847TtVKoMCF7imz84mKXQkkjYjrtCeqWnbsAnXVduDHi4MYEzxLCgE7gmFa/P0ih1Y/P2knVeHIay2OYTv3FEoKyKUnuliaOfHaM6my7VY4yB3xyfnFdJ4e4G4d53uC3SVJ/pKYjXj5QCvNZ5yD7zGsqtB9YyJgxWudNQU1ynXx4GOLqGazdZGdAlVZyOsnk65kBOZSaJNf23iouqYttU9Za3hjifbsvFBSuWTlQ4CRWhPSrR9dQwYP1M+ZDnIhi0YMzJlqzOAdG9UaFV8RKZ46xX41NxBE8f6Yj9P/1H1jnxDe/6w3mGFLtspUcxUQHPFgfpC1rgDaIC19owBBuKUMgZkE11PreGNCctwcQunIPQxEtt3pLlLvyHGsXq7iODCW0K/PeYFWKY4Sxc6Ur7oYFqYzFzRbnGfvGbCuGCuYkro+x86xM12vCqQs1haFLdTKXabjySgU6jVhry6xBLMDufoYhXrA9mDJXeVjUkqC+6MxLHWpLNHoqbQQCvMtghhOtgtCwMiE00fZufExm1EJ3MZ8QO87W2xy1Fp/tGgZn6npwjFdrrzV0mGUOMYyJjVheZLClO6Eh3BHm2rQUeII+F7wVSoh4JgdF4rSpwfCHTQrLiYOpIbBjnJsgtclKgh1p00089t4itYdNaVzwYUuFPPSdcJzcs1feIaldH4DgYzr1yg4nNQuVxiHbZjTIvIKbKEK16J2QnMTTw5SMmfLRaxOSpSO8w7u5rt5wNUNbANxnrConl4Bi5YrDKmBXaoCVktzJ3bgYo2XWIRsORGnJHSLd6WDs7QA+ZJ4bj6xSou3056GYKbrA0cbnnolKSnM7pGVINRSI2oRrFJxPrFLCHbFc0vtTNDlRDBO4PF/GE31L+XsilmocLt/WBJsoKnLQe6NSSK9H9e+HFYrWGEbBwgMDzcwzMGSCwB0I2p7/CG1wcZ6wwnKyIWqaFFIDB34kaRuwote0GfE4GJqsF3qnz1OSWqXNBwMCtuWmoYEw7itczRddpnSJ3ecDNrxH1gdyV215XrOWIliYldu6aibZwpQ0B9pn686QGpanoIcjK/v6n5Tyd6vVfhf0iHjidLRKJSwcafOA6FS9uB0l/Q7/6+0lt33gtM0ZRqQK16R6W2lWr5h11BazaRxKXOvFGVCETj2r99IU56PpHmlobJZl9PaZWsliWXjtPv4qd+n3iM+XV7zWyuH7Hqf8AEQk3SIW9B9Zhxt/tx64w1ov5o/fea8P/AJhktH9yZ64R6T+hZYH4jD9g9hH/ALaviYn2/iP1EwYZwv7Y/wDj8oU1fSA1P4D95TD/AG0/5K+UDP8A/Ov/AOm/xPMf1n6CSn+JH94+EN+GdD956Xw/+SIMwt/dHr8pg2u/ln9941d+CcMU/wC584Jof5E+q/AIbwt/tpn+J+cJa3+eIG/8aycK/uHrHox+CLH+efrKBhPSV/kY8/r+rRu/8J+k9y/7quhjLfyxOn8MC4i/uJh3SfgMJX0jTgv+4f8AGJuv6D6xTW/gmTEX+5PQwTS/yoTT/wAsRSvD8vUfKK1XeMNN0r/dI/xT8BAG/kH7/wB5w/hMouG9PEx5/U/jkrWQffH94dfnBtP/ACzGKP5cXsRanxihpI1V0nay+xJ6H4xh/wATfacPUzfcn+5V/j8oBqP5Igb/AOXPt4aj/L5xyqaSON1/2Vf4D4QkP65H1H80fUye4+9gf5H5xV8K/F9pY0/4Ys4f/uI/yEU9X+A/SGX8BnS4f90OpjOq/kTrf1Six5yJT//Z')
            .load((a, b) => {
            this.filter = new PIXI.Filter(null, fragmentShader);
            this.filter.uniforms.uTextureOne = b.one.texture;
            this.filter.uniforms.uTextureTwo = b.two.texture;
            this.filter.uniforms.deltaTime = 0.0;
            this.filter.uniforms.animationTime = 4.0;
            this.filter.uniforms.sunSize = 100.0;
            this.filter.uniforms.sunPosition = [0, 0];
            //this.filter.uniforms.viewMatrix = math.inv(this.gameObject.worldTransform);
            //this.filter.uniforms.toWorld
            this.gameObject.filterArea = screen;
            this.gameObject.filters = [this.filter];
        });
        //loader.add('two', 'https://i.imgur.com/aYJSnq9.jpg');
        //this.loader.add("shader", "assets/shader/myVertex.fs").add("sun", "assets/shader/SunShader.frag").onLload( (a, b) => this.onLoaded(a,b));
    }
    init(sun) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(0, 0, 100);
        graphics.endFill();
        this.sunGraphic = graphics;
        this.gameObject.addChild(graphics);
    }
    iterate(delta) {
        if (this.filter !== undefined) {
            //this.deltaTime = (this.deltaTime + delta) % this.filter.uniforms.animationTime;
            this.deltaTime += delta;
            this.filter.uniforms.deltaTime = this.deltaTime;
            const v2 = this.parent.toGlobal(this.position);
            this.filter.uniforms.sunPosition = [v2.x, v2.y];
        }
    }
}


/***/ }),

/***/ "Qx5T":
/*!***************************************************!*\
  !*** ./apps/client/src/app/app-routing.module.ts ***!
  \***************************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _view_game_game_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/game/game.component */ "3R5g");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");




const routes = [
    { path: '', component: _view_game_game_component__WEBPACK_IMPORTED_MODULE_1__["GameComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "Rxrz":
/*!***************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/equipment/EquipmentGONosferatu.ts ***!
  \***************************************************************************/
/*! exports provided: EquipmentGONosferatu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentGONosferatu", function() { return EquipmentGONosferatu; });
/* harmony import */ var _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ShipEquipmentGO */ "AGC5");
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @orbitweb/common */ "grfs");


class EquipmentGONosferatu extends _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentGO"] {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    onInit(parent) {
        super.onInit(parent);
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x00FFAA);
        this.graphic.drawPolygon([
            new PIXI.Point(0, 0),
            new PIXI.Point(100, 0),
            new PIXI.Point(0, 100),
        ]);
        this.graphic.endFill();
        parent.equipmentLayer.addChild(this.graphic);
    }
    iterate(parent, delta) {
        super.iterate(parent, delta);
        this.graphic.clear();
        if (parent.targetPlayer === undefined || this.state.active === false) {
            return;
        }
        const dir = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].sub(parent.targetPlayer.position, parent.position);
        const len = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].len(dir);
        const scale = (10 + 5) / len;
        const startP = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].scale(dir, scale);
        const perp = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].cross3({
            x: dir.x,
            y: dir.y,
            z: 0
        }, {
            x: 0,
            y: 0,
            z: 1
        });
        this.graphic.lineStyle(2, 0x423271);
        this.graphic.moveTo(startP.x, startP.y);
        this.graphic.lineTo(dir.x, dir.y);
        const factor = 10;
        this.graphic.moveTo(startP.x + perp.x * factor, startP.y + perp.y * factor);
        this.graphic.lineTo(startP.x + perp.x * -1 * factor, startP.y + perp.y * -1 * factor);
        this.graphic.endFill();
    }
    onDestroy(parent) {
        super.onDestroy(parent);
        parent.equipmentLayer.removeChild(this.graphic);
        //this.repairGraphic = undefined;
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
    }
    onEndEquipment(parent) {
        super.onEndEquipment(parent);
    }
}


/***/ }),

/***/ "TJhO":
/*!*****************************************************!*\
  !*** ./apps/client/src/app/game/renderer/Camera.ts ***!
  \*****************************************************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");

class Camera {
    constructor(view, gameService, playerService) {
        this.view = view;
        this.gameService = gameService;
        this.playerService = playerService;
        this.maxCameraRange = 500;
        this.setSize(this.gameService.app().renderer.width, this.gameService.app().renderer.height);
        this.gameService.app().OnResizeWindow.subscribe((size) => {
            console.error(" got it", size);
            this.setSize(size.x, size.y);
        });
        this.gameService.app().ticker.add((delta) => {
            const dT = this.gameService.app().ticker.elapsedMS / 1000;
            let me;
            let mePosition;
            if (this.playerService.getUserName() !== undefined) {
                me = this.gameService.app().players.find((p) => p.id === this.playerService.getUserName());
                if (me !== undefined)
                    mePosition = me.position;
            }
            this.iterate(this.gameService.app().players.map((v) => v.position), mePosition, dT);
        });
    }
    setSize(w, h) {
        this.width = w;
        this.height = h;
        this.maxCameraRange = this.width > this.height ? this.height / 2 : this.width / 2;
        //this.iterate([this.targetRectangle.x1, this.targetRectangle.x2], 1);
    }
    getViewMatrix() {
        const mat = new PIXI.Matrix();
        mat.translate(-this.width / 2, -this.height / 2);
        return mat;
    }
    getModelMatrix() {
        const mat = new PIXI.Matrix();
        mat.translate(this.view.worldTransform.tx, this.view.worldTransform.ty);
        //return mat;
        return mat;
    }
    iterate(positions, vip, delta) {
        let rect;
        const p1 = { x: 0, y: 0 };
        //console.log("cam", this.getModelMatrix().append(this.getViewMatrix()).apply(p1));
        //console.log("cam", this.view.worldTransform);
        //return;
        if (positions.length < 1)
            return;
        //let scale = this.findZoom(rect);
        let scale = 1.0;
        scale = scale > 2 ? 2 : scale;
        scale = 1.0;
        this.view.scale.x = scale;
        this.view.scale.y = scale;
        let focusPoint = this.focusPoint(positions, vip);
        if (this.localCenterPoint) {
            const disVector = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].sub(focusPoint, this.localCenterPoint);
            const disVLen = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].len(disVector);
            if (disVLen > 5) {
                let scale = 0.05;
                const newVector = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(this.localCenterPoint, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].scale(disVector, scale));
                focusPoint = newVector;
            }
        }
        this.localCenterPoint = focusPoint;
        const w = this.width / 2;
        const h = this.height / 2;
        const a = this.view.toGlobal(this.localCenterPoint);
        const b = this.view.toGlobal({
            x: w / scale,
            y: h / scale
        });
        this.view.x = b.x - a.x;
        this.view.y = b.y - a.y;
    }
    findZoom(rect) {
        const w1 = Math.tan(this.width / 2);
        const h1 = Math.tan(this.height / 2);
        const a_w = this.width / (rect.x2.x - rect.x1.x);
        const a_h = this.height / (rect.x2.y - rect.x1.y);
        if (a_w > a_h) {
            return a_w;
        }
        else
            return a_h;
    }
    focusPoint(positions, vip) {
        if (positions.length < 2 && vip !== undefined)
            return vip;
        const center = this.findCenter(positions);
        if (vip === undefined)
            return center;
        const distanceToCenter = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].len(_orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].sub(center, vip));
        if (distanceToCenter < this.maxCameraRange) {
            return center;
        }
        else {
            return this.focusPoint(positions.reduce((acc, cur) => {
                if (cur.x === vip.x && cur.y === vip.y)
                    acc.push(cur);
                else if (_orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].len(_orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].sub(cur, vip)) <= this.maxCameraRange)
                    acc.push(cur);
                return acc;
            }, []), vip);
        }
    }
    focus(positions, vip) {
        const center = this.findCenter(positions);
        const distanceToCenter = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].len(_orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].sub(center, vip));
        console.log(distanceToCenter);
        if (distanceToCenter < this.maxCameraRange) {
        }
        else {
        }
        let rectangle = {
            x1: {
                x: Number.POSITIVE_INFINITY,
                y: Number.POSITIVE_INFINITY
            },
            x2: {
                x: Number.NEGATIVE_INFINITY,
                y: Number.NEGATIVE_INFINITY
            },
        };
        positions.forEach(value => {
            if (value.x > rectangle.x2.x)
                rectangle.x2.x = value.x;
            if (value.x < rectangle.x1.x)
                rectangle.x1.x = value.x;
            if (value.y > rectangle.x2.y)
                rectangle.x2.y = value.y;
            if (value.y < rectangle.x1.y)
                rectangle.x1.y = value.y;
        });
        return rectangle;
    }
    findCenter(positions) {
        let rectangle = {
            x1: {
                x: Number.POSITIVE_INFINITY,
                y: Number.POSITIVE_INFINITY
            },
            x2: {
                x: Number.NEGATIVE_INFINITY,
                y: Number.NEGATIVE_INFINITY
            },
        };
        positions.forEach(value => {
            if (value.x > rectangle.x2.x)
                rectangle.x2.x = value.x;
            if (value.x < rectangle.x1.x)
                rectangle.x1.x = value.x;
            if (value.y > rectangle.x2.y)
                rectangle.x2.y = value.y;
            if (value.y < rectangle.x1.y)
                rectangle.x1.y = value.y;
        });
        return {
            x: (rectangle.x1.x + rectangle.x2.x) / 2,
            y: (rectangle.x1.y + rectangle.x2.y) / 2,
        };
    }
}


/***/ }),

/***/ "TtIU":
/*!*************************************************!*\
  !*** ./apps/client/src/app/util/AssetLoader.ts ***!
  \*************************************************/
/*! exports provided: AssetLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetLoader", function() { return AssetLoader; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");

class AssetLoader {
    load(loader) {
        loader
            .add("shader", "assets/shader/myVertex.fs")
            .add("sun", "assets/shader/SunShader.frag")
            .add("phongFrag", "assets/shader/PhongShader.frag")
            .add("phongVert", "assets/shader/PhongShader.vert")
            .load((loader, res) => {
            AssetLoader.data = res;
            AssetLoader.onLoaded.emit({ loader: loader, res: res });
        });
    }
}
AssetLoader.onLoaded = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();


/***/ }),

/***/ "Tzio":
/*!********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/projectile/ProjectileUpdateMessage.ts ***!
  \********************************************************************************/
/*! exports provided: ProjectileUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectileUpdateMessage", function() { return ProjectileUpdateMessage; });
/* harmony import */ var _ProjectileMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectileMessage */ "HEA6");

class ProjectileUpdateMessage extends _ProjectileMessage__WEBPACK_IMPORTED_MODULE_0__["ProjectileMessage"] {
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


/***/ }),

/***/ "U/bh":
/*!*******************************************************!*\
  !*** ./apps/client/src/app/game/model/SpaceshipGO.ts ***!
  \*******************************************************/
/*! exports provided: SpaceshipGO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceshipGO", function() { return SpaceshipGO; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _NameplateGO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NameplateGO */ "Kba2");




class SpaceshipGO extends _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["Spaceship"] {
    constructor(spaceship) {
        super(spaceship.id, spaceship.color);
        this.actionOrbitTarget = false;
        this.actionKeepAtRange = false;
        this.health = 100;
        this.gameObject = this.getGameObject();
        this.gameObject.filters = [];
    }
    setCameraCenter(point) {
        this.cameraCenterPoint = point;
    }
    setMatrix(view, model) {
        this.view = view;
        this.model = model;
    }
    iterate(delta) {
        _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["Physics"].iterate(this, delta);
        this.iterateGraphics();
    }
    getGameObject() {
        const parentObject = new PIXI.Container();
        // Player
        this.playerLayer = new PIXI.Container();
        this.playerLayer.filters = [];
        //const playerRadius = this.shipSize;
        const playerRadius = this.radius;
        const graphics = new PIXI.Graphics();
        const c = PIXI.utils.string2hex(this.color);
        graphics.beginFill(c);
        graphics.drawCircle(0, 0, playerRadius); // drawCircle(x, y, radius)
        graphics.endFill();
        this.playerLayer.addChild(graphics);
        const look = new PIXI.Graphics();
        this.iColor = PIXI.utils.string2hex(this.invertColor(this.color));
        // Set the fill color
        look.beginFill(this.iColor); // Red
        // Draw a circle
        look.drawRect(0, 0, 2, playerRadius);
        look.endFill();
        this.playerLayer.addChild(look);
        this.progressLayer = new PIXI.Graphics();
        this.playerLayer.addChild(this.progressLayer);
        // target
        this.equipmentLayer = new PIXI.Graphics();
        this.equipmentLayer.filters = [];
        // text
        this.uiLayer = new PIXI.Container();
        this.nameplate = new _NameplateGO__WEBPACK_IMPORTED_MODULE_1__["NameplateGO"](this);
        /*
    
         */
        this.uiLayer.addChild(this.nameplate);
        parentObject.addChild(this.playerLayer);
        parentObject.addChild(this.uiLayer);
        parentObject.addChild(this.equipmentLayer);
        return parentObject;
    }
    buildSixEck(pos) {
        const len = 50;
        const dir = { x: len, y: 0 };
        const toRad = (deg) => {
            return deg / 180 * Math.PI;
        };
        const z = pos;
        const a = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].rotate(dir, 0));
        const b = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].rotate(dir, toRad(60)));
        const c = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].rotate(dir, toRad(120)));
        const d = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].rotate(dir, toRad(180)));
        const e = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].rotate(dir, toRad(240)));
        const f = _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].add(pos, _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["CMath"].rotate(dir, toRad(300)));
        const buffer = [
            z.x, z.y, 0,
            a.x, a.y, 0,
            b.x, b.y, 0,
            c.x, c.y, 0,
            d.x, d.y, 0,
            e.x, e.y, 0,
            f.x, f.y, 0
        ];
        //return buffer;
        const b2 = [
            pos.x, pos.y - len, 0,
            pos.x, pos.y + len, 0,
            pos.y - 2 * len, pos.y, 0
        ];
        return b2;
    }
    iterateGraphics() {
        this.gameObject.x = this.position.x;
        this.gameObject.y = this.position.y;
        this.playerLayer.rotation = this.rotation;
        this.progressLayer.clear();
        if (this.activationProgress > 0) {
            this.progressLayer.beginFill(this.iColor);
            this.progressLayer.drawCircle(0, 0, this.activationProgress * this.radius);
            this.progressLayer.endFill();
        }
        this.nameplate.update(this);
        //this.nameplate.text = this.health.toFixed(0) + " " + this.id;
    }
    removeTarget() {
        this.targetPlayer = undefined;
        this.actionOrbitTarget = false;
    }
    invertColor(hex) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        // invert color components
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16), g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16), b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }
    padZero(str, len = 2) {
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
}


/***/ }),

/***/ "U7V3":
/*!*****************************************************!*\
  !*** ./apps/client/src/app/game/model/BoundryGO.ts ***!
  \*****************************************************/
/*! exports provided: BoundryGO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoundryGO", function() { return BoundryGO; });
class BoundryGO {
    constructor() {
        this.gameObject = this.getGameObject();
    }
    setSize(size) {
        this.size = size;
        const w = size.x2.x - size.x1.x;
        const h = size.x2.y - size.x1.y;
        this.lineObject.clear();
        this.lineObject.lineStyle(2, 0xF05E23);
        this.lineObject.drawRect(size.x1.x, size.x1.y, w, h);
        this.lineObject.endFill();
    }
    onDestroy() {
    }
    iterate(delta) {
    }
    getGameObject() {
        const cannonCont = new PIXI.Container();
        this.lineObject = new PIXI.Graphics();
        cannonCont.addChild(this.lineObject);
        return cannonCont;
    }
}


/***/ }),

/***/ "UiYe":
/*!*******************************************!*\
  !*** ./libs/common/src/lib/util/CMath.ts ***!
  \*******************************************/
/*! exports provided: CMath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CMath", function() { return CMath; });
/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mathjs */ "acA/");

class CMath {
    constructor() {
    }
    static normalize3(vec) {
        const res = mathjs__WEBPACK_IMPORTED_MODULE_0__["norm"]([vec.x, vec.y, vec.z]);
        return { x: vec.x / res, y: vec.y / res, z: vec.z / res };
    }
    static normalize(vec) {
        const res = mathjs__WEBPACK_IMPORTED_MODULE_0__["norm"]([vec.x, vec.y]);
        return { x: vec.x / res, y: vec.y / res };
    }
    static clamp(vec) {
    }
    static rotate(vec, a) {
        //const angle = a / 180 * math.pi;
        const angle = a;
        return {
            x: mathjs__WEBPACK_IMPORTED_MODULE_0__["cos"](angle) * vec.x - mathjs__WEBPACK_IMPORTED_MODULE_0__["sin"](angle) * vec.y,
            y: mathjs__WEBPACK_IMPORTED_MODULE_0__["sin"](angle) * vec.x + mathjs__WEBPACK_IMPORTED_MODULE_0__["cos"](angle) * vec.y
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
        let angle = mathjs__WEBPACK_IMPORTED_MODULE_0__["acos"](this.dot(tDir, orient));
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
        const dotProduct = mathjs__WEBPACK_IMPORTED_MODULE_0__["dot"]([tDir.x, tDir.y], [orient.x, orient.y]);
        const l_tDir = mathjs__WEBPACK_IMPORTED_MODULE_0__["norm"]([tDir.x, tDir.y]);
        const l_orient = mathjs__WEBPACK_IMPORTED_MODULE_0__["norm"]([orient.x, orient.y]);
        return mathjs__WEBPACK_IMPORTED_MODULE_0__["acos"](dotProduct / (l_tDir * l_orient));
    }
    static constructTangent(center, radius, point) {
        const b = mathjs__WEBPACK_IMPORTED_MODULE_0__["sqrt"]((point.x - center.x) * (point.x - center.x) + (point.y - center.y) * (point.y - center.y));
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
            const th = mathjs__WEBPACK_IMPORTED_MODULE_0__["acos"](radius / b); //  # angle theta
            const d = mathjs__WEBPACK_IMPORTED_MODULE_0__["atan2"](point.y - center.y, point.x - center.x); //  # direction angle of point P from C
            const d1 = d + th; //  # direction angle of point T1 from C
            const d2 = d - th; // # direction angle of point T2 from C
            const T1x = center.x + radius * mathjs__WEBPACK_IMPORTED_MODULE_0__["cos"](d1);
            const T1y = center.y + radius * mathjs__WEBPACK_IMPORTED_MODULE_0__["sin"](d1);
            const T2x = center.x + radius * mathjs__WEBPACK_IMPORTED_MODULE_0__["cos"](d2);
            const T2y = center.y + radius * mathjs__WEBPACK_IMPORTED_MODULE_0__["sin"](d2);
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
        return mathjs__WEBPACK_IMPORTED_MODULE_0__["norm"]([v.x, v.y]);
    }
    static dot(v1, v2) {
        const v1n = this.normalize(v1);
        const v2n = this.normalize(v2);
        const res = mathjs__WEBPACK_IMPORTED_MODULE_0__["dot"]([v1n.x, v1n.y], [v2n.x, v2n.y]);
        return res;
    }
    static dot3(v1, v2) {
        const v1n = this.normalize(v1);
        const v2n = this.normalize(v2);
        const res = mathjs__WEBPACK_IMPORTED_MODULE_0__["dot"]([v1.x, v1.y, v1.z], [v2.x, v2.y, v2.z]);
        return res;
    }
    static cross3(v1, v2) {
        const v1n = this.normalize3(v1);
        const v2n = this.normalize3(v2);
        const res = mathjs__WEBPACK_IMPORTED_MODULE_0__["cross"]([v1n.x, v1n.y, v1n.z], [v2n.x, v2n.y, v2.z]);
        return {
            x: res[0],
            y: res[1],
            z: res[2]
        };
    }
    static cross(v1, v2) {
        const v1n = this.normalize(v1);
        const v2n = this.normalize(v2);
        const res = mathjs__WEBPACK_IMPORTED_MODULE_0__["cross"]([v1n.x, v1n.y, 0], [v2n.x, v2n.y, 0]);
        return {
            x: res[0],
            y: res[1],
            z: res[2]
        };
    }
    static isInsideCircle(center, point, radius) {
        const v = CMath.sub(point, center);
        const distance = mathjs__WEBPACK_IMPORTED_MODULE_0__["norm"]([v.x, v.y]);
        return distance < radius;
    }
    static getAngularVelocity(particle, target) {
        const r = {
            x: particle.position.x - target.x,
            y: particle.position.y - target.y
        };
        // TODO: winkel nur zwischen 0 und 180 grad
        const alpha = CMath.angle(r, particle.speed);
        const v_norm = mathjs__WEBPACK_IMPORTED_MODULE_0__["norm"]([particle.speed.x, particle.speed.y]);
        const r_norm = mathjs__WEBPACK_IMPORTED_MODULE_0__["norm"]([r.x, r.y]);
        //console.log(v_norm);
        //console.log(alpha * 180 / math.pi);
        //console.log(particle.speed);
        const omega = v_norm * mathjs__WEBPACK_IMPORTED_MODULE_0__["sin"](alpha) / r_norm;
        return mathjs__WEBPACK_IMPORTED_MODULE_0__["abs"](omega);
    }
}


/***/ }),

/***/ "VkKP":
/*!*****************************************************!*\
  !*** ./apps/client/src/app/view/ui/ui.component.ts ***!
  \*****************************************************/
/*! exports provided: UiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiComponent", function() { return UiComponent; });
/* harmony import */ var _headsup_headsup_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./headsup/headsup.component */ "Wv7z");
/* harmony import */ var _fitting_fitting_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fitting/fitting.component */ "yjkM");
/* harmony import */ var _scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scoreboard/scoreboard.component */ "81Ne");
/* harmony import */ var _service_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/game.service */ "qb5o");
/* harmony import */ var _service_player_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/player.service */ "gSC2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "SVse");












function UiComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "div", 8);
} }
const _c0 = ["*"];
class UiComponent {
    constructor(gameService, playerService) {
        this.gameService = gameService;
        this.playerService = playerService;
        this.showCustom = true;
        this.loginEnabled = false;
    }
    ngOnInit() {
    }
    test() {
    }
    /*
      public addKill(name: string) {
        let scorer: ScoreboardEntry = this.scoreboard.scoreboard.find((value: ScoreboardEntry) => value.name === name);
    
        if ( scorer === undefined){
          const newScorer = {
            id: name,
            count: 0
          };
          this.scoreboard.push(newScorer);
        }
    
        scorer = this.scoreboard.scoreboard.find(value => value.name === name);
    
        scorer.count++;
      }
    */
    toggleCustom() {
        this.showCustom = !this.showCustom;
    }
}
UiComponent.ɵfac = function UiComponent_Factory(t) { return new (t || UiComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_service_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_service_player_service__WEBPACK_IMPORTED_MODULE_4__["PlayerService"])); };
UiComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: UiComponent, selectors: [["app-ui"]], viewQuery: function UiComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_headsup_headsup_component__WEBPACK_IMPORTED_MODULE_0__["HeadsupComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_fitting_fitting_component__WEBPACK_IMPORTED_MODULE_1__["FittingComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_2__["ScoreboardComponent"], 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.headsUp = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.fitting = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.scoreboard = _t.first);
    } }, ngContentSelectors: _c0, decls: 14, vars: 1, consts: [["class", "headsup", 4, "ngIf"], [1, "ui"], [1, "login"], ["fitting", ""], ["headsUp", ""], [1, "scoreboard"], ["scoreboard", ""], [1, "tutorial"], [1, "headsup"]], template: function UiComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, UiComponent_div_0_Template, 1, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "app-fitting", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "app-headsup", null, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "app-scoreboard", null, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, " Click on a player to select him as target! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, " Click empty space to command your ship\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵprojection"](13);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loginEnabled);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _fitting_fitting_component__WEBPACK_IMPORTED_MODULE_1__["FittingComponent"], _headsup_headsup_component__WEBPACK_IMPORTED_MODULE_0__["HeadsupComponent"], _scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_2__["ScoreboardComponent"]], styles: [".header[_ngcontent-%COMP%] {\n  height: 25px;\n  background-color: black;\n  color: white;\n}\n.header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin-left: 20px;\n}\n.login[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 1 auto;\n  flex-flow: column;\n}\n.ui[_ngcontent-%COMP%] {\n  left: 40px;\n  right: 40px;\n  max-width: 300px;\n  position: absolute;\n  max-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  overflow-y: scroll;\n}\n.scoreboard[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0px;\n  color: white;\n}\n.tutorial[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0px;\n  bottom: 0px;\n  color: white;\n  text-align: right;\n}\n.headsup[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 1px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: none;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #151515;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3VpLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtBQUNGO0FBQUU7RUFDRSxpQkFBQTtBQUVKO0FBRUE7RUFDRSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBQ0Y7QUFHQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFBRjtBQUlBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtBQURGO0FBSUE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBREY7QUFJQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtBQURGO0FBS0EsVUFBQTtBQUNBO0VBQ0UsVUFBQTtBQUZGO0FBS0EsVUFBQTtBQUNBO0VBQ0UsZ0JBQUE7QUFGRjtBQUtBLFdBQUE7QUFDQTtFQUNFLG1CQUFBO0FBRkY7QUFLQSxvQkFBQTtBQUNBO0VBQ0UsZ0JBQUE7QUFGRiIsImZpbGUiOiJ1aS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXIge1xuICBoZWlnaHQ6IDI1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICBjb2xvcjogd2hpdGU7XG4gIGRpdiB7XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIH1cbn1cblxuLmxvZ2luIHtcbiAgZGlzcGxheTpmbGV4O1xuICBmbGV4OiAxIDEgYXV0bztcbiAgZmxleC1mbG93OiBjb2x1bW47XG59XG5cblxuLnVpIHtcbiAgbGVmdDogNDBweDtcbiAgcmlnaHQ6NDBweDtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXgtaGVpZ2h0OiAxMDB2aDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuXG59XG5cbi5zY29yZWJvYXJkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMHB4O1xuICBjb2xvcjp3aGl0ZTtcbn1cblxuLnR1dG9yaWFsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMHB4O1xuICBib3R0b206IDBweDtcbiAgY29sb3I6d2hpdGU7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4uaGVhZHN1cCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwcHg7XG59XG5cblxuLyogd2lkdGggKi9cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICB3aWR0aDogMXB4O1xufVxuXG4vKiBUcmFjayAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi8qIEhhbmRsZSAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJhY2tncm91bmQ6ICMxNTE1MTU7XG59XG5cbi8qIEhhbmRsZSBvbiBob3ZlciAqL1xuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICM1NTU7XG59XG5cbiJdfQ== */"] });


/***/ }),

/***/ "W1wD":
/*!***************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerSkillUsedMessage.ts ***!
  \***************************************************************************/
/*! exports provided: PlayerTargetSkillUsedMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerTargetSkillUsedMessage", function() { return PlayerTargetSkillUsedMessage; });
/* harmony import */ var _generic_PlayerTargetMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generic/PlayerTargetMessage */ "D1wQ");

class PlayerTargetSkillUsedMessage extends _generic_PlayerTargetMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerTargetMessage"] {
    constructor(player, target, skillId) {
        super(player, target);
        this.skillId = skillId;
        this.type = "playerTargetSkillUsedMessage";
    }
}


/***/ }),

/***/ "Wv7z":
/*!******************************************************************!*\
  !*** ./apps/client/src/app/view/ui/headsup/headsup.component.ts ***!
  \******************************************************************/
/*! exports provided: HeadsupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeadsupComponent", function() { return HeadsupComponent; });
/* harmony import */ var _service_game_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/game.service */ "qb5o");
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _service_player_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/player.service */ "gSC2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "SVse");








const _c0 = function (a0, a1, a2) { return { active: a0, offline: a1, pending: a2 }; };
function HeadsupComponent_div_0_div_7_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeadsupComponent_div_0_div_7_ng_container_1_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r5.onClick(i_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const fit_r2 = ctx_r8.$implicit;
    const i_r3 = ctx_r8.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](3, _c0, fit_r2.state.active && fit_r2.state.pendingState, !fit_r2.state.active && !fit_r2.state.pendingState, fit_r2.state.active != fit_r2.state.pendingState));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", i_r3 + 1, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", fit_r2.name, " ");
} }
function HeadsupComponent_div_0_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, HeadsupComponent_div_0_div_7_ng_container_1_Template, 5, 7, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fit_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !fit_r2.passive);
} }
function HeadsupComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeadsupComponent_div_0_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r9.selfKill(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Capsule");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, HeadsupComponent_div_0_div_7_Template, 2, 1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx_r0.mePlayer().id, " (", ctx_r0.getSpeed(), " m/s) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.mePlayer().fitting.fitting);
} }
class HeadsupComponent {
    constructor(gameService, playerService) {
        this.gameService = gameService;
        this.playerService = playerService;
        this.speedUI = 1;
        this.speedInputUI = 1;
        this.orbitUI = 1;
        this.cooldownUI = 1;
        this.targetHPUI = 0;
        this.powerUI = 100;
    }
    ngOnInit() {
        this.gameService.app().ticker.add((delta) => {
            const dT = this.gameService.app().ticker.elapsedMS / 1000;
            this.iterate(dT);
        });
    }
    mePlayer() {
        const playerName = this.playerService.getUserName();
        if (playerName === undefined) {
            return undefined;
        }
        const ownPlayer = this.gameService.app().players.find((p) => p.id === playerName);
        return ownPlayer;
    }
    onClick(index) {
        this.playerService.input.keyPressed(index + 1);
    }
    iterate(delta) {
        const ownPlayer = this.mePlayer();
        if (ownPlayer === undefined) {
            return;
        }
        const v = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].len(ownPlayer.speed);
        this.speedUI = Number.parseInt(v.toFixed(0));
        this.powerUI = Number.parseInt(ownPlayer.power.toFixed(0));
        /*
        this.ui.cooldownUI = this.ownPlayer.cannon.remainingCooldown.toFixed(0)
        this.ui.speedInputUI = this.ownPlayer.speedInput.toFixed(1);
        if (this.ownPlayer.targetPlayer !== undefined) {
          const dist: number = CMath.length(CMath.sub(this.ownPlayer.position, this.ownPlayer.targetPlayer.position));
          this.ui.distanceUI = dist.toFixed(0);
          this.ui.orbitUI = this.ownPlayer.orbitRadius;
        } else {
          this.ui.distanceUI = undefined;
        }

*/
    }
    getCDP(fit) {
        const r = fit.remainingTime * 100 / fit.cycleTime;
        return r;
    }
    getEnergy() {
        const player = this.getPlayer();
        if (player === undefined)
            return 0;
        return player.power.toFixed(0);
    }
    getEnergyP() {
        const player = this.getPlayer();
        if (player === undefined)
            return 0;
        return player.power * 100 / player.energyCapacity;
    }
    getSpeed() {
        const player = this.getPlayer();
        if (player === undefined)
            return 0;
        return _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].len(player.speed).toFixed(0);
    }
    getSpeedP() {
        const player = this.getPlayer();
        if (player === undefined)
            return 0;
        const speed = _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["CMath"].len(player.speed);
        return speed * 100 / 51;
    }
    getPlayer() {
        if (this.playerService.getUserName() === undefined)
            return undefined;
        return this.gameService.app().players.find((p) => p.id === this.playerService.getUserName());
    }
    selfKill() {
        console.log("kill");
        const playerName = this.playerService.getUserName();
        if (playerName !== undefined) {
            const msg = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["PlayerSelfKillMessage"](playerName);
            this.gameService.send(msg);
        }
    }
}
HeadsupComponent.ɵfac = function HeadsupComponent_Factory(t) { return new (t || HeadsupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_service_game_service__WEBPACK_IMPORTED_MODULE_0__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_service_player_service__WEBPACK_IMPORTED_MODULE_2__["PlayerService"])); };
HeadsupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: HeadsupComponent, selectors: [["app-headsup"]], inputs: { speedUI: "speedUI", speedInputUI: "speedInputUI", distanceUI: "distanceUI", orbitUI: "orbitUI", cooldownUI: "cooldownUI", targetHPUI: "targetHPUI" }, decls: 1, vars: 1, consts: [["class", "header", 4, "ngIf"], [1, "header"], [1, "ship"], [2, "color", "white"], [1, "capsule", 3, "click"], [1, "equipment"], ["class", "slot", 4, "ngFor", "ngForOf"], [1, "slot"], [4, "ngIf"], [1, "button", 3, "ngClass", "click"], [1, "text"]], template: function HeadsupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, HeadsupComponent_div_0_Template, 8, 3, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.mePlayer() !== undefined);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"]], styles: [".header[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n          user-select: none;\n  display: flex;\n  flex-direction: column;\n  margin: 10px;\n}\n\n.equipment[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.slot[_ngcontent-%COMP%] {\n  width: 200px;\n  margin-top: 5px;\n  display: flex;\n}\n\n.slot[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  flex: 0 0 10px;\n  padding: 5px;\n}\n\n.slot[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n  color: white;\n  flex: 1 1 80%;\n  padding: 5px;\n}\n\n.active[_ngcontent-%COMP%] {\n  color: white;\n  background-color: green;\n}\n\n.active[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  background-color: #2f2f9a;\n  color: white;\n}\n\n.offline[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #2f2f9a;\n}\n\n.pending[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #ff971b;\n}\n\n.pending[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  background-color: #2f2f9a;\n}\n\n.capsule[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n          user-select: none;\n}\n\n.progress[_ngcontent-%COMP%] {\n  height: 2em;\n  width: 100%;\n  font-size: 14px;\n  position: relative;\n}\n\n.progress[_ngcontent-%COMP%]:before {\n  content: attr(data-label);\n  position: absolute;\n  text-align: left;\n  line-height: 2em;\n  left: 5px;\n  right: 0;\n  font-weight: bold;\n}\n\n.progress[_ngcontent-%COMP%]:after {\n  content: attr(cost-label);\n  position: absolute;\n  text-align: right;\n  line-height: 2em;\n  left: 0;\n  right: 5px;\n}\n\n.value[_ngcontent-%COMP%] {\n  display: inline-block;\n  height: 100%;\n}\n\n.speed[_ngcontent-%COMP%] {\n  background-color: #a91aff;\n  color: white;\n}\n\n.speed[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  background-color: #2f2f9a;\n}\n\n.energy[_ngcontent-%COMP%] {\n  background-color: #a91aff;\n  color: white;\n}\n\n.energy[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  background-color: #2f2f9a;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2hlYWRzdXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5QkFBQTtVQUFBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQU1BO0VBQ0UsYUFBQTtFQUVBLHNCQUFBO0FBSkY7O0FBV0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUVBLGFBQUE7QUFURjs7QUFXRTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FBVEo7O0FBWUU7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFWSjs7QUFjQTtFQUNFLFlBQUE7RUFDQSx1QkFBQTtBQVhGOztBQWFFO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0FBWEo7O0FBZUE7RUFDRSxZQUFBO0VBQ0EseUJBQUE7QUFaRjs7QUFlQTtFQUNFLFlBQUE7RUFDQSx5QkFBQTtBQVpGOztBQWNFO0VBQ0UseUJBQUE7QUFaSjs7QUFxQkE7RUFDRSx5QkFBQTtVQUFBLGlCQUFBO0FBbEJGOztBQXVCQTtFQUNFLFdBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUVBLGtCQUFBO0FBckJGOztBQXVCQTtFQUNFLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtBQXBCRjs7QUF1QkE7RUFDRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0FBcEJGOztBQXVCQTtFQUVFLHFCQUFBO0VBQ0EsWUFBQTtBQXJCRjs7QUF3QkE7RUFDRSx5QkFBQTtFQUNBLFlBQUE7QUFyQkY7O0FBc0JFO0VBQ0UseUJBQUE7QUFwQko7O0FBd0JBO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0FBckJGOztBQXNCRTtFQUNFLHlCQUFBO0FBcEJKIiwiZmlsZSI6ImhlYWRzdXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVyIHtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLnNoaXAge1xuXG59XG5cbi5lcXVpcG1lbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cblxuXG5cbn1cblxuLnNsb3Qge1xuICB3aWR0aDogMjAwcHg7XG4gIG1hcmdpbi10b3A6NXB4O1xuXG4gIGRpc3BsYXk6IGZsZXg7XG5cbiAgLmJ1dHRvbiB7XG4gICAgZmxleDogMCAwIDEwcHg7XG4gICAgcGFkZGluZzo1cHg7XG4gIH1cblxuICAudGV4dCB7XG4gICAgY29sb3I6d2hpdGU7XG4gICAgZmxleDogMSAxIDgwJTtcbiAgICBwYWRkaW5nOjVweDtcbiAgfVxufVxuXG4uYWN0aXZlIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOmdyZWVuO1xuXG4gIC52YWx1ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJmMmY5YTtcbiAgICBjb2xvcjp3aGl0ZTtcbiAgfVxufVxuXG4ub2ZmbGluZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJmMmY5YTtcbn1cblxuLnBlbmRpbmcge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjk3MWI7XG5cbiAgLnZhbHVlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYyZjlhO1xuICB9XG59XG5cblxuLmNvbnRhaW5lciB7XG5cbn1cblxuLmNhcHN1bGUge1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuXG5cbi5wcm9ncmVzcyB7XG4gIGhlaWdodDogMmVtO1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1zaXplOiAxNHB4O1xuXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5wcm9ncmVzczpiZWZvcmUge1xuICBjb250ZW50OiBhdHRyKGRhdGEtbGFiZWwpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGxpbmUtaGVpZ2h0OiAyZW07XG4gIGxlZnQ6IDVweDtcbiAgcmlnaHQ6IDA7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucHJvZ3Jlc3M6YWZ0ZXIge1xuICBjb250ZW50OiBhdHRyKGNvc3QtbGFiZWwpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBsaW5lLWhlaWdodDogMmVtO1xuICBsZWZ0OiAwO1xuICByaWdodDogNXB4O1xufVxuXG4udmFsdWUge1xuICAvL2JhY2tncm91bmQtY29sb3I6ICM3Y2M0ZmY7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uc3BlZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTkxYWZmO1xuICBjb2xvcjp3aGl0ZTtcbiAgLnZhbHVlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYyZjlhO1xuICB9XG59XG5cbi5lbmVyZ3kge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTkxYWZmO1xuICBjb2xvcjp3aGl0ZTtcbiAgLnZhbHVlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYyZjlhO1xuICB9XG59XG5cblxuIl19 */"] });


/***/ }),

/***/ "XbyA":
/*!********************************************************!*\
  !*** ./apps/client/src/app/game/model/ProjectileGO.ts ***!
  \********************************************************/
/*! exports provided: ProjectileGO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectileGO", function() { return ProjectileGO; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");


class ProjectileGO extends _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["Projectile"] {
    constructor(id, source, target) {
        super(id, source.color);
        this.source = source;
        this.target = target;
        this.gameObject = this.getGameObject();
    }
    iterate(delta) {
        _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__["Physics"].iterate(this, delta);
        this.iterPhysics();
    }
    getGameObject() {
        const cannonCont = new PIXI.Container();
        this.lineObject = new PIXI.Graphics();
        // Set the fill color
        //this.lineObject.lineStyle(5, 0xFF00FF);
        cannonCont.addChild(this.lineObject);
        this.drawLine(this.source.position, this.target.position);
        return cannonCont;
    }
    drawLine(start, end) {
        const c = PIXI.utils.string2hex(this.color);
        this.lineObject.clear();
        this.lineObject.lineStyle(2, c);
        this.lineObject.moveTo(start.x, start.y);
        this.lineObject.lineTo(end.x, end.y);
    }
    iterPhysics() {
        this.gameObject.x = this.position.x;
        this.gameObject.y = this.position.y;
        this.gameObject.rotation = this.rotation;
    }
}


/***/ }),

/***/ "Xv8i":
/*!************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerJoinedMessage.ts ***!
  \************************************************************************/
/*! exports provided: PlayerJoinedMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerJoinedMessage", function() { return PlayerJoinedMessage; });
/* harmony import */ var _PlayerUpdateMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerUpdateMessage */ "FzT8");

class PlayerJoinedMessage extends _PlayerUpdateMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerUpdateMessage"] {
    constructor(spaceship) {
        super(spaceship);
        this.fitting.fitting = spaceship.fitting.fitting;
        this.type = "playerJoinedMessage";
    }
}


/***/ }),

/***/ "Y+w1":
/*!*********************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientStructureSpawnMessage.ts ***!
  \*********************************************************************************/
/*! exports provided: ClientStructureSpawnMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientStructureSpawnMessage", function() { return ClientStructureSpawnMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");
/* harmony import */ var _core_serialize_StructureDeserializer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/serialize/StructureDeserializer */ "HeP6");


class ClientStructureSpawnMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        const structureGO = context.structures.find((structure) => structure.id === this.message.id);
        if (structureGO === undefined) {
            let structureGO = _core_serialize_StructureDeserializer__WEBPACK_IMPORTED_MODULE_1__["StructureDeserializer"].deserialize(this.message);
            if (structureGO !== undefined) {
                context.structures.push(structureGO);
                structureGO.onInit();
                context.structureStage.addChild(structureGO.gameObject);
            }
        }
        /*
            public spawnProjectile(projectile: ProjectileGO) {
        
                if ( this.projectiles.findIndex( (p) => p.id === projectile.id ) < 0) {
        
                }
              }
            }
        */
    }
}


/***/ }),

/***/ "YHM0":
/*!*************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/structures/StructureGOPortal.ts ***!
  \*************************************************************************/
/*! exports provided: StructureGOPortal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureGOPortal", function() { return StructureGOPortal; });
/* harmony import */ var _model_StructureGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/StructureGO */ "L9s+");

class StructureGOPortal extends _model_StructureGO__WEBPACK_IMPORTED_MODULE_0__["StructureGO"] {
    constructor() {
        super(...arguments);
        this.progress = 0;
        this.duration = 3;
    }
    iterate(delta) {
        this.progress += delta;
        this.progress = this.progress % this.duration;
        const progress = (1 - this.progress / this.duration);
        this.wander.clear();
        this.wander.lineStyle(2, 0xFFAAAA);
        this.wander.drawCircle(0, 0, this.activationRange * progress);
        this.wander.endFill();
    }
    getGameObject() {
        const cannonCont = new PIXI.Container();
        this.lineObject = new PIXI.Graphics();
        // Set the fill color
        //this.lineObject.lineStyle(5, 0xFF00FF);
        this.wander = new PIXI.Graphics();
        this.lineObject.addChild(this.wander);
        this.lineObject.lineStyle(2, 0xFFAAAA);
        this.lineObject.drawCircle(0, 0, this.activationRange);
        this.lineObject.endFill();
        cannonCont.addChild(this.lineObject);
        return cannonCont;
    }
    onDestroy() {
        this.wander.clear();
        this.lineObject.removeChild(this.wander);
        super.onDestroy();
    }
}


/***/ }),

/***/ "YRae":
/*!********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/structures/StructureDestroyMessage.ts ***!
  \********************************************************************************/
/*! exports provided: StructureDestroyMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureDestroyMessage", function() { return StructureDestroyMessage; });
/* harmony import */ var _StructureMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StructureMessage */ "kLez");

class StructureDestroyMessage extends _StructureMessage__WEBPACK_IMPORTED_MODULE_0__["StructureMessage"] {
    constructor(structure) {
        super(structure.id);
        this.type = "structureDestroyMessage";
    }
}


/***/ }),

/***/ "Ym/X":
/*!********************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientBoundryUpdateMessage.ts ***!
  \********************************************************************************/
/*! exports provided: ClientBoundryUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientBoundryUpdateMessage", function() { return ClientBoundryUpdateMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");

class ClientBoundryUpdateMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        context.boundry.setSize(this.message.boundry);
    }
}


/***/ }),

/***/ "ZmVK":
/*!***********************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientProjectileUpdateMessage.ts ***!
  \***********************************************************************************/
/*! exports provided: ClientProjectileUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientProjectileUpdateMessage", function() { return ClientProjectileUpdateMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");

class ClientProjectileUpdateMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        //console.log(msg);
        const projectile = context.projectiles.find((proj) => proj.id === this.message.id);
        if (projectile === undefined) {
            return;
        }
        projectile.position.x = this.message.x;
        projectile.position.y = this.message.y;
        projectile.speed.x = this.message.speedX;
        projectile.speed.y = this.message.speedY;
        projectile.rotation = this.message.rotation;
    }
}


/***/ }),

/***/ "Zr4m":
/*!*********************************!*\
  !*** ./apps/client/src/main.ts ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "q7cF");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "KkI/");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "a/Jb":
/*!***********************************************************************!*\
  !*** ./apps/client/src/app/game/entity/equipment/EquipmentGOLaser.ts ***!
  \***********************************************************************/
/*! exports provided: EquipmentGOLaser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentGOLaser", function() { return EquipmentGOLaser; });
/* harmony import */ var _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ShipEquipmentGO */ "AGC5");

class EquipmentGOLaser extends _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentGO"] {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    onInit(parent) {
        super.onInit(parent);
        this.gameObject = this.getGameObject(parent);
        parent.gameObject.addChild(this.gameObject);
    }
    iterate(parent, delta) {
        super.iterate(parent, delta);
        this.gameObject.rotation = this.state.rotation;
    }
    onDestroy(parent) {
        super.onDestroy(parent);
        parent.gameObject.removeChild(this.gameObject);
        this.gameObject = undefined;
    }
    getGameObject(parent) {
        const cannonCont = new PIXI.Container();
        const cannon = new PIXI.Graphics();
        const c = PIXI.utils.string2hex(parent.color);
        // Set the fill color
        cannon.beginFill(0xFFFFFF);
        // Draw a circle
        cannon.drawRect(0, 0, 20, 1);
        // Applies fill to lines and shapes since the last call to beginFill.
        cannon.endFill();
        //cannonCont.addChild(cannon);
        const sprite = PIXI.Sprite.from("assets/ShipATypeB.png");
        sprite.tint = c;
        sprite.x = -12;
        sprite.y = 12;
        sprite.scale.x = 0.1;
        sprite.scale.y = 0.1;
        //sprite.rotation = Math.PI * -2 / 4;
        cannonCont.addChild(sprite);
        return cannonCont;
    }
}


/***/ }),

/***/ "c3JD":
/*!************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerActionMessage.ts ***!
  \************************************************************************/
/*! exports provided: PlayerActionMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerActionMessage", function() { return PlayerActionMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generic/PlayerMessage */ "sYV4");

class PlayerActionMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(player, skillIndex) {
        super(player);
        this.skillIndex = skillIndex;
        this.type = "playerActionMessage";
    }
}


/***/ }),

/***/ "dGHj":
/*!************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerKilledMessage.ts ***!
  \************************************************************************/
/*! exports provided: PlayerKilledMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerKilledMessage", function() { return PlayerKilledMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generic/PlayerMessage */ "sYV4");

class PlayerKilledMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(spaceship, killer) {
        super(spaceship.id);
        this.killer = killer;
        this.type = "playerKilledMessage";
    }
}


/***/ }),

/***/ "f7wc":
/*!**********************************************************!*\
  !*** ./apps/client/src/app/game/renderer/TargetLayer.ts ***!
  \**********************************************************/
/*! exports provided: TargetLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TargetLayer", function() { return TargetLayer; });
class TargetLayer extends PIXI.Container {
    constructor() {
        super();
        this.crossHairRadius = 30.0;
        this.crossHairColor = 0xFF0000;
        this.crossHairAlpha = 0.4;
        this.crossHair = new PIXI.Graphics();
        const width = 1;
        const length = 10;
        this.crossHair.lineStyle(width, this.crossHairColor, this.crossHairAlpha);
        this.crossHair.drawCircle(0, 0, this.crossHairRadius);
        this.crossHair.endFill();
        this.crossHair.beginFill(this.crossHairColor, this.crossHairAlpha);
        this.crossHair.drawRect(this.crossHairRadius, -1 * width / 2, length, width);
        this.crossHair.drawRect(-1 * this.crossHairRadius - length, -1 * width / 2, length, width);
        this.crossHair.drawRect(-1 * width / 2, this.crossHairRadius, width, length);
        this.crossHair.drawRect(-1 * width / 2, -1 * this.crossHairRadius - length, width, length);
        this.crossHair.endFill();
        this.crossHair.visible = false;
        this.addChild(this.crossHair);
    }
    setSource(spaceship) {
        this.source = spaceship;
    }
    iterate(delta) {
        if (this.source !== undefined) {
            if (this.source.targetPlayer !== undefined) {
                this.crossHair.visible = true;
                this.crossHair.x = this.source.targetPlayer.position.x;
                this.crossHair.y = this.source.targetPlayer.position.y;
            }
            else {
                this.crossHair.visible = false;
            }
        }
        else {
            this.crossHair.visible = false;
        }
    }
}


/***/ }),

/***/ "faPN":
/*!******************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/equipment/EquipmentGOSpeedBooster.ts ***!
  \******************************************************************************/
/*! exports provided: EquipmentGOSpeedBooster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentGOSpeedBooster", function() { return EquipmentGOSpeedBooster; });
/* harmony import */ var _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ShipEquipmentGO */ "AGC5");

var NoiseFilter = PIXI.filters.NoiseFilter;
class EquipmentGOSpeedBooster extends _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentGO"] {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    onInit(parent) {
        super.onInit(parent);
        this.filter = new NoiseFilter(0.5);
        parent.playerLayer.filters.push(this.filter);
    }
    onStartEquipment(parent) {
        super.onStartEquipment(parent);
        this.filter.enabled = true;
    }
    onEndEquipment(parent) {
        super.onEndEquipment(parent);
        this.filter.enabled = false;
    }
}


/***/ }),

/***/ "fq2V":
/*!******************************************************************!*\
  !*** ./libs/common/src/lib/message/game/BoundryUpdateMessage.ts ***!
  \******************************************************************/
/*! exports provided: BoundryUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoundryUpdateMessage", function() { return BoundryUpdateMessage; });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Message */ "pdQO");

class BoundryUpdateMessage extends _Message__WEBPACK_IMPORTED_MODULE_0__["Message"] {
    constructor(boundry) {
        super();
        this.boundry = boundry;
        this.type = "boundryUpdateMessage";
    }
}


/***/ }),

/***/ "fxGD":
/*!*****************************************************!*\
  !*** ./libs/common/src/lib/message/DebugMessage.ts ***!
  \*****************************************************/
/*! exports provided: DebugMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebugMessage", function() { return DebugMessage; });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Message */ "pdQO");

class DebugMessage extends _Message__WEBPACK_IMPORTED_MODULE_0__["Message"] {
    constructor() {
        super();
        this.type = "debugMessage";
    }
}


/***/ }),

/***/ "gAjA":
/*!***************************************************************!*\
  !*** ./apps/client/src/app/game/entity/projectiles/Rocket.ts ***!
  \***************************************************************/
/*! exports provided: Rocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rocket", function() { return Rocket; });
/* harmony import */ var _model_ProjectileGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ProjectileGO */ "XbyA");

class Rocket extends _model_ProjectileGO__WEBPACK_IMPORTED_MODULE_0__["ProjectileGO"] {
    constructor(id, source, target) {
        super(id, source, target);
    }
    onInit() {
        super.onInit();
    }
    iterate(delta) {
        super.iterate(delta);
        // console.log("rocket");
    }
    getGameObject() {
        const cannonCont = new PIXI.Container();
        this.lineObject = new PIXI.Graphics();
        this.lineObject.beginFill(0xFFFFFF, 1.0);
        this.lineObject.drawRect(0, -5, 20, 10);
        this.lineObject.endFill();
        cannonCont.addChild(this.lineObject);
        return cannonCont;
    }
}


/***/ }),

/***/ "gSC2":
/*!*******************************************************!*\
  !*** ./apps/client/src/app/service/player.service.ts ***!
  \*******************************************************/
/*! exports provided: PlayerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerService", function() { return PlayerService; });
/* harmony import */ var _game_Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game/Events */ "2rDF");
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _game_core_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game/core/Input */ "7udm");
/* harmony import */ var _game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game.service */ "qb5o");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "8Y7J");






class PlayerService {
    constructor(gameService) {
        this.gameService = gameService;
        this.input = new _game_core_Input__WEBPACK_IMPORTED_MODULE_2__["Input"](this, gameService);
        _game_Events__WEBPACK_IMPORTED_MODULE_0__["Events"].onPlayerKilled.subscribe((name) => {
            if (name === this.getUserName())
                this.logout();
        });
        _game_Events__WEBPACK_IMPORTED_MODULE_0__["Events"].loginPlayer.subscribe((value) => {
            this.login(value.name);
            console.log("login");
            this.gameService.send(new _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["PlayerLoginMessage"](value.name, value.fitting));
        });
        this.gameService.app().ticker.add((delta) => {
            const dT = this.gameService.app().ticker.elapsedMS / 1000;
            let me;
            let mePosition;
            if (this.userName !== undefined) {
                me = this.gameService.app().players.find((p) => p.id === this.userName);
                if (me !== undefined)
                    mePosition = me.position;
            }
            this.gameService.app().iterate(dT);
            if (me !== undefined) {
                this.gameService.app().iterateSelf(me, dT);
            }
            if (this.gameService.app().filter !== undefined) {
                if (this.gameService.app().players.length > 0) {
                    const players = this.gameService.app().players.map((p) => this.gameService.app().gameStage.toGlobal(p.position));
                    const sun = this.gameService.app().gameStage.toGlobal(this.gameService.app().sunGameObject.gameObject.position);
                    let ownPlayerIndex = 0;
                    if (this.userName !== undefined) {
                        ownPlayerIndex = this.gameService.app().players.findIndex((p) => p.id === this.userName);
                        ownPlayerIndex = ownPlayerIndex >= 0 ? ownPlayerIndex : 0;
                    }
                    this.gameService.app().filter.iterate(players, sun, dT, ownPlayerIndex);
                }
            }
        });
    }
    login(userName) {
        this.userName = userName;
    }
    logout() {
        this.userName = undefined;
    }
    getUserName() {
        return this.userName;
    }
    isLoggedIn() {
        return this.userName !== undefined;
    }
}
PlayerService.ɵfac = function PlayerService_Factory(t) { return new (t || PlayerService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"])); };
PlayerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: PlayerService, factory: PlayerService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "grfs":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/*! exports provided: common, Cannon, Inventory, Particle, Projectile, ScoreboardEntry, ShipEquipment, ShipFitting, Skill, Spaceship, Structure, Factories, CMath, Physics, BoundryUpdateMessage, ScoreboardUpdateMessage, EnemySpawnMessage, ShipEquipmentUpdateMessage, ShipEquipmentMessage, ShipEquipmentStartMessage, ShipEquipmentStopMessage, PlayerMoveToMessage, PlayerOrbitMessage, PlayerStructureMessage, PlayerActionMessage, PlayerJoinedMessage, PlayerKilledMessage, PlayerSelfKillMessage, PlayerTargetSkillUsedMessage, PlayerUpdateMessage, ProjectileDestroyMessage, ProjectileMessage, ProjectileSpawnMessage, ProjectileUpdateMessage, StructureDestroyMessage, StructureMessage, StructureSpawnMessage, PlayerMessage, PlayerTargetMessage, LobbyQueryMessage, PlayerLoginMessage, DebugMessage, Message, MessageFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/common */ "yuBP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "common", function() { return _lib_common__WEBPACK_IMPORTED_MODULE_0__["common"]; });

/* harmony import */ var _lib_model_Cannon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/model/Cannon */ "iSZX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cannon", function() { return _lib_model_Cannon__WEBPACK_IMPORTED_MODULE_1__["Cannon"]; });

/* harmony import */ var _lib_model_Inventory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/model/Inventory */ "60Gs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Inventory", function() { return _lib_model_Inventory__WEBPACK_IMPORTED_MODULE_2__["Inventory"]; });

/* harmony import */ var _lib_model_Particle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/model/Particle */ "FBcD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return _lib_model_Particle__WEBPACK_IMPORTED_MODULE_3__["Particle"]; });

/* harmony import */ var _lib_model_Projectile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/model/Projectile */ "FzS+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Projectile", function() { return _lib_model_Projectile__WEBPACK_IMPORTED_MODULE_4__["Projectile"]; });

/* harmony import */ var _lib_model_ScoreboardEntry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/model/ScoreboardEntry */ "t/Q7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScoreboardEntry", function() { return _lib_model_ScoreboardEntry__WEBPACK_IMPORTED_MODULE_5__["ScoreboardEntry"]; });

/* harmony import */ var _lib_model_ShipEquipment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/model/ShipEquipment */ "AvLL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShipEquipment", function() { return _lib_model_ShipEquipment__WEBPACK_IMPORTED_MODULE_6__["ShipEquipment"]; });

/* harmony import */ var _lib_model_ShipFitting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/model/ShipFitting */ "pPBT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShipFitting", function() { return _lib_model_ShipFitting__WEBPACK_IMPORTED_MODULE_7__["ShipFitting"]; });

/* harmony import */ var _lib_model_Skill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/model/Skill */ "2h6S");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Skill", function() { return _lib_model_Skill__WEBPACK_IMPORTED_MODULE_8__["Skill"]; });

/* harmony import */ var _lib_model_Spaceship__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/model/Spaceship */ "7Pr8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spaceship", function() { return _lib_model_Spaceship__WEBPACK_IMPORTED_MODULE_9__["Spaceship"]; });

/* harmony import */ var _lib_model_Structure__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/model/Structure */ "Eux7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Structure", function() { return _lib_model_Structure__WEBPACK_IMPORTED_MODULE_10__["Structure"]; });

/* harmony import */ var _lib_model_TimedAbility__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/model/TimedAbility */ "xQXk");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_util_Factories__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/util/Factories */ "gziN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Factories", function() { return _lib_util_Factories__WEBPACK_IMPORTED_MODULE_12__["Factories"]; });

/* harmony import */ var _lib_util_VectorInterface__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/util/VectorInterface */ "D2XO");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_util_CMath__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lib/util/CMath */ "UiYe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CMath", function() { return _lib_util_CMath__WEBPACK_IMPORTED_MODULE_14__["CMath"]; });

/* harmony import */ var _lib_physics_Physics__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lib/physics/Physics */ "kpEc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Physics", function() { return _lib_physics_Physics__WEBPACK_IMPORTED_MODULE_15__["Physics"]; });

/* harmony import */ var _lib_message_game_BoundryUpdateMessage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lib/message/game/BoundryUpdateMessage */ "fq2V");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoundryUpdateMessage", function() { return _lib_message_game_BoundryUpdateMessage__WEBPACK_IMPORTED_MODULE_16__["BoundryUpdateMessage"]; });

/* harmony import */ var _lib_message_game_ScoreboardUpdateMessage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./lib/message/game/ScoreboardUpdateMessage */ "A5GZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScoreboardUpdateMessage", function() { return _lib_message_game_ScoreboardUpdateMessage__WEBPACK_IMPORTED_MODULE_17__["ScoreboardUpdateMessage"]; });

/* harmony import */ var _lib_message_game_SpawnEnemyMessage__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./lib/message/game/SpawnEnemyMessage */ "2Q0a");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EnemySpawnMessage", function() { return _lib_message_game_SpawnEnemyMessage__WEBPACK_IMPORTED_MODULE_18__["EnemySpawnMessage"]; });

/* harmony import */ var _lib_message_game_equipment_ProjectileUpdateMessage__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./lib/message/game/equipment/ProjectileUpdateMessage */ "hJEP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentUpdateMessage", function() { return _lib_message_game_equipment_ProjectileUpdateMessage__WEBPACK_IMPORTED_MODULE_19__["ShipEquipmentUpdateMessage"]; });

/* harmony import */ var _lib_message_game_equipment_ShipEquipmentMessage__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./lib/message/game/equipment/ShipEquipmentMessage */ "NXai");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentMessage", function() { return _lib_message_game_equipment_ShipEquipmentMessage__WEBPACK_IMPORTED_MODULE_20__["ShipEquipmentMessage"]; });

/* harmony import */ var _lib_message_game_equipment_ShipEquipmentStartMessage__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./lib/message/game/equipment/ShipEquipmentStartMessage */ "shvk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentStartMessage", function() { return _lib_message_game_equipment_ShipEquipmentStartMessage__WEBPACK_IMPORTED_MODULE_21__["ShipEquipmentStartMessage"]; });

/* harmony import */ var _lib_message_game_equipment_ShipEquipmentStopMessage__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./lib/message/game/equipment/ShipEquipmentStopMessage */ "zKcn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentStopMessage", function() { return _lib_message_game_equipment_ShipEquipmentStopMessage__WEBPACK_IMPORTED_MODULE_22__["ShipEquipmentStopMessage"]; });

/* harmony import */ var _lib_message_game_player_movement_PlayerMoveToMessage__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./lib/message/game/player/movement/PlayerMoveToMessage */ "9FBD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerMoveToMessage", function() { return _lib_message_game_player_movement_PlayerMoveToMessage__WEBPACK_IMPORTED_MODULE_23__["PlayerMoveToMessage"]; });

/* harmony import */ var _lib_message_game_player_movement_PlayerOrbitMessage__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./lib/message/game/player/movement/PlayerOrbitMessage */ "suPv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerOrbitMessage", function() { return _lib_message_game_player_movement_PlayerOrbitMessage__WEBPACK_IMPORTED_MODULE_24__["PlayerOrbitMessage"]; });

/* harmony import */ var _lib_message_game_player_movement_PlayerStructureMessage__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lib/message/game/player/movement/PlayerStructureMessage */ "/inu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerStructureMessage", function() { return _lib_message_game_player_movement_PlayerStructureMessage__WEBPACK_IMPORTED_MODULE_25__["PlayerStructureMessage"]; });

/* harmony import */ var _lib_message_game_player_PlayerActionMessage__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./lib/message/game/player/PlayerActionMessage */ "c3JD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerActionMessage", function() { return _lib_message_game_player_PlayerActionMessage__WEBPACK_IMPORTED_MODULE_26__["PlayerActionMessage"]; });

/* harmony import */ var _lib_message_game_player_PlayerJoinedMessage__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./lib/message/game/player/PlayerJoinedMessage */ "Xv8i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerJoinedMessage", function() { return _lib_message_game_player_PlayerJoinedMessage__WEBPACK_IMPORTED_MODULE_27__["PlayerJoinedMessage"]; });

/* harmony import */ var _lib_message_game_player_PlayerKilledMessage__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./lib/message/game/player/PlayerKilledMessage */ "dGHj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerKilledMessage", function() { return _lib_message_game_player_PlayerKilledMessage__WEBPACK_IMPORTED_MODULE_28__["PlayerKilledMessage"]; });

/* harmony import */ var _lib_message_game_player_PlayerSelfKillMessage__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./lib/message/game/player/PlayerSelfKillMessage */ "vsoE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerSelfKillMessage", function() { return _lib_message_game_player_PlayerSelfKillMessage__WEBPACK_IMPORTED_MODULE_29__["PlayerSelfKillMessage"]; });

/* harmony import */ var _lib_message_game_player_PlayerSkillUsedMessage__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./lib/message/game/player/PlayerSkillUsedMessage */ "W1wD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerTargetSkillUsedMessage", function() { return _lib_message_game_player_PlayerSkillUsedMessage__WEBPACK_IMPORTED_MODULE_30__["PlayerTargetSkillUsedMessage"]; });

/* harmony import */ var _lib_message_game_player_PlayerUpdateMessage__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./lib/message/game/player/PlayerUpdateMessage */ "FzT8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerUpdateMessage", function() { return _lib_message_game_player_PlayerUpdateMessage__WEBPACK_IMPORTED_MODULE_31__["PlayerUpdateMessage"]; });

/* harmony import */ var _lib_message_game_projectile_ProjectileDestroyMessage__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./lib/message/game/projectile/ProjectileDestroyMessage */ "ntK+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileDestroyMessage", function() { return _lib_message_game_projectile_ProjectileDestroyMessage__WEBPACK_IMPORTED_MODULE_32__["ProjectileDestroyMessage"]; });

/* harmony import */ var _lib_message_game_projectile_ProjectileMessage__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./lib/message/game/projectile/ProjectileMessage */ "HEA6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileMessage", function() { return _lib_message_game_projectile_ProjectileMessage__WEBPACK_IMPORTED_MODULE_33__["ProjectileMessage"]; });

/* harmony import */ var _lib_message_game_projectile_ProjectileSpawnMessage__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./lib/message/game/projectile/ProjectileSpawnMessage */ "68Tl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileSpawnMessage", function() { return _lib_message_game_projectile_ProjectileSpawnMessage__WEBPACK_IMPORTED_MODULE_34__["ProjectileSpawnMessage"]; });

/* harmony import */ var _lib_message_game_projectile_ProjectileUpdateMessage__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./lib/message/game/projectile/ProjectileUpdateMessage */ "Tzio");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectileUpdateMessage", function() { return _lib_message_game_projectile_ProjectileUpdateMessage__WEBPACK_IMPORTED_MODULE_35__["ProjectileUpdateMessage"]; });

/* harmony import */ var _lib_message_game_structures_StructureDestroyMessage__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./lib/message/game/structures/StructureDestroyMessage */ "YRae");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StructureDestroyMessage", function() { return _lib_message_game_structures_StructureDestroyMessage__WEBPACK_IMPORTED_MODULE_36__["StructureDestroyMessage"]; });

/* harmony import */ var _lib_message_game_structures_StructureMessage__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./lib/message/game/structures/StructureMessage */ "kLez");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StructureMessage", function() { return _lib_message_game_structures_StructureMessage__WEBPACK_IMPORTED_MODULE_37__["StructureMessage"]; });

/* harmony import */ var _lib_message_game_structures_StructureSpawnMessage__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./lib/message/game/structures/StructureSpawnMessage */ "oz6o");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StructureSpawnMessage", function() { return _lib_message_game_structures_StructureSpawnMessage__WEBPACK_IMPORTED_MODULE_38__["StructureSpawnMessage"]; });

/* harmony import */ var _lib_message_generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./lib/message/generic/PlayerMessage */ "sYV4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerMessage", function() { return _lib_message_generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_39__["PlayerMessage"]; });

/* harmony import */ var _lib_message_generic_PlayerTargetMessage__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./lib/message/generic/PlayerTargetMessage */ "D1wQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerTargetMessage", function() { return _lib_message_generic_PlayerTargetMessage__WEBPACK_IMPORTED_MODULE_40__["PlayerTargetMessage"]; });

/* harmony import */ var _lib_message_login_LobbyQueryMessage__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./lib/message/login/LobbyQueryMessage */ "FJrd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LobbyQueryMessage", function() { return _lib_message_login_LobbyQueryMessage__WEBPACK_IMPORTED_MODULE_41__["LobbyQueryMessage"]; });

/* harmony import */ var _lib_message_login_PlayerLoginMessage__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./lib/message/login/PlayerLoginMessage */ "iR7v");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerLoginMessage", function() { return _lib_message_login_PlayerLoginMessage__WEBPACK_IMPORTED_MODULE_42__["PlayerLoginMessage"]; });

/* harmony import */ var _lib_message_DebugMessage__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./lib/message/DebugMessage */ "fxGD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DebugMessage", function() { return _lib_message_DebugMessage__WEBPACK_IMPORTED_MODULE_43__["DebugMessage"]; });

/* harmony import */ var _lib_message_Message__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./lib/message/Message */ "pdQO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return _lib_message_Message__WEBPACK_IMPORTED_MODULE_44__["Message"]; });

/* harmony import */ var _lib_message_MessageFactory__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./lib/message/MessageFactory */ "m0YA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageFactory", function() { return _lib_message_MessageFactory__WEBPACK_IMPORTED_MODULE_45__["MessageFactory"]; });


// models










//export * from './lib/model/TargetSkill';

// util




// messages
































/***/ }),

/***/ "gtQL":
/*!****************************************************************************************!*\
  !*** ./apps/client/src/app/view/ui/fitting/equipment-slot/equipment-slot.component.ts ***!
  \****************************************************************************************/
/*! exports provided: EquipmentSlotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentSlotComponent", function() { return EquipmentSlotComponent; });
/* harmony import */ var _service_game_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../service/game.service */ "qb5o");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _equipment_window_equipment_window_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../equipment-window/equipment-window.component */ "s3YU");





function EquipmentSlotComponent_ng_container_4_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function EquipmentSlotComponent_ng_container_4_div_5_Template_div_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9); const fitted_r5 = ctx.$implicit; const i_r6 = ctx.index; const tierObj_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r7.removeEquipment(fitted_r5, tierObj_r1.tier, i_r6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "X");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fitted_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](fitted_r5.name);
} }
function EquipmentSlotComponent_ng_container_4_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function EquipmentSlotComponent_ng_container_4_div_6_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const tierObj_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r10.addTier = tierObj_r1.tier; });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function EquipmentSlotComponent_ng_container_4_div_7_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function EquipmentSlotComponent_ng_container_4_div_7_div_6_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r17); const equipment_r14 = ctx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3); return ctx_r16.addEquipment(equipment_r14); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "app-equipment-window", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const equipment_r14 = ctx.$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("equipment", equipment_r14)("description", ctx_r13.getDescription(equipment_r14.name));
} }
const _c0 = function (a0, a1, a2) { return { atk: a0, util: a1, passive: a2 }; };
function EquipmentSlotComponent_ng_container_4_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Choose Equipment");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function EquipmentSlotComponent_ng_container_4_div_7_Template_div_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r18.addTier = 0; });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, EquipmentSlotComponent_ng_container_4_div_7_div_6_Template, 3, 2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tierObj_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](2, _c0, tierObj_r1.tier === 1, tierObj_r1.tier === 2, tierObj_r1.tier === 3));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r4.getAllEquipment(tierObj_r1.tier));
} }
function EquipmentSlotComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, EquipmentSlotComponent_ng_container_4_div_5_Template, 5, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, EquipmentSlotComponent_ng_container_4_div_6_Template, 3, 0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, EquipmentSlotComponent_ng_container_4_div_7_Template, 7, 6, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const tierObj_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](5, _c0, tierObj_r1.tier === 1, tierObj_r1.tier === 2, tierObj_r1.tier === 3));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", tierObj_r1.name, " Module(s) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", tierObj_r1.fitting);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.addTier !== tierObj_r1.tier && tierObj_r1.fitting.length < 3 && ctx_r0.getFitting().length < 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.addTier === tierObj_r1.tier);
} }
class EquipmentSlotComponent {
    constructor(gameService) {
        this.gameService = gameService;
        this.equipmentCPUCapacity = 200; // TODO
        this.tierList = [
            {
                tier: 1,
                name: "Attack",
                fitting: []
            },
            {
                tier: 2,
                name: "Utility",
                fitting: []
            },
            {
                tier: 3,
                name: "Passive",
                fitting: []
            }
        ];
        this.addTier = 0;
    }
    ngOnInit() {
    }
    isValid() {
        return this.cpuCost <= this.equipmentCPUCapacity;
    }
    getFitting() {
        return this.tierList.reduce((acc, cur) => {
            cur.fitting.forEach((fit) => {
                acc.push(fit);
            });
            return acc;
        }, []);
    }
    get database() {
        return this.gameService.fittingDB.db;
    }
    getDescription(name) {
        return this.gameService.fittingDB.getDescription(name);
    }
    getAllEquipment(tier) {
        return this.database.filter((eq) => eq.tier === tier);
    }
    getCPUP() {
        const p = this.cpuCost * 100 / this.equipmentCPUCapacity;
        return p <= 100 ? p : 100;
    }
    removeEquipment(equipment, tier, index) {
        this.tierList.find((o) => o.tier === tier).fitting.splice(index, 1);
    }
    addEquipment(equipment) {
        const list = this.tierList.find((tier) => tier.tier === equipment.tier);
        if (list !== undefined) {
            list.fitting.push(equipment);
            this.addTier = 0;
        }
    }
    get cpuCost() {
        return this.tierList.reduce((acc, cur) => {
            acc += cur.fitting.reduce((a, c) => {
                a += c.cpuCost;
                return a;
            }, 0);
            return acc;
        }, 0);
    }
}
EquipmentSlotComponent.ɵfac = function EquipmentSlotComponent_Factory(t) { return new (t || EquipmentSlotComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_service_game_service__WEBPACK_IMPORTED_MODULE_0__["GameService"])); };
EquipmentSlotComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: EquipmentSlotComponent, selectors: [["app-equipment-slot"]], inputs: { equipmentList: "equipmentList" }, decls: 5, vars: 5, consts: [[1, "powerCostWrapper"], [1, "progress", "speed", "slot"], [1, "value"], [1, "equipmentSlotWrapper"], [4, "ngFor", "ngForOf"], [1, "tierWrap", 3, "ngClass"], [1, "tierName"], [1, "fitted"], ["class", "equipment", 4, "ngFor", "ngForOf"], ["class", "add equipment", 3, "click", 4, "ngIf"], ["class", "potentialEquipment", 3, "ngClass", 4, "ngIf"], [1, "equipment"], [1, "name"], [1, "action", 3, "click"], [1, "add", "equipment", 3, "click"], [1, "potentialEquipment", 3, "ngClass"], [1, "header"], [1, "equipment", 3, "click"], [3, "equipment", "description"]], template: function EquipmentSlotComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, EquipmentSlotComponent_ng_container_4_Template, 8, 9, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-label", "CPU: " + ctx.cpuCost)("cost-label", ctx.equipmentCPUCapacity);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx.getCPUP(), "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.tierList);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _equipment_window_equipment_window_component__WEBPACK_IMPORTED_MODULE_3__["EquipmentWindowComponent"]], styles: [".powerCostWrapper[_ngcontent-%COMP%] {\n  background-color: cornflowerblue;\n  flex: 1 1 auto;\n}\n\n.progress[_ngcontent-%COMP%] {\n  height: 2em;\n  width: 100%;\n  font-size: 14px;\n  position: relative;\n}\n\n.progress[_ngcontent-%COMP%]:before {\n  content: attr(data-label);\n  position: absolute;\n  text-align: left;\n  line-height: 2em;\n  left: 5px;\n  right: 0;\n}\n\n.progress[_ngcontent-%COMP%]:after {\n  content: attr(cost-label);\n  position: absolute;\n  text-align: right;\n  line-height: 2em;\n  left: 0;\n  right: 5px;\n}\n\n.value[_ngcontent-%COMP%] {\n  background-color: #ff5c45;\n  display: inline-block;\n  height: 100%;\n}\n\n.atk[_ngcontent-%COMP%] {\n  border: 1px solid red;\n}\n\n.atk[_ngcontent-%COMP%]   .tierName[_ngcontent-%COMP%] {\n  background-color: red;\n}\n\n.util[_ngcontent-%COMP%] {\n  border: 1px solid #7cc4ff;\n}\n\n.util[_ngcontent-%COMP%]   .tierName[_ngcontent-%COMP%] {\n  background-color: #7cc4ff;\n}\n\n.passive[_ngcontent-%COMP%] {\n  border: 1px solid grey;\n}\n\n.passive[_ngcontent-%COMP%]   .tierName[_ngcontent-%COMP%] {\n  background-color: grey;\n}\n\n.tierWrap[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.tierWrap[_ngcontent-%COMP%]   .tierName[_ngcontent-%COMP%] {\n  padding: 5px;\n  margin: 5px;\n}\n\n.tierWrap[_ngcontent-%COMP%]   .fitted[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.tierWrap[_ngcontent-%COMP%]   .fitted[_ngcontent-%COMP%]   .equipment[_ngcontent-%COMP%] {\n  background-color: cornflowerblue;\n  color: black;\n  margin: 10px;\n  display: flex;\n}\n\n.tierWrap[_ngcontent-%COMP%]   .fitted[_ngcontent-%COMP%]   .equipment[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  padding: 5px;\n}\n\n.tierWrap[_ngcontent-%COMP%]   .fitted[_ngcontent-%COMP%]   .equipment[_ngcontent-%COMP%]   .action[_ngcontent-%COMP%] {\n  padding: 5px;\n  color: cornflowerblue;\n  background-color: purple;\n  font-weight: bold;\n}\n\n.wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 1 auto;\n  flex-flow: column;\n  padding: 20px;\n  box-sizing: border-box;\n}\n\n.equipmentSlotWrapper[_ngcontent-%COMP%] {\n  flex: 1 1 100%;\n  display: flex;\n  flex-flow: column;\n}\n\n.potentialEquipment[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.potentialEquipment[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  flex: 1 1 100%;\n  padding: 5px;\n  margin: 5px;\n  color: cornflowerblue;\n  font-weight: bold;\n}\n\n.potentialEquipment[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .action[_ngcontent-%COMP%] {\n  padding: 5px;\n  margin: 5px;\n  background-color: cornflowerblue;\n  flex: 0 0 5%;\n}\n\n.potentialEquipment[_ngcontent-%COMP%]   .equipment[_ngcontent-%COMP%] {\n  padding: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2VxdWlwbWVudC1zbG90LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsZ0NBQUE7RUFDQSxjQUFBO0FBREY7O0FBSUE7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFFQSxrQkFBQTtBQUZGOztBQUlBO0VBQ0UseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtBQURGOztBQUtBO0VBQ0UseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtBQUZGOztBQUtBO0VBQ0UseUJBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7QUFGRjs7QUFLQTtFQUtFLHFCQUFBO0FBTkY7O0FBRUU7RUFDRSxxQkFBQTtBQUFKOztBQU1BO0VBS0UseUJBQUE7QUFQRjs7QUFHRTtFQUNFLHlCQUFBO0FBREo7O0FBT0E7RUFLRSxzQkFBQTtBQVJGOztBQUlFO0VBQ0Usc0JBQUE7QUFGSjs7QUFRQTtFQU9FLGdCQUFBO0VBQ0EsbUJBQUE7QUFYRjs7QUFLRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBSEo7O0FBU0U7RUFFRSxhQUFBO0VBQ0EsZUFBQTtBQVJKOztBQVVJO0VBQ0UsZ0NBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUFSTjs7QUFVTTtFQUNFLFlBQUE7QUFSUjs7QUFXTTtFQUNFLFlBQUE7RUFDQSxxQkFBQTtFQUNBLHdCQUFBO0VBQ0EsaUJBQUE7QUFUUjs7QUF1QkE7RUFDRSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBcEJGOztBQXVCQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFwQkY7O0FBMEJFO0VBQ0UsYUFBQTtBQXZCSjs7QUEwQkk7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBeEJOOztBQTJCSTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0NBQUE7RUFDQSxZQUFBO0FBekJOOztBQTZCRTtFQUVFLFlBQUE7QUE1QkoiLCJmaWxlIjoiZXF1aXBtZW50LXNsb3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLnBvd2VyQ29zdFdyYXBwZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBjb3JuZmxvd2VyYmx1ZTtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5wcm9ncmVzcyB7XG4gIGhlaWdodDogMmVtO1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1zaXplOiAxNHB4O1xuXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5wcm9ncmVzczpiZWZvcmUge1xuICBjb250ZW50OiBhdHRyKGRhdGEtbGFiZWwpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGxpbmUtaGVpZ2h0OiAyZW07XG4gIGxlZnQ6IDVweDtcbiAgcmlnaHQ6IDA7XG5cbn1cblxuLnByb2dyZXNzOmFmdGVyIHtcbiAgY29udGVudDogYXR0cihjb3N0LWxhYmVsKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgbGluZS1oZWlnaHQ6IDJlbTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDVweDtcbn1cblxuLnZhbHVlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNWM0NTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5hdGsge1xuICAudGllck5hbWUge1xuICAgIGJhY2tncm91bmQtY29sb3I6cmVkO1xuICB9XG5cbiAgYm9yZGVyOjFweCBzb2xpZCByZWQ7XG59XG5cbi51dGlsIHtcbiAgLnRpZXJOYW1lIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2NjNGZmO1xuICB9XG5cbiAgYm9yZGVyOjFweCBzb2xpZCAjN2NjNGZmO1xufVxuXG4ucGFzc2l2ZSB7XG4gIC50aWVyTmFtZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgfVxuXG4gIGJvcmRlcjoxcHggc29saWQgZ3JleTtcbn1cblxuLnRpZXJXcmFwIHtcblxuICAudGllck5hbWUge1xuICAgIHBhZGRpbmc6NXB4O1xuICAgIG1hcmdpbjo1cHg7XG4gIH1cblxuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuXG4gIC5maXR0ZWQge1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG5cbiAgICAuZXF1aXBtZW50IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvcm5mbG93ZXJibHVlO1xuICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgbWFyZ2luOjEwcHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuXG4gICAgICAubmFtZSB7XG4gICAgICAgIHBhZGRpbmc6NXB4O1xuICAgICAgfVxuXG4gICAgICAuYWN0aW9uIHtcbiAgICAgICAgcGFkZGluZzo1cHg7XG4gICAgICAgIGNvbG9yOiBjb3JuZmxvd2VyYmx1ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjpwdXJwbGU7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgfVxuXG4gICAgfVxuXG5cblxuXG4gIH1cblxuXG59XG5cblxuLndyYXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4OiAxIDEgYXV0bztcbiAgZmxleC1mbG93OiBjb2x1bW47XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi5lcXVpcG1lbnRTbG90V3JhcHBlciB7XG4gIGZsZXg6IDEgMSAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWZsb3c6IGNvbHVtbjtcbn1cblxuLnBvdGVudGlhbEVxdWlwbWVudCB7XG5cblxuICAuaGVhZGVyIHtcbiAgICBkaXNwbGF5OmZsZXg7XG5cblxuICAgIC5uYW1lIHtcbiAgICAgIGZsZXg6IDEgMSAxMDAlO1xuICAgICAgcGFkZGluZzo1cHg7XG4gICAgICBtYXJnaW46NXB4O1xuICAgICAgY29sb3I6IGNvcm5mbG93ZXJibHVlO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgLmFjdGlvbiB7XG4gICAgICBwYWRkaW5nOjVweDtcbiAgICAgIG1hcmdpbjo1cHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb3JuZmxvd2VyYmx1ZTtcbiAgICAgIGZsZXg6IDAgMCA1JTtcbiAgICB9XG4gIH1cblxuICAuZXF1aXBtZW50IHtcblxuICAgIHBhZGRpbmc6NXB4O1xuICB9XG59XG4iXX0= */"] });


/***/ }),

/***/ "gziN":
/*!***********************************************!*\
  !*** ./libs/common/src/lib/util/Factories.ts ***!
  \***********************************************/
/*! exports provided: Factories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Factories", function() { return Factories; });
/* harmony import */ var _model_Spaceship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Spaceship */ "7Pr8");

class Factories {
    static createSpaceship(msg) {
        return new _model_Spaceship__WEBPACK_IMPORTED_MODULE_0__["Spaceship"](msg.source, msg.color);
    }
}


/***/ }),

/***/ "hJEP":
/*!*******************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/equipment/ProjectileUpdateMessage.ts ***!
  \*******************************************************************************/
/*! exports provided: ShipEquipmentUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentUpdateMessage", function() { return ShipEquipmentUpdateMessage; });
/* harmony import */ var _ShipEquipmentMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShipEquipmentMessage */ "NXai");

class ShipEquipmentUpdateMessage extends _ShipEquipmentMessage__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentMessage"] {
}


/***/ }),

/***/ "i0E/":
/*!**********************************************!*\
  !*** ./apps/client/src/app/app.component.ts ***!
  \**********************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");


class AppComponent {
    constructor() {
        this.title = 'physicsWeb';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "iR7v":
/*!*****************************************************************!*\
  !*** ./libs/common/src/lib/message/login/PlayerLoginMessage.ts ***!
  \*****************************************************************/
/*! exports provided: PlayerLoginMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerLoginMessage", function() { return PlayerLoginMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generic/PlayerMessage */ "sYV4");

class PlayerLoginMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(source, fitting) {
        super(source);
        this.source = source;
        this.fitting = fitting;
        this.type = "playerLoginMessage";
    }
}


/***/ }),

/***/ "iSZX":
/*!*********************************************!*\
  !*** ./libs/common/src/lib/model/Cannon.ts ***!
  \*********************************************/
/*! exports provided: Cannon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cannon", function() { return Cannon; });
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


/***/ }),

/***/ "kLez":
/*!*************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/structures/StructureMessage.ts ***!
  \*************************************************************************/
/*! exports provided: StructureMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureMessage", function() { return StructureMessage; });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Message */ "pdQO");

class StructureMessage extends _Message__WEBPACK_IMPORTED_MODULE_0__["Message"] {
    constructor(id) {
        super();
        this.id = id;
        this.type = "structureMessage";
    }
}


/***/ }),

/***/ "kpEc":
/*!************************************************!*\
  !*** ./libs/common/src/lib/physics/Physics.ts ***!
  \************************************************/
/*! exports provided: Physics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Physics", function() { return Physics; });
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


/***/ }),

/***/ "m0YA":
/*!*******************************************************!*\
  !*** ./libs/common/src/lib/message/MessageFactory.ts ***!
  \*******************************************************/
/*! exports provided: MessageFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageFactory", function() { return MessageFactory; });
class MessageFactory {
    static create(message) {
        return null;
    }
}


/***/ }),

/***/ "m8s2":
/*!***********************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientScoreboardUpdateMessage.ts ***!
  \***********************************************************************************/
/*! exports provided: ClientScoreboardUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientScoreboardUpdateMessage", function() { return ClientScoreboardUpdateMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");

class ClientScoreboardUpdateMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        //this.ui.scoreboard.scoreboard = (<ScoreboardUpdateMessage> message).entries;
    }
}


/***/ }),

/***/ "ntK+":
/*!*********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/projectile/ProjectileDestroyMessage.ts ***!
  \*********************************************************************************/
/*! exports provided: ProjectileDestroyMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectileDestroyMessage", function() { return ProjectileDestroyMessage; });
/* harmony import */ var _ProjectileMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectileMessage */ "HEA6");

class ProjectileDestroyMessage extends _ProjectileMessage__WEBPACK_IMPORTED_MODULE_0__["ProjectileMessage"] {
    constructor(projectile) {
        super(projectile.id);
        this.type = "projectileDestroyMessage";
    }
}


/***/ }),

/***/ "oz6o":
/*!******************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/structures/StructureSpawnMessage.ts ***!
  \******************************************************************************/
/*! exports provided: StructureSpawnMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructureSpawnMessage", function() { return StructureSpawnMessage; });
/* harmony import */ var _StructureMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StructureMessage */ "kLez");

class StructureSpawnMessage extends _StructureMessage__WEBPACK_IMPORTED_MODULE_0__["StructureMessage"] {
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


/***/ }),

/***/ "pPBT":
/*!**************************************************!*\
  !*** ./libs/common/src/lib/model/ShipFitting.ts ***!
  \**************************************************/
/*! exports provided: ShipFitting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipFitting", function() { return ShipFitting; });
class ShipFitting {
    constructor() {
        this.fitting = [];
    }
}


/***/ }),

/***/ "pdQO":
/*!************************************************!*\
  !*** ./libs/common/src/lib/message/Message.ts ***!
  \************************************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
class Message {
}


/***/ }),

/***/ "q7cF":
/*!*******************************************!*\
  !*** ./apps/client/src/app/app.module.ts ***!
  \*******************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "Qx5T");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "i0E/");
/* harmony import */ var _view_ui_ui_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/ui/ui.component */ "VkKP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _view_ui_fitting_fitting_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/ui/fitting/fitting.component */ "yjkM");
/* harmony import */ var _view_ui_headsup_headsup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/ui/headsup/headsup.component */ "Wv7z");
/* harmony import */ var _view_util_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/util/progress-bar/progress-bar.component */ "8Fsd");
/* harmony import */ var _view_ui_fitting_equipment_window_equipment_window_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/ui/fitting/equipment-window/equipment-window.component */ "s3YU");
/* harmony import */ var _view_ui_scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view/ui/scoreboard/scoreboard.component */ "81Ne");
/* harmony import */ var _view_game_game_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./view/game/game.component */ "3R5g");
/* harmony import */ var _view_ui_fitting_equipment_slot_equipment_slot_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./view/ui/fitting/equipment-slot/equipment-slot.component */ "gtQL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "8Y7J");













class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _view_ui_ui_component__WEBPACK_IMPORTED_MODULE_3__["UiComponent"],
        _view_ui_fitting_fitting_component__WEBPACK_IMPORTED_MODULE_5__["FittingComponent"],
        _view_ui_headsup_headsup_component__WEBPACK_IMPORTED_MODULE_6__["HeadsupComponent"],
        _view_util_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_7__["ProgressBarComponent"],
        _view_ui_fitting_equipment_window_equipment_window_component__WEBPACK_IMPORTED_MODULE_8__["EquipmentWindowComponent"],
        _view_ui_scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_9__["ScoreboardComponent"],
        _view_game_game_component__WEBPACK_IMPORTED_MODULE_10__["GameComponent"],
        _view_ui_fitting_equipment_slot_equipment_slot_component__WEBPACK_IMPORTED_MODULE_11__["EquipmentSlotComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]] }); })();


/***/ }),

/***/ "qTRG":
/*!***********************************************************************!*\
  !*** ./apps/client/src/app/game/entity/equipment/EquipmentGOError.ts ***!
  \***********************************************************************/
/*! exports provided: EquipmentGOError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentGOError", function() { return EquipmentGOError; });
/* harmony import */ var _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ShipEquipmentGO */ "AGC5");

class EquipmentGOError extends _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentGO"] {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    onInit(parent) {
    }
    iterate(parent, delta) {
    }
    onDestroy(parent) {
    }
}


/***/ }),

/***/ "qb5o":
/*!*****************************************************!*\
  !*** ./apps/client/src/app/service/game.service.ts ***!
  \*****************************************************/
/*! exports provided: GameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameService", function() { return GameService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _game_SpaceShooter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/SpaceShooter */ "1wUB");
/* harmony import */ var _game_core_network_client_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game/core/network/client-enums */ "I8lz");
/* harmony import */ var _game_core_network_websocket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game/core/network/websocket.service */ "+lVC");
/* harmony import */ var _game_FittingDB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game/FittingDB */ "LxUT");
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _game_Events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../game/Events */ "2rDF");









class GameService {
    constructor(ngZone, socketService) {
        this.ngZone = ngZone;
        this.socketService = socketService;
        this.DEBUG = false;
        this.onConnect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onMessage = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.ngZone.runOutsideAngular(() => {
            this.application = new _game_SpaceShooter__WEBPACK_IMPORTED_MODULE_1__["SpaceShooter"]({ width: window.innerWidth, height: window.innerHeight, antialias: true, }); // this creates our pixi application
        });
        this.fittingDB = new _game_FittingDB__WEBPACK_IMPORTED_MODULE_4__["FittingDB"]();
        this.onConnect.subscribe((v) => {
            if (this.DEBUG) {
                const shipFitting = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_5__["ShipFitting"]();
                shipFitting.fitting = this.fittingDB.getSet("default");
                _game_Events__WEBPACK_IMPORTED_MODULE_6__["Events"].loginPlayer.emit({
                    name: "Wasser",
                    fitting: shipFitting
                });
            }
        });
    }
    app() {
        return this.application;
    }
    connect() {
        this.socketService.initSocket();
        this.ioConnection = this.socketService.onMessage()
            .subscribe((message) => {
            this.onMessage.emit(message);
        });
        this.socketService.onEvent(_game_core_network_client_enums__WEBPACK_IMPORTED_MODULE_2__["EventIO"].CONNECT)
            .subscribe(() => {
            console.log('connected');
            this.onConnect.emit();
        });
        this.socketService.onEvent(_game_core_network_client_enums__WEBPACK_IMPORTED_MODULE_2__["EventIO"].DISCONNECT)
            .subscribe(() => {
            console.log('disconnected');
        });
    }
    send(msg) {
        this.socketService.send(msg);
    }
    clear() {
        const players = this.app().players.map(p => p);
        players.forEach((p) => {
            this.app().killPlayer(p);
        });
        const projectiles = this.app().projectiles.map(p => p);
        projectiles.forEach((p) => {
            this.app().destroyProjectile(p);
        });
        const structures = this.app().structures.map(p => p);
        structures.forEach((structureGO) => {
            this.app().gameStage.removeChild(structureGO.gameObject);
            const p = this.app().structures.findIndex(value => value.id === structureGO.id);
            if (p !== undefined) {
                structureGO.onDestroy();
                this.app().structures.splice(p, 1);
            }
        });
    }
}
GameService.ɵfac = function GameService_Factory(t) { return new (t || GameService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_game_core_network_websocket_service__WEBPACK_IMPORTED_MODULE_3__["WebsocketService"])); };
GameService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GameService, factory: GameService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "s3YU":
/*!********************************************************************************************!*\
  !*** ./apps/client/src/app/view/ui/fitting/equipment-window/equipment-window.component.ts ***!
  \********************************************************************************************/
/*! exports provided: EquipmentWindowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentWindowComponent", function() { return EquipmentWindowComponent; });
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");


class EquipmentWindowComponent {
    constructor() { }
    ngOnInit() {
    }
}
EquipmentWindowComponent.ɵfac = function EquipmentWindowComponent_Factory(t) { return new (t || EquipmentWindowComponent)(); };
EquipmentWindowComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: EquipmentWindowComponent, selectors: [["app-equipment-window"]], inputs: { equipment: "equipment", description: "description" }, decls: 12, vars: 3, consts: [[1, "wrap"], [1, "title"], [1, "name"], [1, "desc"], [1, "attr"], [1, "buy"]], template: function EquipmentWindowComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Cost:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.equipment.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.description);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.equipment.cpuCost);
    } }, styles: [".wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 10px;\n  background-color: cornflowerblue;\n  color: black;\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n\n.title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline;\n}\n\n.title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.name[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.desc[_ngcontent-%COMP%] {\n  font-style: italic;\n  font-size: 14px;\n  color: white;\n}\n\ntable[_ngcontent-%COMP%] {\n  border-left: 1px solid black;\n}\n\n.attr[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.attr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  width: 40px;\n  text-align: right;\n}\n\n.attr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  width: 80px;\n  color: darkslategrey;\n  font-size: 0.8em;\n}\n\n.buy[_ngcontent-%COMP%] {\n  background-color: black;\n  color: cornflowerblue;\n  font-weight: bold;\n  margin: 5px;\n  padding: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2VxdWlwbWVudC13aW5kb3cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxhQUFBO0VBQ0EsZ0NBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBSUU7RUFDRSxlQUFBO0FBREo7O0FBSUU7RUFDRSxjQUFBO0FBRko7O0FBT0E7RUFDRSxpQkFBQTtBQUpGOztBQU9BO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQUpGOztBQVFBO0VBRUUsNEJBQUE7QUFORjs7QUFTQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQU5GOztBQU9FO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FBTEo7O0FBT0U7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQUxKOztBQVNBO0VBQ0UsdUJBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFORiIsImZpbGUiOiJlcXVpcG1lbnQtd2luZG93LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndyYXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IGNvcm5mbG93ZXJibHVlO1xuICBjb2xvcjogYmxhY2s7XG4gIG1hcmdpbi10b3A6NXB4O1xuICBtYXJnaW4tYm90dG9tOjVweDtcbn1cblxuLnRpdGxlIHtcblxuICBzcGFuIHtcbiAgICBkaXNwbGF5OiBpbmxpbmU7XG4gIH1cblxuICBwIHtcbiAgICBkaXNwbGF5OiBibG9jaztcblxuICB9XG59XG5cbi5uYW1lIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5kZXNjIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOndoaXRlO1xufVxuXG5cbnRhYmxlIHtcblxuICBib3JkZXItbGVmdDoxcHggc29saWQgYmxhY2s7XG59XG5cbi5hdHRyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgdGQ6Zmlyc3QtY2hpbGQge1xuICAgIHdpZHRoOjQwcHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIH1cbiAgdGQ6bGFzdC1jaGlsZCB7XG4gICAgd2lkdGg6ODBweDtcbiAgICBjb2xvcjpkYXJrc2xhdGVncmV5O1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gIH1cbn1cblxuLmJ1eSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICBjb2xvcjogY29ybmZsb3dlcmJsdWU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW46NXB4O1xuICBwYWRkaW5nOjVweDtcblxufVxuIl19 */"] });


/***/ }),

/***/ "sYV4":
/*!**************************************************************!*\
  !*** ./libs/common/src/lib/message/generic/PlayerMessage.ts ***!
  \**************************************************************/
/*! exports provided: PlayerMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerMessage", function() { return PlayerMessage; });
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Message */ "pdQO");

class PlayerMessage extends _Message__WEBPACK_IMPORTED_MODULE_0__["Message"] {
    constructor(source) {
        super();
        this.source = source;
        this.type = "playerMessage";
    }
}


/***/ }),

/***/ "shvk":
/*!*********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/equipment/ShipEquipmentStartMessage.ts ***!
  \*********************************************************************************/
/*! exports provided: ShipEquipmentStartMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentStartMessage", function() { return ShipEquipmentStartMessage; });
/* harmony import */ var _ShipEquipmentMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShipEquipmentMessage */ "NXai");

class ShipEquipmentStartMessage extends _ShipEquipmentMessage__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentMessage"] {
}


/***/ }),

/***/ "suPv":
/*!********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/movement/PlayerOrbitMessage.ts ***!
  \********************************************************************************/
/*! exports provided: PlayerOrbitMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerOrbitMessage", function() { return PlayerOrbitMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../generic/PlayerMessage */ "sYV4");

class PlayerOrbitMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(player, target) {
        super(player);
        this.target = target;
        this.type = "playerOrbitMessage";
    }
}


/***/ }),

/***/ "t/Q7":
/*!******************************************************!*\
  !*** ./libs/common/src/lib/model/ScoreboardEntry.ts ***!
  \******************************************************/
/*! exports provided: ScoreboardEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreboardEntry", function() { return ScoreboardEntry; });
class ScoreboardEntry {
    constructor(name, kills) {
        this.name = name;
        this.kills = kills;
    }
}


/***/ }),

/***/ "t9lZ":
/*!*******************************************************************************!*\
  !*** ./apps/client/src/app/game/entity/messages/ClientPlayerUpdateMessage.ts ***!
  \*******************************************************************************/
/*! exports provided: ClientPlayerUpdateMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientPlayerUpdateMessage", function() { return ClientPlayerUpdateMessage; });
/* harmony import */ var _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/MessageRecieved */ "Io7Y");

class ClientPlayerUpdateMessage extends _model_MessageRecieved__WEBPACK_IMPORTED_MODULE_0__["ClientMessageRecieved"] {
    constructor(message) {
        super(message);
    }
    onRecieve(context) {
        let enemyGO = context.players.find(value => {
            return value.id === this.message.source;
        });
        if (enemyGO === undefined)
            return;
        enemyGO.position.x = this.message.x;
        enemyGO.position.y = this.message.y;
        enemyGO.speed.x = this.message.speedX;
        enemyGO.speed.y = this.message.speedY;
        enemyGO.rotation = this.message.rotation;
        //enemyGO.cannon.rotation = msg.gun_rotation;
        enemyGO.fitting.fitting = enemyGO.fitting.fitting.map((fit, index) => {
            fit.state = this.message.fitting.fitting[index].state;
            fit.remainingTime = this.message.fitting.fitting[index].remainingTime;
            return fit;
        });
        enemyGO.health = this.message.health;
        enemyGO.power = this.message.power;
        if (this.message.target !== undefined) {
            const target = context.players.find((p) => p.id === this.message.target);
            if (target !== undefined) {
                enemyGO.targetPlayer = target;
            }
        }
        else {
            enemyGO.targetPlayer = undefined;
        }
        enemyGO.activationProgress = this.message.activationProgress;
        enemyGO.iterateGraphics();
    }
}


/***/ }),

/***/ "uB5d":
/*!***********************************************************************!*\
  !*** ./apps/client/src/app/game/entity/equipment/EquipmentGOEmpty.ts ***!
  \***********************************************************************/
/*! exports provided: EquipmentGOEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentGOEmpty", function() { return EquipmentGOEmpty; });
/* harmony import */ var _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/ShipEquipmentGO */ "AGC5");

class EquipmentGOEmpty extends _model_ShipEquipmentGO__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentGO"] {
    constructor(shipEquipment) {
        super(shipEquipment);
    }
    onInit(parent) {
    }
    iterate(parent, delta) {
    }
    onDestroy(parent) {
    }
}


/***/ }),

/***/ "vsoE":
/*!**************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/player/PlayerSelfKillMessage.ts ***!
  \**************************************************************************/
/*! exports provided: PlayerSelfKillMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerSelfKillMessage", function() { return PlayerSelfKillMessage; });
/* harmony import */ var _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generic/PlayerMessage */ "sYV4");

class PlayerSelfKillMessage extends _generic_PlayerMessage__WEBPACK_IMPORTED_MODULE_0__["PlayerMessage"] {
    constructor(name) {
        super(name);
        this.type = "playerSelfKillMessage";
    }
}


/***/ }),

/***/ "w9J7":
/*!********************************************************************************!*\
  !*** ./apps/client/src/app/game/renderer/shader/filter/shadow/ShadowFilter.ts ***!
  \********************************************************************************/
/*! exports provided: ShadowFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShadowFilter", function() { return ShadowFilter; });
/* harmony import */ var _ShadowMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShadowMap */ "5poH");
var Filter = PIXI.Filter;

class ShadowFilter extends Filter {
    constructor(viewMatrix, spaceships) {
        super();
        //this.defaultFilter = new AlphaFilter(0.9);
        this.defaultFilter = new _ShadowMap__WEBPACK_IMPORTED_MODULE_0__["ShadowMap"](viewMatrix, spaceships);
    }
    apply(filterManager, input, output) {
        const renderTarget = filterManager.getFilterTexture(input);
        //TODO - copyTexSubImage2D could be used here?
        this.defaultFilter.apply(filterManager, input, output);
        /*
            this.blurXFilter.apply(filterManager, input, renderTarget);
            this.blurYFilter.apply(filterManager, renderTarget, output);
        */
        filterManager.returnFilterTexture(renderTarget);
    }
}


/***/ }),

/***/ "xQXk":
/*!***************************************************!*\
  !*** ./libs/common/src/lib/model/TimedAbility.ts ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "yjkM":
/*!******************************************************************!*\
  !*** ./apps/client/src/app/view/ui/fitting/fitting.component.ts ***!
  \******************************************************************/
/*! exports provided: FittingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FittingComponent", function() { return FittingComponent; });
/* harmony import */ var _service_game_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/game.service */ "qb5o");
/* harmony import */ var _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @orbitweb/common */ "grfs");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _game_Events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game/Events */ "2rDF");
/* harmony import */ var _service_player_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/player.service */ "gSC2");
/* harmony import */ var _equipment_slot_equipment_slot_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./equipment-slot/equipment-slot.component */ "gtQL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "SVse");












const _c0 = function (a0) { return { active: a0 }; };
class FittingComponent {
    constructor(gameService, playerService) {
        this.gameService = gameService;
        this.playerService = playerService;
        this.loginEnabled = true;
        this.myForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            customEq: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false)
        });
    }
    get database() {
        return this.gameService.fittingDB.db;
    }
    ngAfterViewInit() {
        //this.myForm.controls.customEq.setValue(true);
    }
    ngOnInit() {
        this.gameService.onMessage.subscribe((msg) => {
            switch (msg.type) {
                case "playerJoinedMessage":
                    if (msg.source === this.playerService.getUserName()) {
                        this.loginEnabled = false;
                    }
                    break;
                case "playerKilledMessage":
                    if (this.playerService.getUserName() === undefined) {
                        this.loginEnabled = true;
                    }
                    break;
            }
        });
    }
    isValid() {
        if (this.fittingComponent === undefined)
            return true;
        return this.myForm.value.customEq ? this.fittingComponent.isValid() : true;
    }
    toggleCustomFit() {
        this.myForm.controls.customEq.setValue(!this.myForm.controls.customEq.value);
    }
    get isCustomFit() {
        return this.myForm.value.customEq;
    }
    spawn() {
        console.log(this.myForm.value);
        const shipFitting = new _orbitweb_common__WEBPACK_IMPORTED_MODULE_1__["ShipFitting"]();
        if (this.myForm.value.customEq) {
            shipFitting.fitting = this.fittingComponent.getFitting();
        }
        else {
            console.log("spawn default");
            shipFitting.fitting = this.gameService.fittingDB.getSet("default");
        }
        console.log(shipFitting.fitting);
        _game_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].loginPlayer.emit({
            name: this.myForm.value.name,
            fitting: shipFitting,
        });
    }
    getColor() {
        const c = '#' + Math.random().toString(16).substr(2, 6);
        return c;
    }
}
FittingComponent.ɵfac = function FittingComponent_Factory(t) { return new (t || FittingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_service_game_service__WEBPACK_IMPORTED_MODULE_0__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_service_player_service__WEBPACK_IMPORTED_MODULE_4__["PlayerService"])); };
FittingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: FittingComponent, selectors: [["app-fitting"]], viewQuery: function FittingComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_equipment_slot_equipment_slot_component__WEBPACK_IMPORTED_MODULE_5__["EquipmentSlotComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.fittingComponent = _t.first);
    } }, decls: 15, vars: 10, consts: [[1, "header", "flexWraps", 3, "hidden"], [1, "flexT", 2, "height", "10px"], [1, "flexT", 3, "formGroup"], ["type", "checkbox", 3, "hidden", "formControlName"], [1, "login"], [1, "name"], ["placeholder", "Name", 3, "formControlName"], [1, "spawn"], ["type", "submit", 3, "disabled", "click"], [1, "customFit", 3, "ngClass", "click"], [1, "fitting", "flexWrap"], [3, "hidden"], ["fitting", ""]], template: function FittingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function FittingComponent_Template_button_click_8_listener() { return ctx.spawn(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Spawn");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function FittingComponent_Template_div_click_10_listener() { return ctx.toggleCustomFit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " Equip ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "app-equipment-slot", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("hidden", !ctx.loginEnabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.myForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("hidden", true)("formControlName", "customEq");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControlName", "name");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !ctx.isValid() || ctx.myForm.value.name.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](8, _c0, ctx.isCustomFit));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("hidden", !ctx.myForm.value.customEq);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], _equipment_slot_equipment_slot_component__WEBPACK_IMPORTED_MODULE_5__["EquipmentSlotComponent"]], styles: [".equipmentWrapper[_ngcontent-%COMP%] {\n  height: 400px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n\n.equipment[_ngcontent-%COMP%] {\n  border: 1px solid black;\n}\n\n.equipmentSlot[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  margin: 2px;\n  overflow: hidden;\n  padding: 5px;\n}\n\n.empty[_ngcontent-%COMP%] {\n  border: 1px solid black;\n  background-color: grey;\n}\n\n.filled[_ngcontent-%COMP%] {\n  border: 2px solid #e47400;\n  color: #e47400;\n  background-color: #412e8c;\n}\n\n.fitting[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.header[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.header[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  background-color: #FFC107;\n}\n\n.header[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  flex: 1 1 50%;\n}\n\n.header[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background-color: white;\n  padding: 5px;\n  width: 90%;\n}\n\n.header[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]   .spawn[_ngcontent-%COMP%] {\n  flex: 1 1 20%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.header[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]   .customFit[_ngcontent-%COMP%] {\n  flex: 1 1 20%;\n  cursor: pointer;\n  -webkit-user-select: none;\n          user-select: none;\n  color: purple;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.header[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]   .customFit.active[_ngcontent-%COMP%] {\n  background-color: purple;\n  color: yellow;\n}\n\n.header[_ngcontent-%COMP%]   .fitting[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n\n.header[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.flexWrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 1 auto;\n  flex-flow: column;\n}\n\n.flexT[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZpdHRpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUdBO0VBQ0UsdUJBQUE7QUFBRjs7QUFJQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQURGOztBQUlBO0VBQ0UsdUJBQUE7RUFDQSxzQkFBQTtBQURGOztBQUlBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QUFERjs7QUFNQTtFQUVFLG1CQUFBO0FBSkY7O0FBT0E7RUE0REUsbUJBQUE7QUEvREY7O0FBTUU7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUVBLHlCQUFBO0FBTEo7O0FBUUk7RUFDRSxhQUFBO0FBTk47O0FBUU07RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0FBTlI7O0FBWUk7RUFDRSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFWTjs7QUFhSTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7VUFBQSxpQkFBQTtFQUVBLGFBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQVpSOztBQWdCSTtFQUNFLHdCQUFBO0VBQ0EsYUFBQTtBQWROOztBQXFCRTtFQUNFLGdCQUFBO0FBbkJKOztBQThCRTtFQUNFLGFBQUE7QUE1Qko7O0FBZ0NBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQTdCRjs7QUFnQ0E7RUFDRSxjQUFBO0FBN0JGIiwiZmlsZSI6ImZpdHRpbmcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXF1aXBtZW50V3JhcHBlciB7XG4gIGhlaWdodDo0MDBweDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG59XG5cblxuLmVxdWlwbWVudCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG5cbi5lcXVpcG1lbnRTbG90IHtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luOjJweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogNXB4O1xufVxuXG4uZW1wdHkge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cblxuLmZpbGxlZCB7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNlNDc0MDA7XG4gIGNvbG9yOiAjZTQ3NDAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDEyZThjO1xufVxuXG5cblxuLmZpdHRpbmcge1xuXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5oZWFkZXIge1xuICAvL21heC13aWR0aDogNDAwcHg7XG5cbiAgLmxvZ2luIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OmZsZXg7XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZDMTA3O1xuXG5cbiAgICAubmFtZSB7XG4gICAgICBmbGV4OiAxIDEgNTAlO1xuXG4gICAgICBpbnB1dCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICB9XG5cblxuICAgIH1cblxuICAgIC5zcGF3biB7XG4gICAgICBmbGV4OiAxIDEgMjAlO1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIH1cblxuICAgIC5jdXN0b21GaXQge1xuICAgICAgZmxleDogMSAxIDIwJTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuXG4gICAgICBjb2xvcjogcHVycGxlOztcbiAgICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgIH1cblxuICAgIC5jdXN0b21GaXQuYWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6cHVycGxlO1xuICAgICAgY29sb3I6IHllbGxvdztcbiAgICB9XG5cblxuICB9XG5cblxuICAuZml0dGluZyB7XG4gICAgbWFyZ2luLXRvcDoxMHB4O1xuICB9XG5cblxuXG5cblxuXG5cbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcblxuICBmb3JtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG59XG5cbi5mbGV4V3JhcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXg6IDEgMSBhdXRvO1xuICBmbGV4LWZsb3c6IGNvbHVtbjtcbn1cblxuLmZsZXhUIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cblxuXG4iXX0= */"] });


/***/ }),

/***/ "yuBP":
/*!***************************************!*\
  !*** ./libs/common/src/lib/common.ts ***!
  \***************************************/
/*! exports provided: common */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "common", function() { return common; });
function common() {
    return 'common123';
}


/***/ }),

/***/ "z05I":
/*!************************************************************************!*\
  !*** ./apps/client/src/app/game/core/serialize/MessageDeserializer.ts ***!
  \************************************************************************/
/*! exports provided: MessageDeserializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageDeserializer", function() { return MessageDeserializer; });
/* harmony import */ var _entity_messages_ClientPlayerJoinedMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../entity/messages/ClientPlayerJoinedMessage */ "7vT3");
/* harmony import */ var _entity_messages_ClientPlayerUpdateMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../entity/messages/ClientPlayerUpdateMessage */ "t9lZ");
/* harmony import */ var _entity_messages_ClientProjectileSpawnMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../entity/messages/ClientProjectileSpawnMessage */ "7NVd");
/* harmony import */ var _entity_messages_ClientProjectileUpdateMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../entity/messages/ClientProjectileUpdateMessage */ "ZmVK");
/* harmony import */ var _entity_messages_ClientProjectileDestroyMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../entity/messages/ClientProjectileDestroyMessage */ "7O9L");
/* harmony import */ var _entity_messages_ClientStructureSpawnMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../entity/messages/ClientStructureSpawnMessage */ "Y+w1");
/* harmony import */ var _entity_messages_ClientStructureDestroyMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../entity/messages/ClientStructureDestroyMessage */ "MXF6");
/* harmony import */ var _entity_messages_ClientPlayerKilledMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../entity/messages/ClientPlayerKilledMessage */ "0Yt2");
/* harmony import */ var _entity_messages_ClientBoundryUpdateMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../entity/messages/ClientBoundryUpdateMessage */ "Ym/X");
/* harmony import */ var _entity_messages_ClientScoreboardUpdateMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../entity/messages/ClientScoreboardUpdateMessage */ "m8s2");










class MessageDeserializer {
    static deserialize(message) {
        switch (message.type) {
            case "playerJoinedMessage":
                return new _entity_messages_ClientPlayerJoinedMessage__WEBPACK_IMPORTED_MODULE_0__["ClientPlayerJoinedMessage"](message);
                break;
            case "playerUpdateMessage":
                return new _entity_messages_ClientPlayerUpdateMessage__WEBPACK_IMPORTED_MODULE_1__["ClientPlayerUpdateMessage"](message);
                break;
            case "projectileSpawnMessage":
                return new _entity_messages_ClientProjectileSpawnMessage__WEBPACK_IMPORTED_MODULE_2__["ClientProjectileSpawnMessage"](message);
                break;
            case "projectileUpdateMessage":
                return new _entity_messages_ClientProjectileUpdateMessage__WEBPACK_IMPORTED_MODULE_3__["ClientProjectileUpdateMessage"](message);
                break;
            case "projectileDestroyMessage":
                return new _entity_messages_ClientProjectileDestroyMessage__WEBPACK_IMPORTED_MODULE_4__["ClientProjectileDestroyMessage"](message);
                break;
            case "structureSpawnMessage":
                return new _entity_messages_ClientStructureSpawnMessage__WEBPACK_IMPORTED_MODULE_5__["ClientStructureSpawnMessage"](message);
                break;
            case "structureDestroyMessage":
                return new _entity_messages_ClientStructureDestroyMessage__WEBPACK_IMPORTED_MODULE_6__["ClientStructureDestroyMessage"](message);
                break;
            case "playerKilledMessage":
                return new _entity_messages_ClientPlayerKilledMessage__WEBPACK_IMPORTED_MODULE_7__["ClientPlayerKilledMessage"](message);
                break;
            case "boundryUpdateMessage":
                return new _entity_messages_ClientBoundryUpdateMessage__WEBPACK_IMPORTED_MODULE_8__["ClientBoundryUpdateMessage"](message);
                break;
            case "scoreboardUpdateMessage":
                return new _entity_messages_ClientScoreboardUpdateMessage__WEBPACK_IMPORTED_MODULE_9__["ClientScoreboardUpdateMessage"](message);
                break;
            default:
                console.log("unknown message", message);
                break;
        }
    }
}


/***/ }),

/***/ "zKcn":
/*!********************************************************************************!*\
  !*** ./libs/common/src/lib/message/game/equipment/ShipEquipmentStopMessage.ts ***!
  \********************************************************************************/
/*! exports provided: ShipEquipmentStopMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipEquipmentStopMessage", function() { return ShipEquipmentStopMessage; });
/* harmony import */ var _ShipEquipmentMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShipEquipmentMessage */ "NXai");

class ShipEquipmentStopMessage extends _ShipEquipmentMessage__WEBPACK_IMPORTED_MODULE_0__["ShipEquipmentMessage"] {
}


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map