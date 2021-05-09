import { ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { EventManager } from '../../EventManager';
import { ProjectileEntity } from '../../model/ProjectileEntity';
import { ShipEquipmentTargetEntity } from '../../model/ShipEquipmentTargetEntity';
import { ProjectileMine } from '../projectiles/ProjectileMine';
import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';

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
