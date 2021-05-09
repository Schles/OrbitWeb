import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';
import { GameLogic } from '../../GameLogic';
import { MovementGoalIdle } from '../movement/MovementGoalIdle';

export class ServerDebugMessage extends ServerMessageRecieved<any> {
  constructor(message: any) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    context.players.forEach((player) => {
      player.speed = { x: 0, y: 0 };
      player.movementGoal = new MovementGoalIdle();
    });
  }
}
