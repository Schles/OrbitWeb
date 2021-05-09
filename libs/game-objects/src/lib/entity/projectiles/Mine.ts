import { Vector2 } from '@orbitweb/common';
import { ProjectileGO, SpaceshipGO } from '@orbitweb/game-objects';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';

export class Mine extends ProjectileGO {
  constructor(
    id: string,
    source: SpaceshipGO,
    private targetPosition: Vector2
  ) {
    super(id, source);
  }

  onInit() {
    super.onInit();

    this.gameObject.x = this.targetPosition.x;
    this.gameObject.y = this.targetPosition.y;
  }

  public iterate(delta) {
    //super.iterate(delta);
  
  }

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    const c = string2hex(this.source.color);

    this.lineObject.beginFill(c, 1.0);
    this.lineObject.drawRect(-10, -10, 20, 20);
    this.lineObject.endFill();

    cannonCont.addChild(this.lineObject);
    return cannonCont;
  }
}
