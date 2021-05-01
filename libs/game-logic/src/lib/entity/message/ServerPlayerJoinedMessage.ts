import {ServerMessageRecieved} from "../../model/ServerMessageRecieved";
import {PlayerJoinedMessage} from "@orbitweb/common";
import {GameLogic} from "../../GameLogic";
import {Spaceship} from "@orbitweb/common";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";
import {ShipFitting} from "@orbitweb/common";
import {EquipmentDeserializer} from "../../serialize/EquipmentDeserializer";

import {Spawner} from "../../core/Spawner";
import {getRandomColor} from "@orbitweb/common";


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
