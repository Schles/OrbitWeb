import { EventEmitter } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import { Events } from "../model/Events";



type EventTypes = keyof Events;

type T = {
    type: keyof Events,
    queue: Subject<any>,
}

export class EventManager {

    private eventQueues: T[] = [];
    
    public emit<Type extends keyof Events>(type: Type, value: Events[Type]) {
        this.on(type).next(value);
    }

    public on<Type extends keyof Events>(type: Type): Subject<Events[Type]> {
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