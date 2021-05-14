import { ProjectileGO, SpaceshipGO } from '@orbitweb/client-entities';
import { Container, Graphics } from 'pixi.js';
import { Client, ProjectileSpawnMessage, ShipEquipmentDBValue } from '@orbitweb/common';

@Client("PROJECTILE", "Bomb")
export class ProjectileGOBomb extends ProjectileGO {
  constructor(private msg: ProjectileSpawnMessage, source: SpaceshipGO, value: ShipEquipmentDBValue) {
    super(msg.id, source);

    this.radius = value?.projectile ? value.projectile.damageRange : 30;
    this.damageRange = this.radius;
  }

  onInit() {
    super.onInit();


  }

  public iterate(delta) {
  }

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }
}
