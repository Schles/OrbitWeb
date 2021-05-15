import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';
import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

@Server("EQUIP", "Mass Generator")
export class EquipmentEntityMassGenerator extends ShipEquipmentEntity {
  private bonus: number;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);
    this.bonus = value?.bonusRate ? value.bonusRate : 0.4;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    parent.omega.incFactorAdd(this.bonus);
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.omega.decFactorAdd(this.bonus);
  }
}
