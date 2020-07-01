import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {SpaceShooter} from "../engine/SpaceShooter";
import {EventIO} from "../network/client-enums";

import {WebsocketService} from "../network/websocket.service";
import {Message} from "../../../../shared/src/message/Message";
import {FittingDB} from "../game/FittingDB";
import {SpaceshipGO} from "../game/gameobjects/SpaceshipGO";
import {ProjectileGO} from "../game/gameobjects/ProjectileGO";
import {StructureGO} from "../game/gameobjects/StructureGO";
import {ShipFitting} from "../../../../shared/src/model/ShipFitting";
import {Game} from "../game/Game";

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


    this.onConnect.subscribe( (v) => {
      if ( this.DEBUG) {
        const shipFitting = new ShipFitting();
        shipFitting.fitting = this.fittingDB.getSet("default");

        Game.loginPlayer.emit( {
          name: "Wasser",
          fitting: shipFitting
        });
      }

    });
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

  public clear() {
    const players: SpaceshipGO[] = this.app().players.map ( p => p);

    players.forEach( (p) => {
      this.app().killPlayer(p);
    });

    const projectiles: ProjectileGO[] = this.app().projectiles.map (p => p);

    projectiles.forEach( (p) => {
      this.app().destroyProjectile(p);
    });

    const structures: StructureGO[] = this.app().structures.map (p => p);

    structures.forEach( (structureGO) => {
      this.app().gameStage.removeChild(structureGO.gameObject);

      const p = this.app().structures.findIndex(value => value.id === structureGO.id);
      if (p !== undefined) {
        structureGO.onDestroy();
        this.app().structures.splice(p, 1);
      }
    });

  }

}
