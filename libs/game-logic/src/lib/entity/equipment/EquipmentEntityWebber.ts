import { ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { ShipEquipmentTargetEntity } from '../../model/ShipEquipmentTargetEntity';

export class EquipmentEntityWebber extends ShipEquipmentTargetEntity {
  private absoluteChange: number = 0;


  private targetPlayer: SpaceshipEntity;

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);
    this.range = value?.range ? value.range : 250;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);
    /*
    this.targetPlayer = <SpaceshipEntity>parent.targetPlayer;
    this.absoluteChange = this.targetPlayer.maxSpeed * this.bonus;
    this.targetPlayer.maxSpeed -= this.absoluteChange;
    */
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);
    if (this.targetPlayer !== undefined) {
      this.targetPlayer.maxSpeed += this.absoluteChange;
      this.absoluteChange = 0.0;
      this.targetPlayer = undefined;
    }
  }
}
