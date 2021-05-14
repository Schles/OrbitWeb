import { ProjectileGO, SpaceshipGO } from '@orbitweb/client-entities';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';
import { Client, ProjectileSpawnMessage, ShipEquipmentDBValue } from '@orbitweb/common';

@Client("PROJECTILE", "Rocket")
export class ProjectileGORocket extends ProjectileGO {
  constructor(private msg: ProjectileSpawnMessage, source: SpaceshipGO, value: ShipEquipmentDBValue) {
    super(msg.id, source);
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
