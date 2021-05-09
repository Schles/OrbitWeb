import { EventEmitter } from '@angular/core';
import {
  LobbyQueryMessage,
  Message,
  PlayerLoginMessage,
  ShipFitting,
} from '@orbitweb/common';
import { ClientMessageRecieved } from '@orbitweb/game-objects';
import { MessageDeserializer } from '../serialize/MessageDeserializer';
import { GameManager } from './GameManager';

export class NetworkManager {
  public onConnect: EventEmitter<any> = new EventEmitter<any>();
  public onDisconnect: EventEmitter<any> = new EventEmitter<any>();
  public onMessage: EventEmitter<Message> = new EventEmitter<Message>();

  public sendHandler: (msg: Message) => void;

  constructor(private gameManager: GameManager) {
    this.onConnect.subscribe(() => {
      this.gameManager.clear();
      this.send(new LobbyQueryMessage());
    });

    this.onMessage.subscribe((message: Message) => {
      const msg: ClientMessageRecieved<any> = MessageDeserializer.deserialize(
        message
      );
      msg?.onRecieve(this.gameManager);
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
