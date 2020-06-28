import {GameService} from "../service/game.service";
import {PlayerActionMessage} from "../../../../shared/src/message/game/player/PlayerActionMessage";
import {Game} from "./Game";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {PlayerMoveToMessage} from "../../../../shared/src/message/game/player/movement/PlayerMoveToMessage";
import {PlayerOrbitMessage} from "../../../../shared/src/message/game/player/movement/PlayerOrbitMessage";
import {PlayerService} from "../service/player.service";
import {PlayerStructureMessage} from "../../../../shared/src/message/game/player/movement/PlayerStructureMessage";
import {DebugMessage} from "../../../../shared/src/message/DebugMessage";

export class Input {

  constructor(private playerService: PlayerService, private gameService: GameService) {
    Game.worldClicked.subscribe((event: { localPosition: Vector2, event: any }) => {
      //console.log("worldClicked", event.localPosition);
      if (this.playerService.getUserName() !== undefined) {
        const msg: PlayerMoveToMessage = new PlayerMoveToMessage(this.playerService.getUserName(), event.localPosition);
        this.gameService.send(msg);
      } else {
        console.log("no player");
      }
    });

    Game.structureClicked.subscribe( (val) => {
      if (this.playerService.getUserName() !== undefined) {
        const msg: PlayerStructureMessage = new PlayerStructureMessage(this.playerService.getUserName(), val.target.id);
        this.gameService.send(msg);
      } else {
        console.log("no player");
      }
    })

    Game.playerClicked.subscribe((value) => {
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
