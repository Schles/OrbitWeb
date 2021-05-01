import {EventEmitter, Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {Observable} from "rxjs";
import {Message, ShipFitting} from "@orbitweb/common";
import { GameService } from './game.service';
import { ClientMessageRecieved, MessageDeserializer } from '@orbitweb/game-objects';
import { Events } from '@orbitweb/renderer';

export enum EventIO {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}


@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private socket;
  private server_url: string;
  private port = 8000;
  public DEBUG = false;
  public onConnect: EventEmitter<any> = new EventEmitter<any>();
  public onMessage: EventEmitter<Message> = new EventEmitter<Message>();

  constructor(private gameService: GameService) {
    //this.port = 49160;
    
    this.server_url = 'http://' + document.location.hostname + ':' + this.port;
    

    this.onConnect.subscribe( (v) => {
      if ( this.DEBUG) {
        const shipFitting = new ShipFitting();
        shipFitting.fitting = this.gameService.fittingDB.getSet("default");

        Events.loginPlayer.emit( {
          name: "Wasser",
          fitting: shipFitting
        });
      }

    });



  }

  public connect(): void {
    this.socket = io(this.server_url);

    this.socket.on('message', (data: Message) => this.onMessageReceived(data));

    this.socket.on("connection", () => {
      console.log('connected'); // TODO es hat keinen effekt. broken
      this.onConnect.emit()
    });

    this.socket.on("disconnect", () => {
      console.log('disconnected');
    });
    


  
  }

  private onMessageReceived(message: Message) {
    const msg: ClientMessageRecieved<any> = MessageDeserializer.deserialize(message);
    msg?.onRecieve(this.gameService.app());
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
