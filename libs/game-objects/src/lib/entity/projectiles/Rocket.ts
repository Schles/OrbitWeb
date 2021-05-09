import { ProjectileGO, SpaceshipGO } from '@orbitweb/game-objects';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';

export class Rocket extends ProjectileGO {
  constructor(id: string, source: SpaceshipGO) {
    super(id, source);
  }

  onInit() {
    super.onInit();
  }

  public iterate(delta) {
    super.iterate(delta);

    // console.log("rocket");
  }

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();
    const c = string2hex(this.source.color);
    this.lineObject.beginFill(c, 1.0);
    this.lineObject.drawPolygon([0, -10, 0, 10, 20, 0]);
    this.lineObject.endFill();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }
}
