import { ShipEquipmentEntity } from '../../../../../libs/game-logic/src/lib/model/ShipEquipmentEntity';
import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';

@Server("EQUIP", "Repair")
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
