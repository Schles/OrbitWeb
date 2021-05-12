import { PlayerOrbitMessage, Server, Spaceship } from '@orbitweb/common';
import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { GameLogic } from '../../../../../libs/game-logic/src';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';


@Server("EVENT", "playerOrbitMessage")
export class ServerPlayerOrbitMessage extends ServerMessageRecieved<PlayerOrbitMessage> {
  constructor(message: PlayerOrbitMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player = context.getPlayer(this.message.source);

    if (player !== undefined) {
      // target is beeing igored, cycle instead through all players (TAB Targeting)
      //const target = context.getPlayer(this.events.target);

      let nextTarget;

      if (!player.targetPlayer) {
        // find any next
        nextTarget = this.nextTarget(context, -1);
      } else {
        const indexCurrentTarget = context.players.findIndex(
          (p) => p.id === player.targetPlayer.id
        );

        nextTarget = this.nextTarget(context, indexCurrentTarget);
      }

      if (nextTarget !== undefined) {
        player.targetPlayer = nextTarget;
        player.actionOrbitTarget = true;
      }
    }
  }

  private nextTarget(
    context: GameLogic,
    currentIndex: number
  ): SpaceshipEntity {
    let nextTarget;
    const player = context.getPlayer(this.message.source);

    for (let i = 0; i < 2; i++) {
      const nextIndex = (currentIndex + i + 1) % context.players.length;
      nextTarget = context.players[nextIndex];

      if (nextTarget.id === player.id) {
        nextTarget = undefined;
        continue;
      } else {
        break;
      }
    }

    return nextTarget;
  }
}
