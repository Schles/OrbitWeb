import {ShipEquipmentEntity} from "../../model/ShipEquipmentEntity";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";

export class EquipmentEntitySpeedBooster extends ShipEquipmentEntity {

  private absoluteChange: number = 0;

  private bonus: number = 0.4;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    this.absoluteChange = parent.maxSpeed * this.bonus;
    parent.maxSpeed += this.absoluteChange;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.maxSpeed -= this.absoluteChange;
    this.absoluteChange = 0;
  }
}
