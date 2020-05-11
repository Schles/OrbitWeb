import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";

export class EquipmentEntityMass extends ShipEquipmentEntity {
  private bonusRate: number = 0.6;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  public onInit(parent: SpaceshipEntity) {
    super.onInit(parent);

    parent.mass = 1.5;
  }

  public iterate(parent: SpaceshipEntity, delta: number) { }
}
