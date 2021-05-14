
import { GameManager, MessageRecieved, PlayerSelfKillMessage, Server } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';


@Server("EVENT", "playerSelfKillMessage")
export class ServerPlayerSelfKillMessage extends MessageRecieved<PlayerSelfKillMessage> {
  constructor(message: PlayerSelfKillMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const player = context.players.find( (p) => p.id === this.message.source) as SpaceshipEntity;

    if (player !== undefined) {
      player.health = 0;
    }
  }
}
