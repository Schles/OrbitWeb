import {ClientMessageRecieved} from "./MessageRecieved";
import {SpaceShooter} from "../../engine/SpaceShooter";
import {PlayerUpdateMessage} from "../../../../../shared/src/message/game/player/PlayerUpdateMessage";
import {ShipEquipmentGO} from "../../game/gameobjects/ShipEquipmentGO";
import {SpaceshipGO} from "../../game/gameobjects/SpaceshipGO";

export class ClientPlayerUpdateMessage extends ClientMessageRecieved<PlayerUpdateMessage> {

  constructor(message: PlayerUpdateMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
    let enemyGO: SpaceshipGO = context.players.find(value => {
      return value.id === this.message.source;
    });

    if (enemyGO === undefined)
      return;


    enemyGO.position.x = this.message.x;
    enemyGO.position.y = this.message.y;

    enemyGO.speed.x = this.message.speedX;
    enemyGO.speed.y = this.message.speedY;

    enemyGO.rotation = this.message.rotation;

    //enemyGO.cannon.rotation = msg.gun_rotation;

    enemyGO.fitting.fitting = enemyGO.fitting.fitting.map( (fit: ShipEquipmentGO, index) => {
      fit.state = this.message.fitting.fitting[index].state;
      fit.remainingTime = this.message.fitting.fitting[index].remainingTime;
      return fit;
    });

    enemyGO.health = this.message.health;
    enemyGO.power = this.message.power;

    if ( this.message.target !== undefined ) {
      const target = context.players.find((p) => p.id === this.message.target);

      if (target !== undefined) {
        enemyGO.targetPlayer = target;
      }
    } else {
      enemyGO.targetPlayer = undefined;
    }

    enemyGO.activationProgress = this.message.activationProgress;

    enemyGO.iterateGraphics();
  }
}
