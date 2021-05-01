import {ShipEquipmentEntity} from "../../model/ShipEquipmentEntity";
import {ShipEquipment} from "@orbitweb/common";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";

export class EquipmentEntityError extends ShipEquipmentEntity {
  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  public iterate(parent: SpaceshipEntity, delta: number) {

  }

  protected onStartEquipment(parent: SpaceshipEntity) {

  }

  protected onEndEquipment(parent: SpaceshipEntity) {

  }
}
