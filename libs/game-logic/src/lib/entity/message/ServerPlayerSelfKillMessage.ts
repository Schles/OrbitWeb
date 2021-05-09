import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';

import { GameLogic } from '../../GameLogic';
import { PlayerSelfKillMessage } from '@orbitweb/common';

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
