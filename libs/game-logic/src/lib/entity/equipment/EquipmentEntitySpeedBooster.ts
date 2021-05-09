import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';
import { ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

export class EquipmentEntitySpeedBooster extends ShipEquipmentEntity {
  private absoluteChange: number = 0;

  private bonus: number;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);
    this.bonus = value?.bonusRate ? value.bonusRate : 0.4;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    this.absoluteChange = parent.maxOmega * this.bonus;
    console.log(parent.maxOmega)
    parent.maxOmega += this.absoluteChange;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.maxOmega -= this.absoluteChange;
    this.absoluteChange = 0;
  }
}
