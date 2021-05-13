import { Client, ProjectileSpawnMessage, ShipEquipmentDBValue, Vector2 } from '@orbitweb/common';
import { ProjectileGO, SpaceshipGO } from '@orbitweb/game-objects';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';

@Client("PROJECTILE", "Mine")
export class ProjectileGOMine extends ProjectileGO {
  constructor(
    private msg: ProjectileSpawnMessage,
    source: SpaceshipGO,
    value: ShipEquipmentDBValue
  ) {
    super(msg.id, source);
  }

  onInit() {
    super.onInit();

    this.gameObject.x = this.msg.x;
    this.gameObject.y = this.msg.y;
    this.radius = this.msg.radius;
    console.log(this.radius);
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
