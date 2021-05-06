import { ClientMessageRecieved } from "../../model/MessageRecieved";
import {StructureSpawnMessage} from "@orbitweb/common";
import {StructureDeserializer} from "../../serialize/StructureDeserializer";
import { StructureGO } from "../../model/StructureGO";
import { GameManager } from "../../manager/GameManager";

export class ClientStructureSpawnMessage extends ClientMessageRecieved<StructureSpawnMessage> {

  constructor(message: StructureSpawnMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {

    const structureGO = context.structures.find( (structure) => structure.id === this.message.id);


    if ( structureGO === undefined) {
      let structureGO: StructureGO = StructureDeserializer.deserialize(this.message);

      if (structureGO !== undefined) {
        context.structures.push(structureGO);

        structureGO.onInit();
        context.structureStage.addChild(structureGO.gameObject);
      }

    }
/*
    public spawnProjectile(projectile: ProjectileGO) {

        if ( this.projectiles.findIndex( (p) => p.id === projectile.id ) < 0) {

        }
      }
    }
*/
  }
}
