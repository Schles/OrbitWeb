
import { GameManager, MessageRecieved, PlayerStructureMessage, Server } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { StructureEntity } from '../../model/StructureEntity';
import { MovementGoalUseStructure } from '../movement/MovementGoalUseStructure';


@Server("EVENT", "playerStructureMessage")
export class ServerPlayerStructureMessage extends MessageRecieved<PlayerStructureMessage> {
  constructor(message: PlayerStructureMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const player = context.players.find( (p) => p.id === this.message.source) as SpaceshipEntity;

    const structure: StructureEntity = context.structures.find((structure) => {
      return structure.id === this.message.structureId;
    }) as StructureEntity;

    if (player !== undefined && structure !== undefined) {
      player.movementGoal = new MovementGoalUseStructure(structure);
    }
  }
}
