import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {SpaceShooter} from "../engine/SpaceShooter";
import {Event} from "../network/client-enums";

import {WebsocketService} from "../network/websocket.service";
import {Message} from "../../../../shared/src/message/Message";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {FittingDB} from "../game/FittingDB";
import {Game} from "../game/Game";
import {ShipFitting} from "../../../../shared/src/model/ShipFitting";
import {Spaceship} from "../../../../shared/src/model/Spaceship";
import {PlayerLoginMessage} from "../../../../shared/src/message/login/PlayerLoginMessage";
import {Input} from "../game/Input";

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

  public input: Input;

  constructor(private ngZone: NgZone, private socketService: WebsocketService, ) {
    this.ngZone.runOutsideAngular(() => {
      this.application = new SpaceShooter({ width: window.innerWidth, height: window.innerHeight, antialias: true,  }); // this creates our pixi application
    });

    this.input = new Input(this);

    this.fittingDB = new FittingDB();

    Game.loginPlayer.subscribe( (value: { name: string, fitting: ShipFitting, spaceship?: Spaceship}) => {
      this.login(value.name);

      this.send(new PlayerLoginMessage(value.name, value.fitting));
    });

    this.app().ticker.add ( (delta) => {
      const dT = this.app().ticker.elapsedMS / 1000;

      let me;
      let mePosition;
      if ( this.userName !== undefined) {
        me = this.app().players.find((p) => p.id === this.userName)
        if ( me !== undefined)
          mePosition = me.position;
      }

      this.app().iterate(dT);

      if (me !== undefined) {
        this.app().iterateSelf(me, dT);
      }





      if (this.app().camera !== undefined)
        this.app().camera.iterate(this.app().players.map( (v) => v.position), mePosition, dT);

      if (this.app().filter !== undefined) {
        if (this.app().players.length > 0) {
          const players: Vector2[] = this.app().players.map( (p) => this.app().gameStage.toGlobal(p.position));
          const sun: Vector2 = this.app().gameStage.toGlobal(this.app().sunGameObject.gameObject.position);

          let ownPlayerIndex = 0;

          if ( this.userName !== undefined) {
            ownPlayerIndex = this.app().players.findIndex( (p) => p.id === this.userName);
            ownPlayerIndex = ownPlayerIndex >= 0 ? ownPlayerIndex : 0;
          }

          this.app().filter.iterate(players, sun, dT, ownPlayerIndex);
        }
      }



    })

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
