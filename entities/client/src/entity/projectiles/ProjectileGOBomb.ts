import { ProjectileGO, SpaceshipGO } from '@orbitweb/game-objects';
import { Container, Graphics } from 'pixi.js';
import { Client, ProjectileSpawnMessage, ShipEquipmentDBValue } from '@orbitweb/common';

@Client("PROJECTILE", "Bomb")
export class ProjectileGOBomb extends ProjectileGO {
  constructor(private msg: ProjectileSpawnMessage, source: SpaceshipGO, value: ShipEquipmentDBValue) {
    super(msg.id, source);
console.log(value);
    this.radius = value?.range ? value.range : 30;
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
