import {PlayerJoinedMessage} from "@orbitweb/common";


import {Spaceship} from "@orbitweb/common";
import {Factories} from "@orbitweb/common";
import {ShipFitting} from "@orbitweb/common";

import {EquipmentDeserializer} from "../../serialize/EquipmentDeserializer";
import { SpaceshipGO } from "../../model/SpaceshipGO";
import { GameManager } from "../../GameManager";
import { ClientMessageRecieved } from "../../model/MessageRecieved";

export class ClientPlayerJoinedMessage extends ClientMessageRecieved<PlayerJoinedMessage> {

  constructor(message: PlayerJoinedMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    let enemyGO: SpaceshipGO = context.players.find(value => {
      return value.id === this.message.source;
    });

    if (enemyGO === undefined) {
      const enemy: Spaceship = Factories.createSpaceship(this.message);

      enemyGO =  new SpaceshipGO(enemy);
      enemyGO.fitting = new ShipFitting();

      context.spawnPlayer(enemyGO);

      enemyGO.fitting.fitting = this.message.fitting.fitting.map ( (fit) => {
        const fitGO = EquipmentDeserializer.deserialize(fit);
        fitGO?.onInit(enemyGO);
        return fitGO;
      });

      enemyGO.iterateGraphics();
    } else {
      //console.log("Bereits bekannt");
    }
  }
}
