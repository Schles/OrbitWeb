import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';

import {HeadsupComponent} from "./headsup/headsup.component";
import {FittingComponent} from "./fitting/fitting.component";
import {ScoreboardComponent} from "./scoreboard/scoreboard.component";
import {ScoreboardEntry} from "../../../../../shared/src/model/ScoreboardEntry";
import {Message} from "../../../../../shared/src/message/Message";
import {PlayerLoginMessage} from "../../../../../shared/src/message/login/PlayerLoginMessage";
import {GameService} from "../../service/game.service";
import {PlayerService} from "../../service/player.service";
import {PlayerKilledMessage} from "../../../../../shared/src/message/game/player/PlayerKilledMessage";

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {


  @ViewChild(HeadsupComponent, {static: false}) public headsUp: HeadsupComponent;
  @ViewChild(FittingComponent, {static: false}) public renderer: FittingComponent;
  @ViewChild(ScoreboardComponent, {static: true}) public scoreboard: ScoreboardComponent;



  public showCustom: boolean = true;





  public loginEnabled: boolean = false;


  constructor(private gameService: GameService, private playerService: PlayerService) {
    this.gameService.onMessage.subscribe( (msg: Message) => {
      switch (msg.type) {
        case "playerJoinedMessage":
          if ((<PlayerLoginMessage>msg).source === this.playerService.getUserName()) {
            this.loginEnabled = false;
          }
          break;
        case "playerKilledMessage":
          if (this.playerService.getUserName() === undefined) {
            this.loginEnabled = true;
          }
          break;
      }
    });

  }

  ngOnInit() {

  }

  public test(){

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
