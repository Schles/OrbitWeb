import { ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { ShipEquipmentTargetEntity } from '../../model/ShipEquipmentTargetEntity';

export class EquipmentEntityWebber extends ShipEquipmentTargetEntity {
  private absoluteChange: number = 0;

  private malus: number;
  private targetPlayer: SpaceshipEntity;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);
    this.range = value?.range ? value.range : 250;
    this.malus = value?.bonusRate ? value.bonusRate : 0.4;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    this.targetPlayer = <SpaceshipEntity>parent.targetPlayer;
    if (this.targetPlayer) {
      this.absoluteChange = this.targetPlayer.maxOmega * this.malus;
      this.targetPlayer.maxOmega -= this.absoluteChange;
    }
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);
    if (this.targetPlayer !== undefined) {
      this.targetPlayer.maxOmega += this.absoluteChange;
      this.absoluteChange = 0.0;
      this.targetPlayer = undefined;
    }
  }
}
