import { Client, ShipEquipment } from '@orbitweb/common';
import { Container, Graphics, Sprite } from 'pixi.js';
import { string2hex } from '@pixi/utils';
import { ShipEquipmentGO, SpaceshipGO } from '@orbitweb/game-objects';


@Client("EQUIP", "Laser")
export class EquipmentGOLaser extends ShipEquipmentGO {
  private gameObject: Container;

  constructor(shipEquipment: ShipEquipment) {
    console.log("Instantiace Laser", shipEquipment);
    super(shipEquipment);
  }

  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.gameObject = this.getGameObject(parent);
    parent.gameObject.addChild(this.gameObject);
  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);

    this.gameObject.rotation = this.state.rotation;
  }

  onDestroy(parent: SpaceshipGO) {
    super.onDestroy(parent);

    parent.gameObject.removeChild(this.gameObject);
    this.gameObject = undefined;
  }

  public getGameObject(parent: SpaceshipGO): Container {
    const cannonCont: Container = new Container();

    const cannon: Graphics = new Graphics();

    const c = string2hex(parent.color);

    // Set the fill color
    cannon.beginFill(0xffffff);

    // Draw a circle
    cannon.drawRect(0, 0, 20, 1);

    // Applies fill to lines and shapes since the last call to beginFill.
    cannon.endFill();

    //cannonCont.addChild(cannon);

    const sprite = Sprite.from('assets/ShipATypeB.png');
    sprite.tint = c;
    sprite.x = -12;
    sprite.y = 12;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    //sprite.rotation = Math.PI * -2 / 4;
    cannonCont.addChild(sprite);

    return cannonCont;
  }
}
