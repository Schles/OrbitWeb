import {ServerMessageRecieved} from "../../model/ServerMessageRecieved";
import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {GameLogic} from "../../core/GameLogic";
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";
import {ShipFitting} from "../../../../../shared/src/model/ShipFitting";
import {EquipmentDeserializer} from "../../core/serialize/EquipmentDeserializer";
import {Rectangle, Vector2} from "../../../../../shared/src/util/VectorInterface";
import {CMath} from "../../../utils/CMath";
import {EnemySpawnMessage} from "../../../../../shared/src/message/game/SpawnEnemyMessage";
import {MovementGoalIdle} from "../movement/MovementGoalIdle";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {ServerPlayerJoinedMessage} from "./ServerPlayerJoinedMessage";
import {getRandomColor} from "../../../utils/Util";
import {Spawner} from "../../core/Spawner";
import {Message} from "../../../../../shared/src/message/Message";


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
