import {ServerMessageRecieved} from "../../model/ServerMessageRecieved";
import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {GameLogic} from "../../core/GameLogic";
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";
import {ShipFitting} from "../../../../../shared/src/model/ShipFitting";
import {EquipmentDeserializer} from "../../core/serialize/EquipmentDeserializer";
import {Rectangle, Vector2} from "../../../../../shared/src/util/VectorInterface";
import {CMath} from "../../../utils/CMath";
import {Spawner} from "../../core/Spawner";
import {getRandomColor} from "../../../utils/Util";


export class ServerPlayerJoinedMessage extends ServerMessageRecieved<PlayerJoinedMessage> {

  constructor(message: PlayerJoinedMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {

    let player = context.players.find( (p) => p.id === this.message.source);

    if ( player === undefined) {
      const sp = new Spaceship(this.message.source, getRandomColor());

      player = new SpaceshipEntity(sp);
      player.fitting = new ShipFitting();
      player.fitting.fitting = this.message.fitting.fitting.map( (fit) => {
        const eq = EquipmentDeserializer.deserialize(fit);
        eq.onInit(player);
        return eq;
      });


      new Spawner(context.boundries).spawnRandom(player);

      player.onInit();
      context.players.push(player);
    }

    const resmsg: PlayerJoinedMessage = new PlayerJoinedMessage(player);
    context.send(resmsg);

  }




}
