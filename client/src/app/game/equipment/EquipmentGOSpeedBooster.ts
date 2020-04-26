import {ShipEquipmentGO} from "../gameobjects/ShipEquipmentGO";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {SpaceshipGO} from "../gameobjects/SpaceshipGO";

export class EquipmentGOSpeedBooster extends ShipEquipmentGO {

  private repairGraphic: PIXI.Graphics;


  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.repairGraphic = new PIXI.Graphics;
    parent.gameObject.addChild(this.repairGraphic);

    this.repairGraphic.lineStyle(2, 0xFFFF00);

    this.repairGraphic.drawCircle(0, 0, 24);

    this.repairGraphic.endFill();

  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);

    if ( this.state.active) {
      this.repairGraphic.visible = true;
    } else {
      this.repairGraphic.visible = false;
    }
  }


  onDestroy(parent: SpaceshipGO) {
    super.onDestroy(parent);

    parent.gameObject.removeChild(this.repairGraphic);
    this.repairGraphic = undefined;
  }
}
