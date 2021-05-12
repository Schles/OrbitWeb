import { Client, ScoreboardUpdateMessage } from '@orbitweb/common';
import { ClientMessageRecieved, GameManagerClient } from '@orbitweb/game-objects';

@Client("EVENT", "scoreboardUpdateMessage")
export class ClientScoreboardUpdateMessage extends ClientMessageRecieved<ScoreboardUpdateMessage> {
  constructor(message: ScoreboardUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    //this.ui.scoreboard.scoreboard = (<ScoreboardUpdateMessage> events).entries;
  }
}
