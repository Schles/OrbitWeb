import { ShipEquipment } from '@orbitweb/common';
import { Sprite } from 'pixi.js';
import { string2hex } from '@pixi/utils';
import { ShipEquipmentGO, SpaceshipGO } from '@orbitweb/client-entities';
import { Client } from '@orbitweb/common';




@Client("EQUIP", "BombLauncher")
export class EquipmentGOBomb extends ShipEquipmentGO {
  private repairGraphic: Sprite;

  constructor(shipEquipment: ShipEquipment) {
    console.error("BOMB", shipEquipment);
    super(shipEquipment);
  }

  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.repairGraphic = this.getGameObject();
    this.repairGraphic.tint = string2hex(parent.color);
    parent.gameObject.addChild(this.repairGraphic);
  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);

    if (this.state.active) this.repairGraphic.rotation += 3 * delta;
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

  }

  public getGameObject(): Sprite {
    const sprite = Sprite.from('assets/Shield.png');

  
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    return sprite;
  }
}
