import {GameService} from "../service/game.service";
import {PlayerActionMessage} from "../../../../shared/src/message/game/player/PlayerActionMessage";

export class Input {

  constructor(private gameService: GameService) {
  }

  public keyPressed(key) {
    console.log(key);
    const userName = this.gameService.getUserName();
    if ( userName !== undefined ) {

      const msg = new PlayerActionMessage(userName, key - 1);
      if (msg !== undefined) {
        this.gameService.send(msg);
      }
    }


  }
}
