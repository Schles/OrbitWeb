import { Client, GameManager, MessageRecieved, StructureDestroyMessage } from '@orbitweb/common';
import { ClientMessageRecieved } from '../../model/ClientMessageRecieved';
import { StructureGO } from '../../model/StructureGO';
import { World } from '@orbitweb/renderer';

@Client("EVENT", "structureDestroyMessage")
export class ClientStructureDestroyMessage extends ClientMessageRecieved<StructureDestroyMessage> {
  constructor(message: StructureDestroyMessage) {
    super(message);
  }


  onRecieveWithRenderer(context: GameManager, renderer: World) {
    const structureGO = context.structures.find(
      (structure) => structure.id === this.message.id
    ) as StructureGO;

    if (structureGO !== undefined) {
      renderer.structureStage.removeChild(structureGO.gameObject);

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
