import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";

export class EquipmentEntityBattery extends ShipEquipmentEntity {
  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  public iterate(parent: SpaceshipEntity, delta: number) {
    parent.power += delta;
  }
}
