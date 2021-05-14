import { GameFactory, GameManager, Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
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
    GameManager.eventManager.emit("SHOOT_PROJECTILE", { projectile: proj });
  }
}
