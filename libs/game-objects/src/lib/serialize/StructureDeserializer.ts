

import { StructureSpawnMessage } from "@orbitweb/common";
import { StructureGOPortal } from "@orbitweb/game-objects";
import { StructureGOLoot } from "@orbitweb/game-objects";
import { StructureGO } from "@orbitweb/game-objects";


const classes = {
  StructureGOPortal,
  StructureGOLoot,
};

export class StructureDeserializer {
  static deserialize(msg: StructureSpawnMessage): StructureGO {
    return StructureDeserializer.create(msg);
  }

  public static create(msg: StructureSpawnMessage): StructureGO {
    const name = "StructureGO" + msg.structureType;
    if ((<any>classes)[name] !== undefined) {
      return new classes[name](msg.id, msg.x, msg.y, msg.activationRange, msg.activationDuration, msg.info);
    }

    console.debug("structure not found", name);
    return undefined;

  }
}
