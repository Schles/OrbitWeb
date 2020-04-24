"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Particle_1 = require("./Particle");
var Spaceship = /** @class */ (function (_super) {
    __extends(Spaceship, _super);
    function Spaceship(id, color) {
        var _this = _super.call(this) || this;
        _this.color = "#00FF00";
        _this.maxSpeed = 50;
        _this.curSpeed = 0;
        _this.timeToMaxSpeed = 2;
        //public physics: IPhysics;
        _this.shipSize = 7;
        _this.speedInput = 1;
        _this.maxOmega = 1;
        //public targetPosition: Vector2;
        _this.orbitRadius = 100;
        _this.actionOrbitTarget = false;
        _this.actionKeepAtRange = false;
        //public cannon: Cannon;
        _this.health = 100;
        _this.id = id;
        _this.color = color;
        return _this;
        //this.cannon = new Cannon(this);
        //    this.physics = new HybridPhysics();
    }
    Object.defineProperty(Spaceship.prototype, "acceleration", {
        //public actions: Action[] = [];
        get: function () {
            return this.maxSpeed / (this.timeToMaxSpeed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Spaceship.prototype, "targetPlayer", {
        get: function () {
            return this._targetPlayer;
        },
        set: function (target) {
            this._targetPlayer = target;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /*
      public iterate(delta: number) {
        this.physics.iterate(this, delta);
    
        this.cannon.iterate(delta);
      }
    
     */
    Spaceship.prototype.removeTarget = function () {
        this.targetPlayer = undefined;
        this.actionOrbitTarget = false;
    };
    Spaceship.prototype.renderTargeting = function () {
    };
    return Spaceship;
}(Particle_1.Particle));
exports.Spaceship = Spaceship;
