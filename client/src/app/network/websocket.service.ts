import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Observable} from "rxjs";
import {Message} from "../../../../shared/src/message/Message";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  private server_url: string;
  private port = 8000;

  constructor() {
    this.port = 49160;
    //console.error("dev port is used!");
    this.server_url = 'http://' + document.location.hostname + ':' + this.port;
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
