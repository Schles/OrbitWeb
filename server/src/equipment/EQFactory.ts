import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";


import {EquipmentEntityLaser} from "./EquipmentEntityLaser";
import {EquipmentEntitySpeedBooster} from "./EquipmentEntitySpeedBooster";
import {EquipmentEntityRocketLauncher} from "./EquipmentEntityRocketLauncher";
import {EquipmentEntityRepair} from "./EquipmentEntityRepair";
import {EquipmentEntityWebber} from "./EquipmentEntityWebber";
import {EquipmentEntityEmpty} from "./EquipmentEntityEmpty";
import {EquipmentEntityBattery} from "./EquipmentEntityBattery";

export class EQFactory {
  public static create(shipEquipment: ShipEquipment): ShipEquipmentEntity {

    if( shipEquipment === undefined || shipEquipment === null) {
      return undefined;
    }

    switch (shipEquipment.name) {
      case "Empty": return new EquipmentEntityEmpty(shipEquipment);
      case "Repair": return new EquipmentEntityRepair(shipEquipment);
      case "Webber": return new EquipmentEntityWebber(shipEquipment);
      case "Laser": return new EquipmentEntityLaser(shipEquipment);
      case "Battery": return new EquipmentEntityBattery(shipEquipment);
      case "SpeedBooster": return new EquipmentEntitySpeedBooster(shipEquipment);
      case "RocketLauncher": return new EquipmentEntityRocketLauncher(shipEquipment);

    }
    return undefined;
  }
}
