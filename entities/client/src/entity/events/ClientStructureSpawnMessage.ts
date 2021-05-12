import { Client, GameFactory, StructureSpawnMessage } from '@orbitweb/common';
import {
  ClientMessageRecieved,
  GameManagerClient,
  StructureGO,
} from '@orbitweb/game-objects';

@Client("EVENT", "structureSpawnMessage")
export class ClientStructureSpawnMessage extends ClientMessageRecieved<StructureSpawnMessage> {
  constructor(message: StructureSpawnMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    const structureGO = context.structures.find(
      (structure) => structure.id === this.message.id
    );

    if (structureGO === undefined) {
      const structureGO: StructureGO = GameFactory.instantiateClientStructure(this.message);

      if (structureGO !== undefined) {
        context.structures.push(structureGO);

        structureGO.onInit();
        context.renderer.structureStage.addChild(structureGO.gameObject);
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
