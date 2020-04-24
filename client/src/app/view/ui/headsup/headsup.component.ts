import {Component, Input, OnInit} from '@angular/core';
import {GameService} from "../../../service/game.service";

@Component({
  selector: 'app-headsup',
  templateUrl: './headsup.component.html',
  styleUrls: ['./headsup.component.scss']
})
export class HeadsupComponent implements OnInit {


  @Input() public speedUI: number = 1;
  @Input() public speedInputUI: number = 1;
  @Input() public distanceUI: string;
  @Input() public orbitUI: number = 1;
  @Input() public cooldownUI: number = 1;
  @Input() public targetHPUI: number = 0;


  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.app().ticker.add( (delta) => {
      const dT = this.gameService.app().ticker.elapsedMS / 1000;
    })
  }

}
