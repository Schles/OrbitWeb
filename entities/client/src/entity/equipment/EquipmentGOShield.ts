import { ShipEquipment } from '@orbitweb/common';
import { Graphics, Sprite } from 'pixi.js';
import { string2hex } from '@pixi/utils';
import { ShipEquipmentGO, SpaceshipGO } from '@orbitweb/client-entities';
import { Client } from '@orbitweb/common';


@Client("EQUIP", "Shield")
export class EquipmentGOShield extends ShipEquipmentGO {
  private repairGraphic: Graphics;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);

    /*
    const sprite = PIXI.Sprite.from("assets/ShipATypeB.png");
    sprite.tint = c;
    sprite.x = -12;
    sprite.y = 12;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    //sprite.rotation = Math.PI * -2 / 4;
    cannonCont.addChild(sprite);
    */
  }

  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.repairGraphic = this.getGameObject();

    parent.gameObject.addChild(this.repairGraphic);

    /*
    this.repairGraphic = new PIXI.Graphics;
    parent.gameObject.addChild(this.repairGraphic);
    this.repairGraphic.lineStyle(2, 0x00FF00);
    this.repairGraphic.drawCircle(0, 0, 20);
    this.repairGraphic.endFill();
    */
  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);
  }

  onDestroy(parent: SpaceshipGO) {
    super.onDestroy(parent);

    parent.gameObject.removeChild(this.repairGraphic);
    this.repairGraphic = undefined;
  }

  protected onStartEquipment(parent: SpaceshipGO) {
    super.onStartEquipment(parent);

    this.repairGraphic.visible = true;
  }

  protected onEndEquipment(parent: SpaceshipGO) {
    super.onEndEquipment(parent);

    this.repairGraphic.visible = false;

    //parent.gameObject.filters.splice(0, 0);
  }

  public getGameObject(): Graphics {

    const graphics = new Graphics();

    graphics.lineStyle(2, string2hex("#0000FF"));
    graphics.drawCircle(0, 0, 30);
    graphics.endFill();

    return graphics;
  }
}
