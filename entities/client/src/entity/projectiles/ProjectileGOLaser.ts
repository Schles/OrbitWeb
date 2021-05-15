import { Container, Graphics } from 'pixi.js';

import { string2hex } from '@pixi/utils';
import { ProjectileGO, SpaceshipGO } from '@orbitweb/client-entities';
import { Client, ProjectileSpawnMessage, ShipEquipmentDBValue, Vector2 } from '@orbitweb/common';

@Client("PROJECTILE", "Laser")
export class ProjectileGOLaser extends ProjectileGO {


  private range: number;
  private width: number;


  constructor(private msg: ProjectileSpawnMessage, source: SpaceshipGO, value: ShipEquipmentDBValue) {
    super(msg.id, source);

    this.range = value?.range ? value.range : 100;
    this.width = value?.projectile?.damageRange ? value.projectile.damageRange : 20;

    this.gameObject = this.getGameObject();


    console.log(value)
  }

  public iterate(delta) {
    super.iterate(delta);

    const c = string2hex(this.color);
    let lineWidth = 2;
    const progress = this.timeToLife / this.duration;

    if (progress > 0.6) lineWidth = 2;
    else if (progress > 0.3) lineWidth = 1;
    else lineWidth = 3;
/*
    if (this.target !== undefined) {
      this.drawLine(this.source.position, this.target);
    }

 */
  }

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }
}
