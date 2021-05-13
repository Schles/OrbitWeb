import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../../service/game.service';
import { AssetManager, ShipFitting } from '@orbitweb/common';
import { ShipEquipment } from '@orbitweb/common';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayerService } from '../../../service/player.service';
import { EquipmentSlotComponent } from './equipment-slot/equipment-slot.component';

@Component({
  selector: 'app-fitting',
  templateUrl: './fitting.component.html',
  styleUrls: ['./fitting.component.scss'],
})
export class FittingComponent implements OnInit, AfterViewInit {
  @ViewChild(EquipmentSlotComponent) fittingComponent: EquipmentSlotComponent;

  public myForm;

  public loginEnabled: boolean = true;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService
  ) {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      customEq: new FormControl(true),
    });
  }

  ngAfterViewInit(): void {
    //this.myForm.controls.customEq.setValue(true);
  }

  ngOnInit() {
    this.gameService
      .app()
      .eventManager.on('UI_PLAYER_LOGIN')
      .subscribe((value) => {
        if (value.name === this.gameService.app().username) {
          this.loginEnabled = false;
        }
      });

    this.gameService
      .app()
      .eventManager.on('UI_PLAYER_KILLED')
      .subscribe((name: string) => {
        if (undefined === this.gameService.app().username)
          this.loginEnabled = true;
      });
  }

  public isValid() {
    if (this.fittingComponent === undefined) return true;

    return this.myForm.value.customEq ? this.fittingComponent.isValid() : true;
  }

  public toggleCustomFit() {
    this.myForm.controls.customEq.setValue(
      !this.myForm.controls.customEq.value
    );
  }

  public get isCustomFit() {
    return this.myForm.value.customEq;
  }

  public spawn() {
    const shipFitting: ShipFitting = new ShipFitting();

    if (this.myForm.value.customEq) {
      shipFitting.fitting = this.fittingComponent.getFitting();
    } else {
      shipFitting.fitting = AssetManager.getDefaultFitting();
    }

    this.gameService
      .app()
      .networkManager.login(this.myForm.value.name, shipFitting);
  }

  public getColor(): string {
    const c = '#' + Math.random().toString(16).substr(2, 6);
    return c;
  }
}
