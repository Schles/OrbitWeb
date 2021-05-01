import {ServerMessageRecieved} from "../../model/ServerMessageRecieved";

import {GameLogic} from "../../GameLogic";
import {Spaceship} from "@orbitweb/common";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";
import {ShipFitting} from "@orbitweb/common";



import {EnemySpawnMessage} from "@orbitweb/common";
import {MovementGoalIdle} from "../movement/MovementGoalIdle";
import {ShipEquipment} from "@orbitweb/common";
import {getRandomColor} from "@orbitweb/common";
import {Spawner} from "../../core/Spawner";



export class ServerEnemySpawnMessage extends ServerMessageRecieved<EnemySpawnMessage> {

  constructor(message: EnemySpawnMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const sp = new Spaceship("Enemy", getRandomColor());

    const player = new SpaceshipEntity(sp);
    player.isNPC = true;

    new Spawner(context.boundries).spawnRandom(player);

    player.movementGoal = new MovementGoalIdle();
    //player.movementGoal = new MovementGoalFreeFly();
    player.fitting = new ShipFitting();

    const eq = new ShipEquipment("Loot", 3, 0, 0, 1, true, {});
    player.fitting.fitting.push(eq);

    player.onInit();
    context.players.push(player);
  }
}