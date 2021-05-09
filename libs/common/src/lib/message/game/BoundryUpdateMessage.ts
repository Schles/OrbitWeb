import { Message } from '../Message';
import { Rectangle } from '../../util/VectorInterface';

export class BoundryUpdateMessage extends Message {
  constructor(public boundry: Rectangle) {
    super();
    this.type = 'boundryUpdateMessage';
  }
}
