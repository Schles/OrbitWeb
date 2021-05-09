import { BoundryUpdateMessage } from '@orbitweb/common';
import { ClientMessageRecieved, GameManager } from '@orbitweb/game-objects';

export class ClientBoundryUpdateMessage extends ClientMessageRecieved<BoundryUpdateMessage> {
  constructor(message: BoundryUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    context.boundry.setSize(this.message.boundry);
  }
}
