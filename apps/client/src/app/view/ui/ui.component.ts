import { Component, OnInit, ViewChild } from '@angular/core';

import { HeadsupComponent } from './headsup/headsup.component';
import { FittingComponent } from './fitting/fitting.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

import { GameService } from '../../service/game.service';
import { PlayerService } from '../../service/player.service';
import { SpaceshipGO } from '@orbitweb/game-objects';
import { Vector2 } from '@orbitweb/common';
import { EventLogMessage } from '../../../../../../libs/common/src/lib/message/game/player/EventLogMessage';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit {
  @ViewChild(HeadsupComponent) public headsUp: HeadsupComponent;
  @ViewChild(FittingComponent) public fitting: FittingComponent;
  @ViewChild(ScoreboardComponent, { static: true })
  public scoreboard: ScoreboardComponent;

  public showCustom: boolean = true;

  public loginEnabled: boolean = false;

  public displayEvents = [];

  constructor(
    private gameService: GameService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {

    this.gameService.app().networkManager.onMessage.subscribe((msg: EventLogMessage<any>) => {
      if (msg.type === 'eventLogMessage') {
        //console.log()
      }
    });
  }

  public get players(): SpaceshipGO[] {
    return this.gameService.app().players as SpaceshipGO[];
  }

  public toGlobal(position: Vector2) {
    return this.gameService.app().renderer.foregroundStage.toGlobal(position);
  }



  /*
  public addKill(name: string) {
    let scorer: ScoreboardEntry = this.scoreboard.scoreboard.find((value: ScoreboardEntry) => value.name === name);

    if ( scorer === undefined){
      const newScorer = {
        id: name,
        count: 0
      };
      this.scoreboard.push(newScorer);
    }

    scorer = this.scoreboard.scoreboard.find(value => value.name === name);

    scorer.count++;
  }
*/

  public toggleCustom() {
    this.showCustom = !this.showCustom;
  }
}
