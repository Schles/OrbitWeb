
import {ScoreboardUpdateMessage} from "@orbitweb/common";
import { ClientMessageRecieved, GameManager } from "@orbitweb/game-objects";


export class ClientScoreboardUpdateMessage extends ClientMessageRecieved<ScoreboardUpdateMessage> {

  constructor(message: ScoreboardUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    //this.ui.scoreboard.scoreboard = (<ScoreboardUpdateMessage> message).entries;
  }
}
