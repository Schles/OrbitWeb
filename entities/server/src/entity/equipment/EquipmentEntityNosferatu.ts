import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { ShipEquipmentTargetEntity } from '../../model/ShipEquipmentTargetEntity';

@Server("EQUIP", "Nosferatu")
export class EquipmentEntityNosferatu extends ShipEquipmentTargetEntity {
  private drain: number;
  private gain: number;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);

    this.range = value?.range ? value.range : 150;
    this.drain = value?.custom?.drain ? value.custom.drain : 40;
    this.gain = value?.custom?.gain ? value.custom.gain : 20;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    (<SpaceshipEntity>parent?.targetPlayer).power -= this.drain;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.power += this.gain;
  }

  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    //return parent.targetPlayer.power > this.drain && super.isTargetInRange(parent);
    return super.isTargetInRange(parent);
  }
}
