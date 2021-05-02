import {Injectable} from '@angular/core';
import {DebugMessage, PlayerActionMessage, PlayerMoveToMessage, PlayerOrbitMessage, PlayerStructureMessage, Vector2} from "@orbitweb/common";
import { Events } from '@orbitweb/renderer';

import { PlayerService } from './player.service';
import { NetworkService } from './network.service';
import { GameService } from './game.service';


@Injectable({
  providedIn: 'root'
})
export class InputService {
  constructor(private playerService: PlayerService, private networkService: NetworkService, private gameService: GameService) {
    Events.worldClicked.subscribe((event: { localPosition: Vector2, event: any }) => {
      //console.log("worldClicked", event.localPosition);
      if (this.gameService.app().playerLocal !== undefined) {
        const msg: PlayerMoveToMessage = new PlayerMoveToMessage(this.gameService.app().playerLocal.id, event.localPosition);
        this.networkService.send(msg);
      } else {
        console.log("no player");
      }
    });

    Events.structureClicked.subscribe( (val) => {
      if (this.gameService.app().playerLocal !== undefined) {
        const msg: PlayerStructureMessage = new PlayerStructureMessage(this.gameService.app().playerLocal.id, val.target.id);
        this.networkService.send(msg);
      } else {
        console.log("no player");
      }
    })

    Events.playerClicked.subscribe((value) => {
      if (value.target.id === this.gameService.app().playerLocal?.id) {
        console.log("self");
      } else {
        const msg: PlayerOrbitMessage = new PlayerOrbitMessage(this.gameService.app().playerLocal.id, value.target.id);
        this.networkService.send(msg);
      }
    });

    window.addEventListener(
      "keydown", (event) => {

        if ( this.playerService.isLoggedIn()) {
          if ( event.key === "1") {
            this.keyPressed(1);
          } else if ( event.key === "2") {
            this.keyPressed(2);
          } else if ( event.key === "3") {
            this.keyPressed(3);
          } else if ( event.key === "4") {
            this.keyPressed(4);
          } else if ( event.key === "5") {
            this.keyPressed(5);
          } else if ( event.key === " ") {
            this.debugPressed(-1);
          }

        }
      });

  }

  public keyPressed(key) {
    console.log(key);
    const userName = this.gameService.app().playerLocal;
    if ( userName !== undefined ) {

      const msg = new PlayerActionMessage(userName.id, key - 1);
      if (msg !== undefined) {
        this.networkService.send(msg);
      }
    }


  }

  public debugPressed(key) {
    console.log(key);
    const userName = this.gameService.app().playerLocal;
    if ( userName !== undefined ) {

      const msg = new DebugMessage();
      if (msg !== undefined) {
        this.networkService.send(msg);
      }
    }


  }
}
