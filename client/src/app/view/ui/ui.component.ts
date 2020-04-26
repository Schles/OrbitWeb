import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';

import {HeadsupComponent} from "./headsup/headsup.component";
import {FittingComponent} from "./fitting/fitting.component";
import {ScoreboardComponent} from "./scoreboard/scoreboard.component";

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {


  @ViewChild('headsUp') public headsUp: HeadsupComponent;
  @ViewChild('fitting') public renderer: FittingComponent;
  @ViewChild('scoreboard') public scoreboard: ScoreboardComponent;



  public showCustom: boolean = true;





  public loginEnabled: boolean = false;

  public scoreboard: {id: string, count: number}[] = [];

  constructor() {


  }

  ngOnInit() {

  }

  public test(){

  }


  public addKill(name: string) {
    let scorer = this.scoreboard.find(value => value.id === name);

    if ( scorer === undefined){
      const newScorer = {
        id: name,
        count: 0
      };
      this.scoreboard.push(newScorer);
    }

    scorer = this.scoreboard.find(value => value.id === name);

    scorer.count++;
  }



  public toggleCustom() {
    this.showCustom = !this.showCustom;
  }

}
