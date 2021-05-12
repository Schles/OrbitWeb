import { Client, StructureDestroyMessage } from '@orbitweb/common';
import { ClientMessageRecieved, GameManagerClient } from '@orbitweb/game-objects';

@Client("EVENT", "structureDestroyMessage")
export class ClientStructureDestroyMessage extends ClientMessageRecieved<StructureDestroyMessage> {
  constructor(message: StructureDestroyMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    const structureGO = context.structures.find(
      (structure) => structure.id === this.message.id
    );

    if (structureGO !== undefined) {
      context.renderer.structureStage.removeChild(structureGO.gameObject);

      const p = context.structures.findIndex(
        (value) => value.id === structureGO.id
      );
      if (p !== undefined) {
        structureGO.onDestroy();
        context.projectiles.splice(p, 1);
      }
    }
  }
}
