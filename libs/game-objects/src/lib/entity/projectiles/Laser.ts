import { Container, Graphics } from 'pixi.js';

import { string2hex } from '@pixi/utils';
import { ProjectileGO, SpaceshipGO } from '@orbitweb/game-objects';
import { Vector2 } from '@orbitweb/common';

export class Laser extends ProjectileGO {
  constructor(id: string, source: SpaceshipGO, private target: Vector2) {
    super(id, source);
    this.gameObject = this.getGameObject();
  }

  public iterate(delta) {
    super.iterate(delta);




    const c = string2hex(this.color);
    let lineWidth = 2;
console.log("ITTER", this.target);
    const progress = this.timeToLife / this.duration;

    if (progress > 0.6) lineWidth = 2;
    else if (progress > 0.3) lineWidth = 1;
    else lineWidth = 3;

    if (this.target !== undefined) {
      this.drawLine(this.source.position, this.target);
    }
  }

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }
}
