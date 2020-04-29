import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {ClientMessageRecieved} from "./MessageRecieved";
import {SpaceShooter} from "../../engine/SpaceShooter";
import {SpaceshipGO} from "../../game/gameobjects/SpaceshipGO";
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {Factories} from "../../../../../shared/src/util/Factories";
import {ShipFitting} from "../../../../../shared/src/model/ShipFitting";
import {FactoryEquipmentGO} from "../../game/equipment/FactoryEquipmentGO";

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
      /*
          enemy.position.x = msg.x;
          enemy.position.y = msg.y;

          enemy.health = msg.health;
          enemy.rotation = msg.rotation;

          enemy.speed.x = msg.speedX;
          enemy.speed.y = msg.speedY;

          enemy.cannon.rotation = msg.gun_rotation;
      */
      enemyGO.fitting = new ShipFitting();

      context.spawnPlayer(enemyGO);

      enemyGO.fitting.fitting = this.message.fitting.fitting.map ( (fit) => {
        const fitGO = FactoryEquipmentGO.create(fit);
        fitGO.onInit(enemyGO);
        return fitGO;
      });

      enemyGO.iterateGraphics();
    } else {
      //console.log("Bereits bekannt");
    }
/*
    if ( this.message.source === this.gameService.getUserName()) {
      this.ownPlayer = enemyGO;
      this.ui.loginEnabled = false;
    }

 */
  }
}
