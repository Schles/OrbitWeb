import { Injectable } from '@angular/core';
import { ShipFitting } from '@orbitweb/common';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private gameService: GameService) {
    this.gameService
      .app()
      .eventManager.on('UI_PLAYER_KILLED')
      .subscribe((val) => {
        if (val.died === this.gameService.app().username) this.logout();
      });
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
