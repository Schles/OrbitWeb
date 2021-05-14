import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';
import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

@Server("EQUIP", "Mass")
export class EquipmentEntityMass extends ShipEquipmentEntity {
  private bonusRate: number;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);

    this.bonusRate = value?.bonusRate ? value.bonusRate : 1.5;
  }

  public onInit(parent: SpaceshipEntity) {
    super.onInit(parent);

    parent.mass *= this.bonusRate;
  }

  public iterate(parent: SpaceshipEntity, delta: number) {}
}
