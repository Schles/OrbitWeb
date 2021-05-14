import { Client, MessageRecieved, GameManager, PlayerUpdateMessage } from '@orbitweb/common';
import { SpaceshipGO } from '../../model/SpaceshipGO';
import { ShipEquipmentGO } from '../../model/ShipEquipmentGO';


@Client("EVENT", "playerUpdateMessage")
export class ClientPlayerUpdateMessage extends MessageRecieved<PlayerUpdateMessage> {
  constructor(message: PlayerUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const player: SpaceshipGO = context.players.find((value) => {
      return value.id === this.message.source;
    }) as SpaceshipGO;

    if (player === undefined) return;

    player.position.x = this.message.x;
    player.position.y = this.message.y;

    player.speed.x = this.message.speedX;
    player.speed.y = this.message.speedY;

    player.rotation = this.message.rotation;

    //player.cannon.rotation = msg.gun_rotation;

    player.fitting.fitting = player.fitting.fitting.map(
      (fit: ShipEquipmentGO, index) => {
        fit.state = this.message.fitting.fitting[index].state;
        fit.remainingTime = this.message.fitting.fitting[index].remainingTime;
        return fit;
      }
    );

    player.health = this.message.health;
    player.power = this.message.power;

    if (this.message.target !== undefined) {
      const target = context.players.find((p) => p.id === this.message.target);

      if (target !== undefined) {
        player.targetPlayer = target;
      }
    } else {
      player.targetPlayer = undefined;
    }

    player.activationProgress = this.message.activationProgress;

    //player.iterateGraphics();
  }
}
