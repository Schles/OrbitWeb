import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";

export class EquipmentEntityRepair extends ShipEquipmentEntity {
  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  public iterate(parent: SpaceshipEntity, delta: number) {
    super.iterate(parent, delta);
  }


  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.health += 10;
  }
}
