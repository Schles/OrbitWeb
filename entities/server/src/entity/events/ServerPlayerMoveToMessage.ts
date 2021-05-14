
import { CMath, PlayerMoveToMessage, Server } from '@orbitweb/common';
import { GameLogic } from '../../../../../libs/game-logic/src';
import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { MovementGoalOrbit } from '../../../../../libs/game-logic/src/lib/movement/MovementGoalOrbit';


@Server("EVENT", "playerMoveToMessage")
export class ServerPlayerMoveToMessage extends ServerMessageRecieved<PlayerMoveToMessage> {
  constructor(message: PlayerMoveToMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player = context.getPlayer(this.message.source);

    if (player && this.message.position) {
      const dir = CMath.sub(this.message.position, player.position);

      const m = CMath.len(this.message.position);

      //const reqAngle = CMath.angle(dir, { x: 0, y: 1 });

      player.movementGoal = new MovementGoalOrbit({ x: 0, y: 0 }, m);
    }
  }
}
