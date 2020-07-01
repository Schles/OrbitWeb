import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";
import {EventManager} from "../game/EventManager";
import {ProjectileEntity} from "../entities/ProjectileEntity";
import {ProjectileRocket} from "../projectiles/ProjectileRocket";
import {ShipEquipmentTargetEntity} from "./common/ShipEquipmentTargetEntity";

export class EquipmentEntityRocketLauncher extends ShipEquipmentTargetEntity{

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    const proj: ProjectileEntity = new ProjectileRocket(undefined, parent, <SpaceshipEntity>parent.targetPlayer);
    EventManager.shootProjectile.emit("shootProjectile", {projectile: proj});
  }

  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    return true;
  }
}
