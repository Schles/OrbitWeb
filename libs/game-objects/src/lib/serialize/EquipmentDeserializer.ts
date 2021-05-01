

import {ShipEquipment} from "@orbitweb/common";
import {EquipmentGOError} from "../entity/equipment/EquipmentGOError";
import {EquipmentGOEmpty} from "../entity/equipment/EquipmentGOEmpty";
import {EquipmentGOLaser} from "../entity/equipment/EquipmentGOLaser";
import {EquipmentGONosferatu} from "../entity/equipment/EquipmentGONosferatu";
import {EquipmentGORepair} from "../entity/equipment/EquipmentGORepair";
import {EquipmentGORocketLauncher} from "../entity/equipment/EquipmentGORocketLauncher";
import {EquipmentGOSpeedBooster} from "../entity/equipment/EquipmentGOSpeedBooster";
import {EquipmentGOWebber} from "../entity/equipment/EquipmentGOWebber";
import { ShipEquipmentGO } from "../model/ShipEquipmentGO";

//import * as eq from "../../entity/equipment";



const classes = {
  EquipmentGOError,
  EquipmentGOEmpty,
  EquipmentGOLaser,
  EquipmentGONosferatu,
  EquipmentGORepair,
  EquipmentGORocketLauncher,
  EquipmentGOSpeedBooster,
  EquipmentGOWebber
};

export class EquipmentDeserializer{
  static deserialize(shipEquipment: ShipEquipment): ShipEquipmentGO {
    return EquipmentDeserializer.create(shipEquipment);
    //return undefined;
  }

  public static create(shipEquipment: ShipEquipment): ShipEquipmentGO {
    const name = "EquipmentGO" + shipEquipment.name;
    if( (<any>classes)[name] !== undefined) {
      return new classes[name](shipEquipment);
    }

    console.error("module not found", name);
    return new EquipmentGOError(shipEquipment);

  }
}
