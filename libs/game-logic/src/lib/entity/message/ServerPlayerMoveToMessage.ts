import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';
import { GameLogic } from '../../GameLogic';
import { PlayerMoveToMessage } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';
import { MovementGoalAlignTo } from '../movement/MovementGoalAlignTo';

export class ServerPlayerMoveToMessage extends ServerMessageRecieved<PlayerMoveToMessage> {
  constructor(message: PlayerMoveToMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player = context.getPlayer(this.message.source);

    if (player && this.message.position) {
      const dir = CMath.sub(this.message.position, player.position);

      const reqAngle = CMath.angle(dir, { x: 0, y: 1 });
      player.movementGoal = new MovementGoalAlignTo(reqAngle);
    }
  }
}
