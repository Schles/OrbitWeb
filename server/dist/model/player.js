"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(name, x, y, rotation, gun_rotation) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.gun_rotation = gun_rotation;
    }
    return Player;
}());
exports.Player = Player;
