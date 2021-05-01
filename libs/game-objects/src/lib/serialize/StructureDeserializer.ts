

import {StructureSpawnMessage} from "@orbitweb/common";
import {StructureGOPortal} from "../entity/structures/StructureGOPortal";
import {StructureGOLoot} from "../entity/structures/StructureGOLoot";
import { StructureGO } from "../model/StructureGO";

//import * as eq from "../../entity/equipment";

const classes = {
  StructureGOPortal,
  StructureGOLoot,
};

export class StructureDeserializer{
  static deserialize(msg: StructureSpawnMessage): StructureGO {
    return StructureDeserializer.create(msg);
    //return undefined;
  }

  public static create(msg: StructureSpawnMessage): StructureGO {
    const name = "StructureGO" + msg.structureType;
    if( (<any>classes)[name] !== undefined) {
      return new classes[name](msg.id, msg.x, msg.y, msg.activationRange, msg.activationDuration, msg.info);
    }

    console.error("structure not found", name);
//    return new EquipmentGOError(shipEquipment);
    return undefined;

  }
}
