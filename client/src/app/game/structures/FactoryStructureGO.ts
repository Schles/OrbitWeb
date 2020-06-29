import {Structure} from "../../../../../shared/src/model/Structure";
import {StructureGO} from "../gameobjects/StructureGO";
import {StructureGOPortal} from "./StructureGOPortal";
import {StructureSpawnMessage} from "../../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {StructureGOLoot} from "./StructureGOLoot";

const classes = {
  StructureGOPortal,
  StructureGOLoot,
};

export class FactoryStructureGO {
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
