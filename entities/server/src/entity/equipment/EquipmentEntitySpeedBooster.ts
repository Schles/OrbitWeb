import { ShipEquipmentEntity } from '../../../../../libs/game-logic/src/lib/model/ShipEquipmentEntity';
import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';

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

    this.absoluteChange = parent.maxOmega * this.bonus;
    parent.maxOmega += this.absoluteChange;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.maxOmega -= this.absoluteChange;
    this.absoluteChange = 0;
  }
}
