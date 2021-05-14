


import {
  EnemySpawnMessage,
  GameManager,
  getRandomColor, MessageRecieved,
  Server,
  ShipEquipment,
  ShipFitting,
  Spaceship
} from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { Spawner } from '../../../../../libs/game-logic/src/lib/core/Spawner';
import { MovementGoalOrbit } from '../movement/MovementGoalOrbit';




@Server("EVENT", "enemyJoinedMessage")
export class ServerEnemySpawnMessage extends MessageRecieved<EnemySpawnMessage> {
  constructor(message: EnemySpawnMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const sp = new Spaceship('Enemy', getRandomColor());

    const player = new SpaceshipEntity(sp);
    player.isNPC = true;

    new Spawner(context.boundries).spawnRandom(player);

    player.position = { x: 100, y: 100 };

    player.movementGoal = new MovementGoalOrbit({ x: 0, y: 0 }, 100);
    //player.movementGoal = new MovementGoalFreeFly();
    player.fitting = new ShipFitting();

    const eq = new ShipEquipment('Loot', 3, 0, 1, true, {});
    player.fitting.fitting.push(eq);

    player.onInit();
    context.players.push(player);
  }
}
