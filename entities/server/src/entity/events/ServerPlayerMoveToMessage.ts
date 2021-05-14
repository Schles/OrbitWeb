
import { CMath, GameManager, MessageRecieved, PlayerMoveToMessage, Server } from '@orbitweb/common';
import { MovementGoalOrbit } from '../movement/MovementGoalOrbit';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';


@Server("EVENT", "playerMoveToMessage")
export class ServerPlayerMoveToMessage extends MessageRecieved<PlayerMoveToMessage> {
  constructor(message: PlayerMoveToMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const player = context.players.find( (p) => p.id === this.message.source) as SpaceshipEntity;

    if (player && this.message.position) {
      const m = CMath.len(this.message.position);
      player.movementGoal = new MovementGoalOrbit({ x: 0, y: 0 }, m);
    }
  }
}
