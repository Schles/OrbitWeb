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

    this.radius = value?.range ? value.range : 30;
    this.damageRange = value?.custom?.damageRange ? value.custom.damageRange : 30;

    this.drawMine();
  }

  onInit() {
    super.onInit();

    this.gameObject.x = this.msg.x;
    this.gameObject.y = this.msg.y;
    console.log(this.radius);
  }

  public iterate(delta) {
    //super.iterate(delta);
  
  }

  private drawMine() {

    const c = string2hex(this.source.color);


    this.lineObject.beginFill(c, 1.0);
    this.lineObject.drawCircle(0, 0, 10);
    this.lineObject.endFill();

    this.lineObject.lineStyle(1, c, 1.0);
    this.lineObject.drawCircle(0, 0, this.radius);
    this.lineObject.endFill();

  }

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    cannonCont.addChild(this.lineObject);
    return cannonCont;
  }
}
