import {Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {RendererComponent} from "../renderer/renderer.component";
import {Spaceship} from "../../game/Spaceship";
import {FormControl} from "@angular/forms";
import {SpaceshipFactory} from "../../game/SpaceshipFactory";

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {


  @Input() public speedUI: number = 1;
  @Input() public distanceUI: string;
  @Input() public orbitUI: number = 1;
  @Input() public cooldownUI: number = 1;
  @Input() public targetHPUI: number = 0;

  @Output() public spawnPlayer: EventEmitter<Spaceship> = new EventEmitter<Spaceship>();

  public nameControl: FormControl;

  public loginEnabled: boolean = false;

  public scoreboard: {id: string, count: number}[] = [];

  constructor() {
    this.nameControl = new FormControl();

  }

  ngOnInit() {
  }

  public test(){

  }

  public spawnType(type: string) {
    const name = this.nameControl.value;

    const c = this.getColor();

    const spaceship: Spaceship = SpaceshipFactory.create(name, type, c);

    this.spawnPlayer.emit(spaceship);
  }

  public getColor(): string {
    const c = '#'+Math.random().toString(16).substr(2,6);
    return c;
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

}
