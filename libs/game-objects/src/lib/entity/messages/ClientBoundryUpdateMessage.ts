import {SpaceShooter} from "@orbitweb/renderer";
import {BoundryUpdateMessage} from "@orbitweb/common";
import { ClientMessageRecieved } from "../../model/MessageRecieved";

export class ClientBoundryUpdateMessage extends ClientMessageRecieved<BoundryUpdateMessage> {

  constructor(message: BoundryUpdateMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
    context.boundry.setSize(this.message.boundry);
  }
}
