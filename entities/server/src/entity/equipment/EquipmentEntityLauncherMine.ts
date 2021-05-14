import { GameFactory, Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { EventManager } from '../../../../../libs/game-logic/src/lib/EventManager';
import { ProjectileEntity } from '../../model/ProjectileEntity';
import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';

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

    const proj: ProjectileEntity = GameFactory.instantiate("SERVER", "PROJECTILE", "Mine", parent, this.value)
    EventManager.shootProjectile.emit('shootProjectile', { projectile: proj });
  }
}
