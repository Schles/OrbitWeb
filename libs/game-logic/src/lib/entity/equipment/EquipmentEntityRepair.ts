import {ShipEquipmentEntity} from "../../model/ShipEquipmentEntity";
import {ShipEquipment} from "@orbitweb/common";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";

export class EquipmentEntityRepair extends ShipEquipmentEntity {

  public repairAmount = 30;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
    this.powerCost = 1;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.health += this.repairAmount;
  }
}
