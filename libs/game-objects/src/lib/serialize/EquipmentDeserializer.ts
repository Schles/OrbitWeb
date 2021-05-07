

import {ShipEquipment} from "@orbitweb/common";
import {EquipmentGOError} from "@orbitweb/game-objects";
import {EquipmentGOEmpty} from "@orbitweb/game-objects";
import {EquipmentGOLaser} from "@orbitweb/game-objects";
import {EquipmentGONosferatu} from "@orbitweb/game-objects";
import {EquipmentGORepair} from "@orbitweb/game-objects";
import {EquipmentGORocketLauncher} from "@orbitweb/game-objects";
import {EquipmentGOSpeedBooster} from "@orbitweb/game-objects";
import {EquipmentGOWebber} from "@orbitweb/game-objects";
import { ShipEquipmentGO } from "@orbitweb/game-objects";


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
  }

  public static create(shipEquipment: ShipEquipment): ShipEquipmentGO {
    const name = "EquipmentGO" + shipEquipment.name;
    if( (<any>classes)[name] !== undefined) {
      return new classes[name](shipEquipment);
    }

    console.debug("module not found", name);
    return new EquipmentGOError(shipEquipment);

  }
}
