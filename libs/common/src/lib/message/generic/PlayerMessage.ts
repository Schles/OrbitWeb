import { Message } from '../Message';

export class PlayerMessage extends Message {
  constructor(public source: string) {
    super();
    this.type = 'playerMessage';
  }
}
