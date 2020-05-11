import {ScoreboardEntry} from "../../../shared/src/model/ScoreboardEntry";
import {Inventory} from "../../../shared/src/model/Inventory";

export class Scoreboard {
  public scoreboard: ScoreboardEntry[] = [];

  public addKill(name: string) {
    let score = this.scoreboard.find ( (sb) => sb.name === name);

    if ( score === undefined) {
        score = new ScoreboardEntry(name, 0);
        this.scoreboard.push(score);
    }

    score.kills++;
  }

  public depositLoot(name: string, loot: Inventory[]) {

    let score = this.scoreboard.find ( (sb) => sb.name === name);

    if ( score === undefined) {
      score = new ScoreboardEntry(name, 0);
      this.scoreboard.push(score);
    }

    loot.forEach( (l) => {
      score.kills += l.amount;
    })




  }
}
