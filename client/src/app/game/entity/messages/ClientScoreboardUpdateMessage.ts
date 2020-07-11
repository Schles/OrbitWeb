import {ClientMessageRecieved} from "../../model/MessageRecieved";
import {SpaceShooter} from "../../SpaceShooter";
import {BoundryUpdateMessage} from "../../../../../../shared/src/message/game/BoundryUpdateMessage";
import {ScoreboardUpdateMessage} from "../../../../../../shared/src/message/game/ScoreboardUpdateMessage";

export class ClientScoreboardUpdateMessage extends ClientMessageRecieved<ScoreboardUpdateMessage> {

  constructor(message: ScoreboardUpdateMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
    //this.ui.scoreboard.scoreboard = (<ScoreboardUpdateMessage> message).entries;
  }
}
