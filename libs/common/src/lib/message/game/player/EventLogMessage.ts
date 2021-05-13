import { Message } from '@orbitweb/common';

export class EventLogMessage extends Message {
  constructor(player: string, public skillIndex: number) {
    super();
    this.type = 'eventLogMessage';
  }
}
