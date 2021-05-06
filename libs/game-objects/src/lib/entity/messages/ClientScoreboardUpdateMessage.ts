import { ClientMessageRecieved } from "../../model/MessageRecieved";
import {ScoreboardUpdateMessage} from "@orbitweb/common";
import { GameManager } from "../../manager/GameManager";

export class ClientScoreboardUpdateMessage extends ClientMessageRecieved<ScoreboardUpdateMessage> {

  constructor(message: ScoreboardUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    //this.ui.scoreboard.scoreboard = (<ScoreboardUpdateMessage> message).entries;
  }
}
