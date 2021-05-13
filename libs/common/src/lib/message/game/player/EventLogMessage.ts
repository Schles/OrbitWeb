import { Message } from '@orbitweb/common';


export type EventLogType = {
  "PLAYER_DAMAGE_TAKEN": { source: number, target: number, damageTaken: number, equipmentSource: string};
}

export class EventLogMessage<T extends keyof EventLogType> extends Message {

  constructor(public logType: T, public message: EventLogType[T]) {
    super();
    this.type = 'eventLogMessage';
  }
}
