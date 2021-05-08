import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';

import {Message} from "@orbitweb/common";
import { GameService } from './game.service';
import { environment } from '../../environments/environment';




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
  private port = environment.port;

  constructor(private gameService: GameService) {   
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
