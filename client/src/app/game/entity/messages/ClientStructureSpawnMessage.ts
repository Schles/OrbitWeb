import {ClientMessageRecieved} from "../../model/MessageRecieved";
import {SpaceShooter} from "../../SpaceShooter";
import {StructureSpawnMessage} from "../../../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {StructureGO} from "../../model/StructureGO";
import {StructureDeserializer} from "../../core/serialize/StructureDeserializer";

export class ClientStructureSpawnMessage extends ClientMessageRecieved<StructureSpawnMessage> {

  constructor(message: StructureSpawnMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {

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
