import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { EventManager } from '../../../../../libs/game-logic/src/lib/EventManager';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';
import { ProjectileRocket } from '../../../../../libs/game-logic/src/lib/entity/projectiles/ProjectileRocket';
import { ShipEquipmentTargetEntity } from '../../../../../libs/game-logic/src/lib/model/ShipEquipmentTargetEntity';

@Server("EQUIP", "RocketLauncher")
export class EquipmentEntityRocketLauncher extends ShipEquipmentTargetEntity {
  constructor(
    shipEquipment: ShipEquipment,
    private value: ShipEquipmentDBValue
  ) {
    super(shipEquipment);
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    const proj: ProjectileEntity = new ProjectileRocket(
      undefined,
      parent,
      <SpaceshipEntity>parent.targetPlayer,
      this.value
    );
    EventManager.shootProjectile.emit('shootProjectile', { projectile: proj });
  }

  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    return true;
  }
}
