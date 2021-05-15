import { AssetManager, BoundryUpdateMessage, Client } from '@orbitweb/common';
import { GameManager } from '@orbitweb/common';
import { ClientMessageRecieved } from '../../model/ClientMessageRecieved';

@Client("EVENT", "boundryUpdateMessage")
export class ClientBoundryUpdateMessage extends ClientMessageRecieved<BoundryUpdateMessage> {
  constructor(message: BoundryUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {

  }
}
