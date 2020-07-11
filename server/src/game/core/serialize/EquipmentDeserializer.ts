import {ShipEquipmentEntity} from "../../model/ShipEquipmentEntity";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";


import {EquipmentEntityLaser} from "../../entity/equipment/EquipmentEntityLaser";
import {EquipmentEntitySpeedBooster} from "../../entity/equipment/EquipmentEntitySpeedBooster";
import {EquipmentEntityRocketLauncher} from "../../entity/equipment/EquipmentEntityRocketLauncher";
import {EquipmentEntityRepair} from "../../entity/equipment/EquipmentEntityRepair";
import {EquipmentEntityWebber} from "../../entity/equipment/EquipmentEntityWebber";
import {EquipmentEntityEmpty} from "../../entity/equipment/EquipmentEntityEmpty";
import {EquipmentEntityBattery} from "../../entity/equipment/EquipmentEntityBattery";
import {EquipmentEntityNosferatu} from "../../entity/equipment/EquipmentEntityNosferatu";
import {EquipmentEntityMass} from "../../entity/equipment/EquipmentEntityMass";


export class EquipmentDeserializer {
  public static deserialize(shipEquipment: ShipEquipment): ShipEquipmentEntity {

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
      case "Nosferatu": return new EquipmentEntityNosferatu(shipEquipment);
      case "RocketLauncher": return new EquipmentEntityRocketLauncher(shipEquipment);
      case "Mass": return new EquipmentEntityMass(shipEquipment);
    }
    return undefined;
  }
}
