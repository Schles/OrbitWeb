import { Client, MessageRecieved, GameFactory, GameManager, StructureSpawnMessage } from '@orbitweb/common';
import { StructureGO } from '../../model/StructureGO';
import { ClientMessageRecieved } from '../../model/ClientMessageRecieved';
import { World } from '@orbitweb/renderer';

@Client("EVENT", "structureSpawnMessage")
export class ClientStructureSpawnMessage extends ClientMessageRecieved<StructureSpawnMessage> {

  constructor(message: StructureSpawnMessage) {
    super(message);
  }

  onRecieveWithRenderer(context: GameManager, renderer: World) {
    const structureGO = context.structures.find(
      (structure) => structure.id === this.message.id
    );

    if (structureGO === undefined) {
      const structureGO: StructureGO = GameFactory.instantiateClientStructure(this.message);

      if (structureGO !== undefined) {
        context.structures.push(structureGO);

        structureGO.onInit();
        renderer.structureStage.addChild(structureGO.gameObject);
      }
    }

  }
}
