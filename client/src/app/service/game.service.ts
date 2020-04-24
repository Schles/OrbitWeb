import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {SpaceShooter} from "../engine/SpaceShooter";
import {Message} from "../shared/message";
import {Event} from "../network/client-enums";
import {LobbyQueryMessage} from "../../../../shared/src/message/login/LobbyQueryMessage";
import {PlayerLoginMessage} from "../../../../shared/src/message/login/PlayerLoginMessage";
import {WebsocketService} from "../network/websocket.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public DEBUG = true;

  private application: SpaceShooter;

  private userName: string;

  private ioConnection: any;

  public onConnect: EventEmitter<any> = new EventEmitter<any>();
  public onMessage: EventEmitter<Message> = new EventEmitter<Message>();



  constructor(private ngZone: NgZone, private socketService: WebsocketService, ) {
    this.ngZone.runOutsideAngular(() => {
      this.application = new SpaceShooter({ width: window.innerWidth, height: window.innerHeight}); // this creates our pixi application
    });
  }



  public app() {
    return this.application;
  }

  public getUserName(): string {
    return this.userName;
  }

  public login(userName: string) {
    this.userName = userName;
  }

  public logout() {
    this.userName = undefined;
  }

  public connect() {
      this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.onMessage.emit(message);
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
        this.onConnect.emit();

      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });

  }

  public send(msg: Message) {
    this.socketService.send(msg);
  }

}
