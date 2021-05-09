import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';
import { PlayerJoinedMessage } from '@orbitweb/common';
import { GameLogic } from '../../GameLogic';
import { Spaceship } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { ShipFitting } from '@orbitweb/common';
import { EquipmentDeserializer } from '../../serialize/EquipmentDeserializer';

import { Spawner } from '../../core/Spawner';
import { getRandomColor } from '@orbitweb/common';
import { MovementGoalOrbit } from '../movement/MovementGoalOrbit';

export class ServerPlayerJoinedMessage extends ServerMessageRecieved<PlayerJoinedMessage> {
  constructor(message: PlayerJoinedMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    let player = context.players.find((p) => p.id === this.message.source);

    if (player === undefined) {
      const sp = new Spaceship(this.message.source, getRandomColor());

      player = new SpaceshipEntity(sp);
      player.fitting = new ShipFitting();

      player.movementGoal = new MovementGoalOrbit({ x: 0, y: 0 }, 150);

      player.fitting.fitting = this.message.fitting.fitting.reduce(
        (acc, fit) => {
          const eq = EquipmentDeserializer.deserialize(fit);
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
