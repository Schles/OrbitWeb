import Filter = PIXI.Filter;
import {Vector2} from "../../game/CMath";

export class SunFilter extends Filter {
  constructor(a, b) {
    super(a, b);

    this.uniforms.sunPosition = [500, 500];
    this.uniforms.playerPosition = [100, 100];
    this.uniforms.viewPort = [100, 100];
    this.uniforms.localToWorld = [];

  }

  public setLocalToWorld(mat) {
    this.uniforms.localToWorld = mat;
  }

  public setSize(x, y) {
    this.uniforms.viewPort = [x, y];
  }

  public iterate(playerPosition: Vector2, sunPosition: Vector2, delta) {
    this.uniforms.sunPosition = [sunPosition.x, sunPosition.y];
    this.uniforms.playerPosition = [playerPosition.x, playerPosition.y];
  }
}
