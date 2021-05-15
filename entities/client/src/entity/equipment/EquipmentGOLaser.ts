import { Client, ShipEquipment } from '@orbitweb/common';
import { Container, Graphics, Sprite } from 'pixi.js';
import { string2hex } from '@pixi/utils';
import { ShipEquipmentGO, SpaceshipGO } from '@orbitweb/client-entities';


@Client("EQUIP", "LaserLauncher")
export class EquipmentGOLaser extends ShipEquipmentGO {
  private gameObject: Container;

  private laser: Graphics;

  private range: number;

  constructor(shipEquipment: ShipEquipment) {
    console.log("Instantiace Laser", shipEquipment);
    super(shipEquipment);
    this.range = (shipEquipment as any).range;
  }

  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.gameObject = this.getGameObject(parent);
    parent.gameObject.addChild(this.gameObject);
  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);
    if( this.state.active) {
      this.laser.visible = true;
    } else {
      this.laser.visible = false;
    }

    this.gameObject.rotation = this.state.rotation;
  }

  onDestroy(parent: SpaceshipGO) {
    super.onDestroy(parent);

    parent.gameObject.removeChild(this.gameObject);
    this.gameObject = undefined;
  }

  public getGameObject(parent: SpaceshipGO): Container {
    const cannonCont: Container = new Container();

    this.laser = new Graphics();



    const c = string2hex(parent.color);



    this.laser.beginFill(c);
    this.laser.drawRect(-3, 20, 6, this.range - 20);
    this.laser.endFill();

    const sprite = Sprite.from('assets/ShipATypeB.png');
    sprite.tint = c;
    sprite.x = -12;
    sprite.y = 12;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    //sprite.rotation = Math.PI * -2 / 4;




    cannonCont.addChild(sprite);
    cannonCont.addChild(this.laser);

    return cannonCont;
  }
}
