import { CMath, Server, ShipEquipment, ShipEquipmentDBValue, Vector2 } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import * as math from 'mathjs';
import { EventManager } from '../../../../../libs/game-logic/src/lib/EventManager';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';
import { ShipEquipmentTargetEntity } from '../../../../../libs/game-logic/src/lib/model/ShipEquipmentTargetEntity';

@Server("EQUIP", "Laser")
export class EquipmentEntityLaser extends ShipEquipmentTargetEntity {
  private maxOmega = 0.4;
  private maxAimAngle: number = 0.2;
  private damage: number = 5;

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
    }
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    this.shoot(parent);
  }

  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    const targetVector = CMath.sub(
      parent.targetPlayer.position,
      parent.position
    );
    const len = CMath.len(targetVector);
    const angle = CMath.angle(targetVector, this.getOrientation(parent));

    return math.abs(angle) < this.maxAimAngle && len < this.range;
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
    const targetVector = CMath.sub(
      parent.targetPlayer.position,
      parent.position
    );
    const angle = CMath.angle(targetVector, this.getOrientation(parent));

    const start: Vector2 = {
      x: parent.position.x,
      y: parent.position.y,
    };

    let end: Vector2 = {
      x: parent.targetPlayer.position.x,
      y: parent.targetPlayer.position.y,
    };

    const v: Vector2 = CMath.sub(end, start);

    const length = math.norm([v.x, v.y]);

    const target: SpaceshipEntity = <SpaceshipEntity>parent.targetPlayer;

    target.takeDamage(this.damage, parent);

    const proj: ProjectileEntity = new ProjectileEntity(undefined, parent);

    proj.type = 'laserProjectile';
    proj.position = target.position;

    EventManager.shootProjectile.emit('shootProjectile', { projectile: proj });
  }

  private getOrientation(parent: SpaceshipEntity): Vector2 {
    return CMath.rotate({ x: 0, y: 1 }, this.state.rotation);
  }
}
