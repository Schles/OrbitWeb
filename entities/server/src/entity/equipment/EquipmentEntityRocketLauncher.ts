import { GameFactory, Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { EventManager } from '../../../../../libs/game-logic/src/lib/EventManager';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';
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
  }


  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    const proj: ProjectileEntity = GameFactory.instantiate("SERVER", "PROJECTILE", "Rocket", parent, this.value, parent.targetPlayer)
    EventManager.shootProjectile.emit('shootProjectile', { projectile: proj });
  }

  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    return true;
  }
}
