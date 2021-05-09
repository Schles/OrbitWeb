import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';
import { ShipEquipment } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

export class EquipmentEntityBattery extends ShipEquipmentEntity {
  private bonusRate: number = 0.6;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  public onInit(parent: SpaceshipEntity) {
    super.onInit(parent);

    parent.energyRechargeRate *= 1 + this.bonusRate;
  }

  public iterate(parent: SpaceshipEntity, delta: number) {}
}
