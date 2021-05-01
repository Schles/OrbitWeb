import {ShipEquipment} from "@orbitweb/common";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";
import {EventManager} from "../../EventManager";
import {ProjectileEntity} from "../../model/ProjectileEntity";
import {ProjectileRocket} from "../projectiles/ProjectileRocket";
import {ShipEquipmentTargetEntity} from "../../model/ShipEquipmentTargetEntity";

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
