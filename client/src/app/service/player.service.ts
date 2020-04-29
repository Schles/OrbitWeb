import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {SpaceShooter} from "../engine/SpaceShooter";
import {EventIO} from "../network/client-enums";

import {WebsocketService} from "../network/websocket.service";
import {Message} from "../../../../shared/src/message/Message";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {FittingDB} from "../game/FittingDB";
import {Game} from "../game/Game";
import {ShipFitting} from "../../../../shared/src/model/ShipFitting";
import {Spaceship} from "../../../../shared/src/model/Spaceship";
import {PlayerLoginMessage} from "../../../../shared/src/message/login/PlayerLoginMessage";
import {Input} from "../game/Input";
import {GameService} from "./game.service";
import {PlayerActionMessage} from "../../../../shared/src/message/game/player/PlayerActionMessage";
import {MessageFactory} from "../network/messages/MessageFactory";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private userName: string;

  public input: Input;

  constructor(private gameService: GameService) {

    this.input = new Input(this, gameService);

    Game.onPlayerKilled.subscribe( (name: string) => {
      if (name === this.getUserName())
        this.logout();
    })

    Game.loginPlayer.subscribe( (value: { name: string, fitting: ShipFitting, spaceship?: Spaceship}) => {
      this.login(value.name);
      console.log("login");
      this.gameService.send(new PlayerLoginMessage(value.name, value.fitting));
    });

    this.gameService.app().ticker.add ( (delta) => {
      const dT = this.gameService.app().ticker.elapsedMS / 1000;

      let me;
      let mePosition;
      if ( this.userName !== undefined) {
        me = this.gameService.app().players.find((p) => p.id === this.userName)
        if ( me !== undefined)
          mePosition = me.position;
      }

      this.gameService.app().iterate(dT);

      if (me !== undefined) {
        this.gameService.app().iterateSelf(me, dT);
      }






      if (this.gameService.app().filter !== undefined) {
        if (this.gameService.app().players.length > 0) {
          const players: Vector2[] = this.gameService.app().players.map( (p) => this.gameService.app().gameStage.toGlobal(<any>p.position));
          const sun: Vector2 = this.gameService.app().gameStage.toGlobal(this.gameService.app().sunGameObject.gameObject.position);

          let ownPlayerIndex = 0;

          if ( this.userName !== undefined) {
            ownPlayerIndex = this.gameService.app().players.findIndex( (p) => p.id === this.userName);
            ownPlayerIndex = ownPlayerIndex >= 0 ? ownPlayerIndex : 0;
          }

          this.gameService.app().filter.iterate(players, sun, dT, ownPlayerIndex);
        }
      }
    });


  }

  public login(userName: string) {
    this.userName = userName;
  }


  public logout() {
    this.userName = undefined;
  }

  public getUserName(): string {
    return this.userName;
  }

  public isLoggedIn(): boolean {
    return this.userName !== undefined;
  }





}
