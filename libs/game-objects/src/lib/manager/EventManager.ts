import { Subject } from "rxjs";
import { UIEvents } from "../common/UIEvents";

type EventTypes = keyof UIEvents;

type T = {
    type: keyof UIEvents,
    queue: Subject<any>,
}

export class EventManager {

    private eventQueues: T[] = [];
    
    public emit<Type extends keyof UIEvents>(type: Type, value: UIEvents[Type]) {
        this.on(type).next(value);
    }

    public on<Type extends keyof UIEvents>(type: Type): Subject<UIEvents[Type]> {
        let q = this.eventQueues.find( (v) => v.type === type);

        if ( q )
            return q.queue;

        q = {
            type: type,
            queue: new Subject<any>(),
        };

        this.eventQueues.push(q);

        return q.queue;

    }
    
}