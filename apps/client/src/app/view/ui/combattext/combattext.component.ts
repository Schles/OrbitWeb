import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { SpaceshipGO } from '@orbitweb/game-objects';
import { Vector2 } from '@orbitweb/common';

@Component({
  selector: 'app-nameplate',
  templateUrl: './combattext.component.html',
  styleUrls: ['./combattext.component.scss'],
})
export class CombattextComponent implements OnInit {

  @Input() public spaceship: SpaceshipGO;
  @Input() public globalPosition: Vector2;


  @HostBinding("style.top") get y() { return this.globalPosition.y + "px"; }
  @HostBinding("style.left") get x() { return this.globalPosition.x + "px"; }

  constructor(
  ) {}

  ngOnInit() {

  }



}
