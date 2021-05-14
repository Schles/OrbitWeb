import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';
import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

@Server("EQUIP", "Battery")
export class EquipmentEntityBattery extends ShipEquipmentEntity {
  private bonusRate: number;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);

    this.bonusRate = value?.bonusRate ? value.bonusRate : 0.6;
  }

  public onInit(parent: SpaceshipEntity) {
    super.onInit(parent);

    parent.energyRechargeRate *= 1 + this.bonusRate;
  }

  public iterate(parent: SpaceshipEntity, delta: number) {}
}
