import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";

export class EquipmentEntityEmpty extends ShipEquipmentEntity {
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
