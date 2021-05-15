import { EventEmitter } from '@angular/core';
import {
  GameFactory,
  LobbyQueryMessage,
  Message,
  PlayerLoginMessage,
  ShipFitting
} from '@orbitweb/common';
import { MessageRecieved } from '@orbitweb/common';
import { GameManagerClient } from './GameManagerClient';
import { ClientMessageRecieved } from '../../../../../entities/client/src/model/ClientMessageRecieved';
import { ClientPlayerUpdateMessage } from '@orbitweb/client-entities';

export class NetworkManager {
  public onConnect: EventEmitter<any> = new EventEmitter<any>();
  public onDisconnect: EventEmitter<any> = new EventEmitter<any>();
  public onMessage: EventEmitter<Message> = new EventEmitter<Message>();

  public sendHandler: (msg: Message) => void;

  constructor(private gameManager: GameManagerClient) {
    this.onConnect.subscribe(() => {
      this.gameManager.clear();
      this.send(new LobbyQueryMessage());
    });

    this.onMessage.subscribe((message: Message) => {
      const msg: ClientMessageRecieved<any> = GameFactory.instantiateClientEvent(message);
      msg?.onRecieveWithRenderer(this.gameManager, this.gameManager.renderer);
    });
  }

  public login(userName: string, fitting: ShipFitting) {
    this.gameManager.username = userName;
    this.send(new PlayerLoginMessage(userName, fitting));
  }

  public logout() {
    this.gameManager.username = undefined;
  }

  public send(msg: Message) {
    this.sendHandler(msg);
  }
}
