import { AssetManager, BoundryUpdateMessage, Client } from '@orbitweb/common';
import { MessageRecieved, GameManager } from '@orbitweb/common';

@Client("EVENT", "boundryUpdateMessage")
export class ClientBoundryUpdateMessage extends MessageRecieved<BoundryUpdateMessage> {
  constructor(message: BoundryUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {

  }
}
