import {Component, Input, OnInit} from '@angular/core';
import {ScoreboardEntry} from "../../../../../../shared/src/model/ScoreboardEntry";
import {GameService} from "../../../service/game.service";
import {ScoreboardUpdateMessage} from "../../../../../../shared/src/message/game/ScoreboardUpdateMessage";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  public _scoreboard: ScoreboardEntry[];


  @Input() public set scoreboard( val: ScoreboardEntry[]) {
    this._scoreboard = val.sort ( (a, b) => {
      return b.kills - a.kills;
    });
  }

  public get scoreboard(): ScoreboardEntry[] {
    return this._scoreboard;
  }


  constructor(private gameService: GameService) {
    this.gameService.onMessage.subscribe( (msg) => {
      if ( msg.type === "scoreboardUpdateMessage") {
        this.scoreboard = (<ScoreboardUpdateMessage> msg).entries;
      }
    })
  }

  ngOnInit() {
  }

}
