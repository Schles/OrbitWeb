import { Client, MessageRecieved, GameManager, ScoreboardUpdateMessage } from '@orbitweb/common';

@Client("EVENT", "scoreboardUpdateMessage")
export class ClientScoreboardUpdateMessage extends MessageRecieved<ScoreboardUpdateMessage> {
  constructor(message: ScoreboardUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    //this.ui.scoreboard.scoreboard = (<ScoreboardUpdateMessage> events).entries;
  }
}
