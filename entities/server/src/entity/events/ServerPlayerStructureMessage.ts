import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { PlayerStructureMessage, Server } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { GameLogic } from '../../../../../libs/game-logic/src';
import { StructureEntity } from '../../../../../libs/game-logic/src/lib/model/StructureEntity';
import { MovementGoalUseStructure } from '../../../../../libs/game-logic/src/lib/entity/movement/MovementGoalUseStructure';


@Server("EVENT", "playerStructureMessage")
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
