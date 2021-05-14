import { GameFactory, GameManager, Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { ProjectileEntity } from '../../model/ProjectileEntity';
import { ShipEquipmentTargetEntity } from '../../model/ShipEquipmentTargetEntity';


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
    GameManager.eventManager.emit("SHOOT_PROJECTILE", { projectile: proj });


  }

  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    return true;
  }
}
