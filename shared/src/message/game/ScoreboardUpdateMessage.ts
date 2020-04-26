import {ScoreboardEntry} from "../../model/ScoreboardEntry";
import {Message} from "../Message";

export class ScoreboardUpdateMessage extends Message {
  constructor(public entries: ScoreboardEntry[]) {
    super();
    this.type = "scoreboardUpdateMessage";
  }
}
