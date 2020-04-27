import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {ShipEquipmentGO} from "../gameobjects/ShipEquipmentGO";
import {EquipmentGORepair} from "./EquipmentGORepair";
import {EquipmentGOWebber} from "./EquipmentGOWebber";
import {EquipmentGOLaser} from "./EquipmentGOLaser";
import {EquipmentGOSpeedBooster} from "./EquipmentGOSpeedBooster";
import {EquipmentGORocketLauncher} from "./EquipmentGORocketLauncher";
import {EquipmentGOEmpty} from "./EquipmentGOEmpty";
import {EquipmentGONosferatu} from "./EquipmentGONosferatu";


export class FactoryEquipmentGO {
  public static create(shipEquipment: ShipEquipment): ShipEquipmentGO {
    switch (shipEquipment.name) {
      case "Empty": return new EquipmentGOEmpty(shipEquipment);
      case "Battery": return new EquipmentGOEmpty(shipEquipment);
      case "Repair": return new EquipmentGORepair(shipEquipment);
      case "Webber": return new EquipmentGOWebber(shipEquipment);
      case "Laser": return new EquipmentGOLaser(shipEquipment);
      case "SpeedBooster": return new EquipmentGOSpeedBooster(shipEquipment);
      case "RocketLauncher": return new EquipmentGORocketLauncher(shipEquipment);
      case "Nosferatu": return new EquipmentGONosferatu(shipEquipment);

    }
    return undefined;
  }
}
