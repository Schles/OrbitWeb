import {Injectable} from '@angular/core';


import {Events} from "@orbitweb/renderer";
import {ShipFitting} from "@orbitweb/common";
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
  }

  public login(userName: string, fitting: ShipFitting) {
    this.gameService.app().username = userName;
    this.networkService.send(new PlayerLoginMessage(userName, fitting));
  }


  public logout() {
    this.gameService.app().username = undefined;
  }

  public isLoggedIn(): boolean {
    return this.gameService.app().username !== undefined;
  }





}
