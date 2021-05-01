import {Injectable} from '@angular/core';
import {Vector2} from "@orbitweb/common";

import {Events} from "@orbitweb/renderer";
import {ShipFitting} from "@orbitweb/common";
import {Spaceship} from "@orbitweb/common";
import {PlayerLoginMessage} from "@orbitweb/common";

import {GameService} from "./game.service";
import { NetworkService } from './network.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private userName: string;

  constructor(private gameService: GameService, private networkService: NetworkService) {
    Events.onPlayerKilled.subscribe( (name: string) => {
      if (name === this.getUserName())
        this.logout();
    })

    Events.loginPlayer.subscribe( (value: { name: string, fitting: ShipFitting, spaceship?: Spaceship}) => {
      this.login(value.name);
      console.log("login");
      this.networkService.send(new PlayerLoginMessage(value.name, value.fitting));
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
