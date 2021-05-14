import { Component, OnInit, ViewChild } from '@angular/core';

import { HeadsupComponent } from './headsup/headsup.component';
import { FittingComponent } from './fitting/fitting.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

import { GameService } from '../../service/game.service';
import { PlayerService } from '../../service/player.service';
import { SpaceshipGO } from '@orbitweb/game-objects';
import { CGame, Vector2 } from '@orbitweb/common';
import {
  EventLogMessage,
  EventLogType
} from '../../../../../../libs/common/src/lib/message/game/player/EventLogMessage';
import { EquipmentSlotComponent } from './fitting/equipment-slot/equipment-slot.component';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit {
  @ViewChild(HeadsupComponent) public headsUp: HeadsupComponent;
  @ViewChild(FittingComponent) public fitting: FittingComponent;

  @ViewChild(EquipmentSlotComponent) fittingComponent: EquipmentSlotComponent;

  @ViewChild(ScoreboardComponent, { static: true })
  public scoreboard: ScoreboardComponent;

  public showCustom: boolean = true;

  public loginEnabled: boolean = false;

  public displayEvents = [];

  constructor(
    private gameService: GameService,
    private playerService: PlayerService
  ) {}

  public combatText: { position: Vector2, value: number, damage: boolean, timeToLife: number}[] = [];

  public currentCombatTextIndex: number = 0;

  ngOnInit() {

    for (let i = 0; i < 20; i++) {
      this.combatText.push( {
        value: 0,
        damage: true,
        position: {x: 0, y: 0},
        timeToLife: 0,
      })
    }



    this.gameService.app().networkManager.onMessage.subscribe((msg: EventLogMessage<any>) => {
      if (msg.type === 'eventLogMessage') {


        if ( msg.logType === "PLAYER_DAMAGE_TAKEN") {

          const target = this.gameService.app().players.find((p) => p.id === msg.message.target);

          if ( target && target.position) {

            this.combatText[this.currentCombatTextIndex].position = this.gameService.app().toGlobal(target.position);
            this.combatText[this.currentCombatTextIndex].value = msg.message.damageTaken;
            this.combatText[this.currentCombatTextIndex].timeToLife = 2;
            this.currentCombatTextIndex = (this.currentCombatTextIndex + 1) % this.combatText.length;

          }


        }

      }
    });


    this.gameService.app().renderer.ticker.add( (delta) => {
      const dT = this.gameService.app().renderer.ticker.elapsedMS / 1000;

      this.combatText.forEach( (cT) => {
        cT.timeToLife = CGame.clamp(cT.timeToLife - dT, 0, 100);
      });

    })
  }

  public combatTextAlpha(timeToLife: number): number {
    return 0.3;
  }

  public get mePlayer(): SpaceshipGO {
    return this.gameService.app().playerLocal;
  }

  private nameplateColor(player: SpaceshipGO): string {

    if ( !this.mePlayer )
      return undefined;

    if (this.mePlayer.id === player.id )
      return this.mePlayer.color;

    if ( this.mePlayer.targetPlayer && this.mePlayer.targetPlayer.id === player.id)
      return "red";

    return undefined;
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
