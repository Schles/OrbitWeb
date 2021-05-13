import { AssetManager, BoundryUpdateMessage, Client } from '@orbitweb/common';
import { ClientMessageRecieved, GameManagerClient } from '@orbitweb/game-objects';

@Client("EVENT", "boundryUpdateMessage")
export class ClientBoundryUpdateMessage extends ClientMessageRecieved<BoundryUpdateMessage> {
  constructor(message: BoundryUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {

  }
}
