import { ScoreboardEntry } from '@orbitweb/common';
import { Inventory } from '@orbitweb/common';

export class Scoreboard {
  public scoreboard: ScoreboardEntry[] = [];

  public addKill(name: string) {
    let score = this.scoreboard.find((sb) => sb.name === name);

    if (score === undefined) {
      score = new ScoreboardEntry(name, 0);
      this.scoreboard.push(score);
    }

    score.kills++;
  }

  public depositLoot(name: string, loot: Inventory[]) {
    let score = this.scoreboard.find((sb) => sb.name === name);

    if (score === undefined) {
      score = new ScoreboardEntry(name, 0);
      this.scoreboard.push(score);
    }

    loot.forEach((l) => {
      score.kills += l.amount;
    });
  }
}
