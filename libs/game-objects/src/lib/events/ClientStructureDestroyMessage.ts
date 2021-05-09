import { StructureDestroyMessage } from '@orbitweb/common';
import { ClientMessageRecieved, GameManager } from '@orbitweb/game-objects';

export class ClientStructureDestroyMessage extends ClientMessageRecieved<StructureDestroyMessage> {
  constructor(message: StructureDestroyMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const structureGO = context.structures.find(
      (structure) => structure.id === this.message.id
    );

    if (structureGO !== undefined) {
      context.structureStage.removeChild(structureGO.gameObject);

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
