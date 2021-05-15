import { Client, MessageRecieved, GameManager, ScoreboardUpdateMessage } from '@orbitweb/common';
import { ClientMessageRecieved } from '../../model/ClientMessageRecieved';

@Client("EVENT", "scoreboardUpdateMessage")
export class ClientScoreboardUpdateMessage extends ClientMessageRecieved<ScoreboardUpdateMessage> {
  constructor(message: ScoreboardUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    //this.ui.scoreboard.scoreboard = (<ScoreboardUpdateMessage> events).entries;
  }
}
