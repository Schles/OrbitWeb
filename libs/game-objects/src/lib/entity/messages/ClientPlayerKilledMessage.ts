import { ClientMessageRecieved } from "../../model/MessageRecieved";
import {PlayerKilledMessage} from "@orbitweb/common";
import {Events} from "@orbitweb/renderer";
import { GameManager } from "../../GameManager";

export class ClientPlayerKilledMessage extends ClientMessageRecieved<PlayerKilledMessage> {

  constructor(message: PlayerKilledMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const deadPlayer = context.players.find(value => value.id === this.message.source);

    if ( deadPlayer !== undefined) {
      context.killPlayer(deadPlayer);
      Events.onPlayerKilled.emit(deadPlayer.id);
    }
  }
}
