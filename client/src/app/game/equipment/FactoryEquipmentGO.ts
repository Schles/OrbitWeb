import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {ShipEquipmentGO} from "../gameobjects/ShipEquipmentGO";
import {EquipmentGORepair} from "./EquipmentGORepair";
import {EquipmentGOWebber} from "./EquipmentGOWebber";
import {EquipmentGOLaser} from "./EquipmentGOLaser";
import {EquipmentGOSpeedBooster} from "./EquipmentGOSpeedBooster";
import {EquipmentGORocketLauncher} from "./EquipmentGORocketLauncher";

import {EquipmentGONosferatu} from "./EquipmentGONosferatu";


import {EquipmentGOError} from "./EquipmentGOError";
import {EquipmentGOEmpty} from "./EquipmentGOEmpty";

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

export class FactoryEquipmentGO {
  public static create(shipEquipment: ShipEquipment): ShipEquipmentGO {
    const name = "EquipmentGO" + shipEquipment.name;
    if( (<any>classes)[name] !== undefined) {
      return new classes[name](shipEquipment);
    }

    console.error("module not found", name);
    return new EquipmentGOError(shipEquipment);

  }
}
