import {PlayerJoinedMessage} from "../../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {ClientMessageRecieved} from "../../model/MessageRecieved";
import {SpaceShooter} from "../../SpaceShooter";
import {SpaceshipGO} from "../../model/SpaceshipGO";
import {Spaceship} from "../../../../../../shared/src/model/Spaceship";
import {Factories} from "../../../../../../shared/src/util/Factories";
import {ShipFitting} from "../../../../../../shared/src/model/ShipFitting";

import {EquipmentDeserializer} from "../../core/serialize/EquipmentDeserializer";

export class ClientPlayerJoinedMessage extends ClientMessageRecieved<PlayerJoinedMessage> {

  constructor(message: PlayerJoinedMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
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
        fitGO.onInit(enemyGO);
        return fitGO;
      });

      enemyGO.iterateGraphics();
    } else {
      //console.log("Bereits bekannt");
    }
  }
}
