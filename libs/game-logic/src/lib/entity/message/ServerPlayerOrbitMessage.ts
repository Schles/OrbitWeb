import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';
import { GameLogic } from '../../GameLogic';
import { PlayerOrbitMessage } from '@orbitweb/common';

export class ServerPlayerOrbitMessage extends ServerMessageRecieved<PlayerOrbitMessage> {
  constructor(message: PlayerOrbitMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player = context.getPlayer(this.message.source);

    if (player !== undefined) {
      const target = context.getPlayer(this.message.target);
      if (target !== undefined) {
        player.targetPlayer = target;
        player.actionOrbitTarget = true;
      }
    }
  }
}
