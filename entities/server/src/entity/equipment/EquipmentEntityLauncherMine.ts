import { Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { EventManager } from '../../../../../libs/game-logic/src/lib/EventManager';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';
import { ProjectileMine } from '../../../../../libs/game-logic/src/lib/entity/projectiles/ProjectileMine';
import { ShipEquipmentEntity } from '../../../../../libs/game-logic/src/lib/model/ShipEquipmentEntity';

@Server("EQUIP", "MineLauncher")
export class EquipmentEntityLauncherMine extends ShipEquipmentEntity {
  constructor(
    shipEquipment: ShipEquipment,
    private value: ShipEquipmentDBValue
  ) {
    super(shipEquipment);
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    const proj: ProjectileEntity = new ProjectileMine(
      undefined,
      parent,
      this.value
    );

    EventManager.shootProjectile.emit('shootProjectile', { projectile: proj });
  }
}
