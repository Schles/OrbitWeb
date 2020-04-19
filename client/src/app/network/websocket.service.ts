import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal-compatibility";



import * as socketIo from 'socket.io-client';
import {Message} from "../../../../server/src/model/message";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

const SERVER_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  private server_url = 'http://schles.eu:8000';


  constructor(private router: Router) {
    if( location.origin.indexOf("localhost") > -1)
      this.server_url = 'http://localhost:8000';
  }

  public initSocket(): void {
    this.socket = socketIo(this.server_url);
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
