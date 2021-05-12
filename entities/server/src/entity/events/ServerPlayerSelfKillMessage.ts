


import { PlayerSelfKillMessage, Server } from '@orbitweb/common';
import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { GameLogic } from '../../../../../libs/game-logic/src';

@Server("EVENT", "playerSelfKillMessage")
export class ServerPlayerSelfKillMessage extends ServerMessageRecieved<PlayerSelfKillMessage> {
  constructor(message: PlayerSelfKillMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player = context.getPlayer(this.message.source);

    if (player !== undefined) {
      player.health = 0;
    }
  }
}
