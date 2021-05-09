import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';
import { GameLogic } from '../../GameLogic';
import { PlayerOrbitMessage, Spaceship } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

export class ServerPlayerOrbitMessage extends ServerMessageRecieved<PlayerOrbitMessage> {
  constructor(message: PlayerOrbitMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player = context.getPlayer(this.message.source);

    if (player !== undefined) {
      // target is beeing igored, cycle instead through all players (TAB Targeting)
      //const target = context.getPlayer(this.message.target);


      let nextTarget;

      if ( !player.targetPlayer) {
        // find any next
        nextTarget = this.nextTarget(context, -1);
      } else {
        const indexCurrentTarget = context.players.findIndex ( (p) => p.id === player.targetPlayer.id)

        nextTarget = this.nextTarget(context, indexCurrentTarget); 
      }      
      
      if (nextTarget !== undefined) {
        player.targetPlayer = nextTarget;
        player.actionOrbitTarget = true;
      }
      
     
    }
  }

  

  private nextTarget(context: GameLogic, currentIndex: number): SpaceshipEntity {
    let nextTarget;
    const player = context.getPlayer(this.message.source);

    for ( let i = 0; i < 2; i++) {
      const nextIndex = (currentIndex + i + 1) % context.players.length;
      nextTarget = context.players[nextIndex];

      if ( nextTarget.id === player.id ) {
        nextTarget = undefined;
        continue;
      } else {
        break;
      }          
    }

    return nextTarget;

  }
}
