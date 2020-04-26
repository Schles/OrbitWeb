import Filter = PIXI.Filter;
import {Vector2} from "../../../../../shared/src/util/VectorInterface";


export class TestFilter extends Filter {
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

  public iterate(playerPosition: Vector2[], sunPosition: Vector2, delta, playerIndex) {
    this.uniforms.sunPosition = [sunPosition.x, sunPosition.y];
    this.uniforms.playerPosition = [playerPosition[playerIndex].x, playerPosition[playerIndex].y];
  }
}
