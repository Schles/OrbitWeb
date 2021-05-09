import { Message } from '../Message';

export class LobbyQueryMessage extends Message {
  constructor() {
    super();
    this.type = 'lobbyQueryMessage';
  }
}
