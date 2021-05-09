import { ShipEquipment } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { ShipEquipmentTargetEntity } from '../../model/ShipEquipmentTargetEntity';

export class EquipmentEntityNosferatu extends ShipEquipmentTargetEntity {
  private drain: number = 40;
  private gain: number = 20;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);

    this.range = 150;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    (<SpaceshipEntity>parent.targetPlayer).power -= this.drain;
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
