import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../service/game.service';
import { EventLogMessage } from '../../../../../../../libs/common/src/lib/message/game/player/EventLogMessage';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  public eventLog: EventLogMessage<any>[] = [];


  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.app().networkManager.onMessage.subscribe((msg: EventLogMessage<any>) => {
      if (msg.type === 'eventLogMessage') {
        this.eventLog.unshift(msg);
      }
    });
  }
}
