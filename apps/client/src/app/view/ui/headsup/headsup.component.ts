import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../service/game.service';
import { CGame, CMath } from '@orbitweb/common';
import { SpaceshipGO } from '@orbitweb/game-objects';
import { PlayerSelfKillMessage } from '@orbitweb/common';
import { ShipEquipment } from '@orbitweb/common';
import { PlayerService } from '../../../service/player.service';
import { InputService } from '../../../service/input.service';
import { NetworkService } from '../../../service/network.service';

@Component({
  selector: 'app-headsup',
  templateUrl: './headsup.component.html',
  styleUrls: ['./headsup.component.scss'],
})
export class HeadsupComponent implements OnInit {
  @Input() public speedUI: number = 1;
  @Input() public speedInputUI: number = 1;
  @Input() public distanceUI: string;
  @Input() public orbitUI: number = 1;
  @Input() public cooldownUI: number = 1;
  @Input() public targetHPUI: number = 0;
  public powerUI: number = 100;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private inputService: InputService,
    private networkService: NetworkService
  ) {}

  ngOnInit() {
    this.gameService.app().renderer.ticker.add((delta) => {
      const dT = this.gameService.app().renderer.ticker.elapsedMS / 1000;
      this.iterate(dT);
    });
  }

  public mePlayer() {
    return this.gameService.app().playerLocal;
  }

  public onClick(index) {
    const a = this.mePlayer() as SpaceshipGO;
    console.log(index);
    this.inputService.keyPressed(index + 1);
  }

  public iterate(delta: number) {
    const ownPlayer = this.gameService.app().playerLocal;
    if (ownPlayer === undefined) {
      return;
    }



    const v = CMath.len(ownPlayer.speed);
    this.speedUI = Number.parseInt(v.toFixed(0));
    this.powerUI = Number.parseInt(ownPlayer.power.toFixed(0));
  }

  public getCDP(fit: ShipEquipment) {
    const r = (fit.remainingTime * 100) / fit.cooldownTime;

    return r;
  }

  public getEnergy() {
    const player = this.getPlayer();
    if (player === undefined) return 0;

    return player.power.toFixed(0);
  }

  public getEnergyP() {
    const player = this.getPlayer();
    if (player === undefined) return 0;

    return (player.power * 100) / player.energyCapacity;
  }

  public getSpeed() {
    const player = this.getPlayer();

    if (player === undefined) return 0;

    return CMath.len(player.speed).toFixed(0);
  }

  public getSpeedP() {
    const player = this.getPlayer();

    if (player === undefined) return 0;

    const speed = CMath.len(player.speed);
    return (speed * 100) / 51;
  }

  public getPlayer(): SpaceshipGO {
    return this.gameService.app().playerLocal;
  }

  public selfKill() {
    console.log('kill');
    this.gameService.app().inputManager.onSelfkill();
  }

  public progress(fit: ShipEquipment): number {

    const percentage = (value: number, max: number): number => {
      if ( max === 0)
        return 1;

      return value / max;

    }


    let res = 0;

    if ( fit.state.active === true) {
      res = 1 - percentage(fit.remainingTime, fit.castTime);
    } else if ( fit.state.cooldown === true ) {
      res = percentage(fit.remainingTime, fit.cooldownTime);
    }

    return CGame.clamp(res, 0, 1);
  }
}
