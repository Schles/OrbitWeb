import { Factories, PlayerJoinedMessage, ShipFitting, Spaceship } from "@orbitweb/common";
import { GameManager } from "../../GameManager";
import { ClientMessageRecieved } from "../../model/MessageRecieved";
import { SpaceshipGO } from "../../model/SpaceshipGO";
import { EquipmentDeserializer } from "../../serialize/EquipmentDeserializer";




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

      enemyGO = new SpaceshipGO(enemy);
      enemyGO.fitting = new ShipFitting();

      context.spawnPlayer(enemyGO);

      enemyGO.fitting.fitting = this.message.fitting.fitting.map((fit) => {
        const fitGO = EquipmentDeserializer.deserialize(fit);
        fitGO?.onInit(enemyGO);
        return fitGO;
      });

      enemyGO.iterateGraphics();
    } 

    if (enemyGO.id === context.username) {
      context.username = enemyGO.id;
    }

    context.eventManager.emit("UI_PLAYER_LOGIN", {
      name: this.message.source,
      fitting: enemyGO.fitting,
      spaceship: enemyGO
    });
  }
}
