import {Component, Input, OnInit} from '@angular/core';
import {ScoreboardEntry} from "../../../../../../shared/src/model/ScoreboardEntry";

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


  constructor() { }

  ngOnInit() {
  }

}
