import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';
import { ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

export class EquipmentEntityRepair extends ShipEquipmentEntity {
  public repairAmount;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);

    this.repairAmount = value?.absolute ? value.absolute : 30;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.health += this.repairAmount;
  }
}
