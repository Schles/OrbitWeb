import {ClientMessageRecieved} from "./MessageRecieved";
import {SpaceShooter} from "../../engine/SpaceShooter";
import {StructureDestroyMessage} from "../../../../../shared/src/message/game/structures/StructureDestroyMessage";

export class ClientStructureDestroyMessage extends ClientMessageRecieved<StructureDestroyMessage> {

  constructor(message: StructureDestroyMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
console.log("got it, destroy it", this.message);
    const structureGO = context.structures.find( (structure) => structure.id === this.message.id);

    if (structureGO !== undefined) {
      context.structureStage.removeChild(structureGO.gameObject);

      const p = context.structures.findIndex(value => value.id === structureGO.id);
      if (p !== undefined) {
        structureGO.onDestroy();
        context.projectiles.splice(p, 1);
      }
    }
  }
}
