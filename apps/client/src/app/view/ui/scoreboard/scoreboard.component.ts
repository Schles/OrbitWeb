import { Component, Input, OnInit } from '@angular/core';
import { ScoreboardEntry } from '@orbitweb/common';
import { ScoreboardUpdateMessage } from '@orbitweb/common';
import { GameService } from '../../../service/game.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  public _scoreboard: ScoreboardEntry[];

  @Input() public set scoreboard(val: ScoreboardEntry[]) {
    this._scoreboard = val.sort((a, b) => {
      return b.kills - a.kills;
    });
  }

  public get scoreboard(): ScoreboardEntry[] {
    return this._scoreboard;
  }

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.app().networkManager.onMessage.subscribe((msg) => {
      if (msg.type === 'scoreboardUpdateMessage') {
        this.scoreboard = (<ScoreboardUpdateMessage>msg).entries;
      }
    });
  }
}
