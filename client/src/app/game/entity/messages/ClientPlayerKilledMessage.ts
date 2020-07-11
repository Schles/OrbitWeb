import {ClientMessageRecieved} from "../../model/MessageRecieved";
import {SpaceShooter} from "../../SpaceShooter";
import {PlayerUpdateMessage} from "../../../../../../shared/src/message/game/player/PlayerUpdateMessage";
import {ShipEquipmentGO} from "../../model/ShipEquipmentGO";
import {SpaceshipGO} from "../../model/SpaceshipGO";
import {PlayerKilledMessage} from "../../../../../../shared/src/message/game/player/PlayerKilledMessage";
import {Events} from "../../Events";

export class ClientPlayerKilledMessage extends ClientMessageRecieved<PlayerKilledMessage> {

  constructor(message: PlayerKilledMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
    const deadPlayer = context.players.find(value => value.id === this.message.source);

    if ( deadPlayer !== undefined) {
      context.killPlayer(deadPlayer);
      Events.onPlayerKilled.emit(deadPlayer.id);
    }
  }
}
