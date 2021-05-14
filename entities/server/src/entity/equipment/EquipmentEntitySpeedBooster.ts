import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';
import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

@Server("EQUIP", "Afterburner")
@Server("EQUIP", "SpeedBooster")
export class EquipmentEntitySpeedBooster extends ShipEquipmentEntity {
  private absoluteChange: number = 0;

  private bonus: number;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);
    this.bonus = value?.bonusRate ? value.bonusRate : 0.4;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    this.absoluteChange = parent.omega * this.bonus;
    parent.omega += this.absoluteChange;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.omega -= this.absoluteChange;
    this.absoluteChange = 0;
  }
}
