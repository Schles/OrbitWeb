import {GameService} from "../../service/game.service";
import {PlayerActionMessage} from "@orbitweb/common";
import {Events} from "@orbitweb/renderer";
import {Vector2} from "@orbitweb/common";
import {PlayerMoveToMessage} from "@orbitweb/common";
import {PlayerOrbitMessage} from "@orbitweb/common";
import {PlayerService} from "../../service/player.service";
import {PlayerStructureMessage} from "@orbitweb/common";
import {DebugMessage} from "@orbitweb/common";

export class Input {

  constructor(private playerService: PlayerService, private gameService: GameService) {
    Events.worldClicked.subscribe((event: { localPosition: Vector2, event: any }) => {
      //console.log("worldClicked", event.localPosition);
      if (this.playerService.getUserName() !== undefined) {
        const msg: PlayerMoveToMessage = new PlayerMoveToMessage(this.playerService.getUserName(), event.localPosition);
        this.gameService.send(msg);
      } else {
        console.log("no player");
      }
    });

    Events.structureClicked.subscribe( (val) => {
      if (this.playerService.getUserName() !== undefined) {
        const msg: PlayerStructureMessage = new PlayerStructureMessage(this.playerService.getUserName(), val.target.id);
        this.gameService.send(msg);
      } else {
        console.log("no player");
      }
    })

    Events.playerClicked.subscribe((value) => {
      if (value.target.id === this.playerService.getUserName()) {
        console.log("self");
      } else {
        const msg: PlayerOrbitMessage = new PlayerOrbitMessage(this.playerService.getUserName(), value.target.id);
        this.gameService.send(msg);
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
    const userName = this.playerService.getUserName();
    if ( userName !== undefined ) {

      const msg = new PlayerActionMessage(userName, key - 1);
      if (msg !== undefined) {
        this.gameService.send(msg);
      }
    }


  }

  public debugPressed(key) {
    console.log(key);
    const userName = this.playerService.getUserName();
    if ( userName !== undefined ) {

      const msg = new DebugMessage();
      if (msg !== undefined) {
        this.gameService.send(msg);
      }
    }


  }
}
