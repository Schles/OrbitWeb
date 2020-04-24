"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Particle = /** @class */ (function () {
    function Particle() {
        this.rotation = 0;
        this.omega = 0;
        this.position = { x: 0, y: 0 };
        this.speed = { x: 0, y: 0 };
        this.accel = { x: 0, y: 0 };
    }
    return Particle;
}());
exports.Particle = Particle;
