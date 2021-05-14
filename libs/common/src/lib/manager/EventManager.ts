import { Subject } from 'rxjs';
import { ServerEvents, Events } from '../Events';




export type EventTypes = Events & ServerEvents;






type T = {
  type: keyof EventTypes;
  queue: Subject<any>;
};

export class EventManager {
  private eventQueues: T[] = [];

  public emit<Type extends keyof EventTypes>(type: Type, value: EventTypes[Type]) {
    this.on(type).next(value);
  }

  public on<Type extends keyof EventTypes>(type: Type): Subject<EventTypes[Type]> {
    let q = this.eventQueues.find((v) => v.type === type);

    if (q) return q.queue;

    q = {
      type: type,
      queue: new Subject<any>(),
    };

    this.eventQueues.push(q);

    return q.queue;
  }
}
