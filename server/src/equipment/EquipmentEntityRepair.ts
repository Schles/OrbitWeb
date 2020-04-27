import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";

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
