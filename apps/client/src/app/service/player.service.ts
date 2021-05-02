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

  constructor(private gameService: GameService, private networkService: NetworkService) {
    Events.onPlayerKilled.subscribe( (name: string) => {
      if (name === this.gameService.app().username)
        this.logout();
    })

    Events.loginPlayer.subscribe( (value: { name: string, fitting: ShipFitting, spaceship?: Spaceship}) => {
      this.login(value.name);
      this.networkService.send(new PlayerLoginMessage(value.name, value.fitting));
    });
  }

  public login(userName: string) {
    this.gameService.app().username = userName;
  }


  public logout() {
    this.gameService.app().username = undefined;
  }

  public isLoggedIn(): boolean {
    return this.gameService.app().username !== undefined;
  }





}
