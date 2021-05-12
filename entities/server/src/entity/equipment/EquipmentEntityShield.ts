import { ShipEquipmentEntity } from '../../../../../libs/game-logic/src/lib/model/ShipEquipmentEntity';
import { CGame, Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';

@Server("EQUIP", "Shield")
export class EquipmentEntityShield extends ShipEquipmentEntity {
  private amount;
  private absoluteChange: number = 0;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);

    this.amount = value?.absolute ? value.absolute : 1;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    parent.resistance += this.amount;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.resistance -= this.amount;
    parent.resistance = CGame.clamp(parent.resistance, 0, 1);
  }
}
