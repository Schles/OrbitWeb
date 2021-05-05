import {Injectable} from '@angular/core';


import {Events} from "@orbitweb/renderer";
import {ShipFitting} from "@orbitweb/common";
import {PlayerLoginMessage} from "@orbitweb/common";

import {GameService} from "./game.service";


@Injectable({
  providedIn: 'root'
})
export class PlayerService { 

  constructor(private gameService: GameService) {
    Events.onPlayerKilled.subscribe( (name: string) => {
      if (name === this.gameService.app().username)
        this.logout();
    })
  }

  public login(userName: string, fitting: ShipFitting) {
    this.gameService.app().networkManager.login(userName, fitting);
  }


  public logout() {
    this.gameService.app().networkManager.logout();
  }

  public isLoggedIn(): boolean {
    return this.gameService.app().username !== undefined;
  }





}
