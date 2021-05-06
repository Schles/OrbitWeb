import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';

import {Message, ShipFitting} from "@orbitweb/common";
import { GameService } from './game.service';


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

  constructor(private gameService: GameService) {
    //this.port = 49160;
    
    this.server_url = 'http://' + document.location.hostname + ':' + this.port;
  }

  public connect(): void {
    this.socket = io(this.server_url);

    this.socket.on('message', (data: Message) => {
      this.gameService.app().networkManager.onMessage.emit(data);
    });

    this.socket.on("connect", () => {
      console.log('connected');
      this.gameService.app().networkManager.sendHandler = (data: Message) => {
        console.log("sending", data);
        this.socket.emit('message', data);
      }

      this.gameService.app().networkManager.onConnect.emit();     

    });

    this.socket.on("disconnect", () => {
      console.log('disconnected');
      this.gameService.app().networkManager.onDisconnect.emit();
      this.gameService.app().networkManager.sendHandler = (data: Message) => {};
    });
  }
}
