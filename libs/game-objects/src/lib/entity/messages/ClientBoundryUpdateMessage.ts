
import {BoundryUpdateMessage} from "@orbitweb/common";
import { GameManager } from "../../manager/GameManager";
import { ClientMessageRecieved } from "../../model/MessageRecieved";

export class ClientBoundryUpdateMessage extends ClientMessageRecieved<BoundryUpdateMessage> {

  constructor(message: BoundryUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    context.boundry.setSize(this.message.boundry);
  }
}
