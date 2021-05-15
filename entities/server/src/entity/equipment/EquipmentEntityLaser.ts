import {
  CMath,
  EventLogMessage, EventManager,
  GameManager,
  Server,
  ShipEquipment,
  ShipEquipmentDBValue,
  Vector2
} from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import * as math from 'mathjs';
import { ProjectileEntity } from '../../model/ProjectileEntity';
import { ShipEquipmentTargetEntity } from '../../model/ShipEquipmentTargetEntity';


@Server("EQUIP", "LaserLauncher")
export class EquipmentEntityLaser extends ShipEquipmentTargetEntity {
  private maxOmega = 0.4;
  private maxAimAngle: number = 0.2;
  private damage: number = 5;

  private projectile: ProjectileEntity;

  private playersHit: string[] = [];

  constructor(shipEquipment: ShipEquipment, value: ShipEquipmentDBValue) {
    super(shipEquipment);
    this.range = value?.range ? value.range : 400;
    this.damage = value?.absolute ? value.absolute : 5;
    this.maxOmega = value?.custom?.maxOmega ? value.custom.maxOmega : 0.4;
    this.maxAimAngle = value?.custom?.maxAimAngle
      ? value.custom.maxAimAngle
      : 0.2;
  }

  public iterate(parent: SpaceshipEntity, delta: number) {
    super.iterate(parent, delta);

    if (parent.targetPlayer !== undefined) {
      this.alignCannon(parent, delta);
      this.shoot(parent);
    }




  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);
    this.playersHit = [];
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);
    this.playersHit = [];
  }

  private alignCannon(parent: SpaceshipEntity, delta: number) {
    const targetVector = CMath.sub(
      parent.targetPlayer.position,
      parent.position
    );
    let omega = CMath.angle(targetVector, this.getOrientation(parent)) / delta;

    if (math.abs(omega) > this.maxOmega)
      omega = math.sign(omega) * this.maxOmega;

    this.state.rotation += omega * delta;
  }

  private shoot(parent: SpaceshipEntity) {

    const v: Vector2 = CMath.sub(parent.targetPlayer.position, parent.position);
    const distance: number = CMath.len(v);
    const target: SpaceshipEntity = <SpaceshipEntity>parent.targetPlayer;

    if (  distance <= this.range) {
      let omega = CMath.angle(v, this.getOrientation(parent));
      if ( Math.abs(omega) < this.maxOmega) {
        if ( this.playersHit.findIndex( (p) => p === parent.targetPlayer.id) < 0) {
          this.playersHit.push(parent.targetPlayer.id);

          const dmgTaken = (parent.targetPlayer as SpaceshipEntity).takeDamage(this.damage, parent);
          const eventLog = new EventLogMessage("PLAYER_DAMAGE_TAKEN", {damageTaken: dmgTaken, equipmentSource: "laser",
            source: parent.id, target: parent.targetPlayer.id});
          GameManager.eventManager.emit("DIRTY_SINGLETON", { message: eventLog});

        }
      }
    }
  }

  private getOrientation(parent: SpaceshipEntity): Vector2 {
    return CMath.rotate({ x: 0, y: 1 }, this.state.rotation);
  }


  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    return true;
  }
}
