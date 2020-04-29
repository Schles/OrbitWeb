import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {SpaceShooter} from "../engine/SpaceShooter";
import {EventIO} from "../network/client-enums";

import {WebsocketService} from "../network/websocket.service";
import {Message} from "../../../../shared/src/message/Message";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {FittingDB} from "../game/FittingDB";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public DEBUG = false;

  private application: SpaceShooter;

  private userName: string;

  private ioConnection: any;

  public onConnect: EventEmitter<any> = new EventEmitter<any>();
  public onMessage: EventEmitter<Message> = new EventEmitter<Message>();

  public fittingDB: FittingDB;


  constructor(private ngZone: NgZone, private socketService: WebsocketService) {
    this.ngZone.runOutsideAngular(() => {
      this.application = new SpaceShooter({ width: window.innerWidth, height: window.innerHeight, antialias: true,  }); // this creates our pixi application
    });

    this.fittingDB = new FittingDB();
  }

  public app() {
    return this.application;
  }

  public connect() {
      this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.onMessage.emit(message);
      });

    this.socketService.onEvent(<any>EventIO.CONNECT)
      .subscribe(() => {
        console.log('connected');
        this.onConnect.emit();

      });

    this.socketService.onEvent(<any>EventIO.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });

  }

  public send(msg: Message) {
    this.socketService.send(msg);
  }

}
