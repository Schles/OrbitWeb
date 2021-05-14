
import { GameFactory, getRandomColor, PlayerJoinedMessage, Server, ShipFitting, Spaceship } from '@orbitweb/common';
import { GameLogic } from '../../../../../libs/game-logic/src';
import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { MovementGoalOrbit } from '../../../../../libs/game-logic/src/lib/entity/movement/MovementGoalOrbit';
import { Spawner } from '../../../../../libs/game-logic/src/lib/core/Spawner';


@Server("EVENT", "playerLoginMessage")
export class ServerPlayerJoinedMessage extends ServerMessageRecieved<PlayerJoinedMessage> {
  constructor(message: PlayerJoinedMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    let player = context.players.find((p: SpaceshipEntity) => p.id === this.message.source) as SpaceshipEntity

    if (player === undefined) {
      const sp = new Spaceship(this.message.source, getRandomColor());

      player = new SpaceshipEntity(sp);
      player.fitting = new ShipFitting();

      player.movementGoal = new MovementGoalOrbit({ x: 0, y: 0 }, 150);

      player.fitting.fitting = this.message.fitting.fitting.reduce(
        (acc, fit) => {
          const eq = GameFactory.instantiateServerEquip(fit);
          if (eq) {
            eq.onInit(player);
            acc.push(eq);
          } else {

          }
          return acc;
        },
        []
      );

      new Spawner(context.boundries).spawnRandom(player);
      player.position = { x: 150, y: 150 };
      player.onInit();
      context.players.push(player);
    }

    const resmsg: PlayerJoinedMessage = new PlayerJoinedMessage(player);
    context.send(resmsg);
  }
}
