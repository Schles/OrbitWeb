


import { EnemySpawnMessage, getRandomColor, Server, ShipEquipment, ShipFitting, Spaceship } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { Spawner } from '../../../../../libs/game-logic/src/lib/core/Spawner';
import { MovementGoalOrbit } from '../../../../../libs/game-logic/src/lib/entity/movement/MovementGoalOrbit';
import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { GameLogic } from '../../../../../libs/game-logic/src';


@Server("EVENT", "enemyJoinedMessage")
export class ServerEnemySpawnMessage extends ServerMessageRecieved<EnemySpawnMessage> {
  constructor(message: EnemySpawnMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const sp = new Spaceship('Enemy', getRandomColor());

    const player = new SpaceshipEntity(sp);
    player.isNPC = true;

    new Spawner(context.boundries).spawnRandom(player);

    player.position = { x: 100, y: 100 };

    player.movementGoal = new MovementGoalOrbit({ x: 0, y: 0 }, 100);
    //player.movementGoal = new MovementGoalFreeFly();
    player.fitting = new ShipFitting();

    const eq = new ShipEquipment('Loot', 3, 0, 0, 1, true, {});
    player.fitting.fitting.push(eq);

    player.onInit();
    context.players.push(player);
  }
}
