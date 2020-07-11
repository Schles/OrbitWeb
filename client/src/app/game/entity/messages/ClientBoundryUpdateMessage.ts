import {ClientMessageRecieved} from "../../model/MessageRecieved";
import {SpaceShooter} from "../../SpaceShooter";
import {BoundryUpdateMessage} from "../../../../../../shared/src/message/game/BoundryUpdateMessage";

export class ClientBoundryUpdateMessage extends ClientMessageRecieved<BoundryUpdateMessage> {

  constructor(message: BoundryUpdateMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
    context.boundry.setSize(this.message.boundry);
  }
}
