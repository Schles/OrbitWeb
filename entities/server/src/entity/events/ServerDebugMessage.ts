import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { GameLogic } from '../../../../../libs/game-logic/src';
import { Server } from '@orbitweb/common';


@Server("EVENT", "debugMessage")
export class ServerDebugMessage extends ServerMessageRecieved<any> {
  constructor(message: any) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    context.players.forEach((player) => {
      player.speed = { x: 0, y: 0 };


    });
  }
}
