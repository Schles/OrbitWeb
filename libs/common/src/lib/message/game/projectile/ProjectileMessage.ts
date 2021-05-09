import { Message } from '../../Message';

export class ProjectileMessage extends Message {
  constructor(public id: string) {
    super();
    this.type = 'projectileMessage';
  }
}
