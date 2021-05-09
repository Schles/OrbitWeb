import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';

import { GameLogic } from '../../GameLogic';

import { SpaceshipEntity } from '../../model/SpaceshipEntity';

import { PlayerStructureMessage } from '@orbitweb/common';
import { StructureEntity } from '../../model/StructureEntity';
import { MovementGoalUseStructure } from '../movement/MovementGoalUseStructure';

export class ServerPlayerStructureMessage extends ServerMessageRecieved<PlayerStructureMessage> {
  constructor(message: PlayerStructureMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player: SpaceshipEntity = context.getPlayer(this.message.source);

    const structure: StructureEntity = context.structures.find((structure) => {
      return structure.id === this.message.structureId;
    });

    if (player !== undefined && structure !== undefined) {
      player.movementGoal = new MovementGoalUseStructure(structure);
    }
  }
}
