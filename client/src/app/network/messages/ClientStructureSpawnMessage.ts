import {ClientMessageRecieved} from "./MessageRecieved";
import {SpaceShooter} from "../../engine/SpaceShooter";
import {StructureSpawnMessage} from "../../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {StructureGO} from "../../game/gameobjects/StructureGO";
import {FactoryStructureGO} from "../../game/structures/FactoryStructureGO";

export class ClientStructureSpawnMessage extends ClientMessageRecieved<StructureSpawnMessage> {

  constructor(message: StructureSpawnMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {

    const structureGO = context.structures.find( (structure) => structure.id === this.message.id);


    if ( structureGO === undefined) {
      let structureGO: StructureGO = FactoryStructureGO.create(this.message);

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
