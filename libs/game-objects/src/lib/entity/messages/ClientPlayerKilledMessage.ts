import { PlayerKilledMessage } from "@orbitweb/common";
import { GameManager } from "../../manager/GameManager";
import { ClientMessageRecieved } from "../../model/MessageRecieved";

export class ClientPlayerKilledMessage extends ClientMessageRecieved<PlayerKilledMessage> {

  constructor(message: PlayerKilledMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const deadPlayer = context.players.find(value => value.id === this.message.source);

    if (deadPlayer !== undefined) {
      context.killPlayer(deadPlayer);
      context.eventManager.emit("UI_PLAYER_KILLED", deadPlayer.id);
    }
  }
}
