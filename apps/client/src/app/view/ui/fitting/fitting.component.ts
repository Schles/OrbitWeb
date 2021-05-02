import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../../service/game.service";
import {ShipFitting} from "@orbitweb/common";
import {ShipEquipment} from "@orbitweb/common";
import {FormControl, FormGroup} from "@angular/forms";
import {Events} from "@orbitweb/renderer";
import {PlayerService} from "../../../service/player.service";
import {EquipmentSlotComponent} from "./equipment-slot/equipment-slot.component";

@Component({
  selector: 'app-fitting',
  templateUrl: './fitting.component.html',
  styleUrls: ['./fitting.component.scss']
})
export class FittingComponent implements OnInit, AfterViewInit {

  @ViewChild(EquipmentSlotComponent) fittingComponent: EquipmentSlotComponent;

  public get database(): ShipEquipment[] {
    return this.gameService.fittingDB.db;
  }


  public myForm;

  public loginEnabled: boolean = true;




  constructor(private gameService: GameService, private playerService: PlayerService) {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      customEq: new FormControl(false)
    });

  }

  ngAfterViewInit(): void {
    //this.myForm.controls.customEq.setValue(true);
  }



  ngOnInit() {
    Events.loginPlayer.subscribe ( (val, b) => {
      if (val.name === this.gameService.app().username) {
        this.loginEnabled = false;
      }
    })

    Events.onPlayerKilled.subscribe( (name: string) => {
      if (undefined === this.gameService.app().username)
        this.loginEnabled = true;
    })

  }

  public isValid() {

    if ( this.fittingComponent === undefined )
      return true;

    return this.myForm.value.customEq ? this.fittingComponent.isValid() : true;
  }

  public toggleCustomFit() {

    this.myForm.controls.customEq.setValue(!this.myForm.controls.customEq.value);
  }

  public get isCustomFit() {
    return this.myForm.value.customEq;
  }

  public spawn() {    
    const shipFitting: ShipFitting = new ShipFitting();

    if ( this.myForm.value.customEq) {
      shipFitting.fitting = this.fittingComponent.getFitting();
    } else {
      shipFitting.fitting = this.gameService.fittingDB.getSet("default");
    }    

    this.playerService.login(this.myForm.value.name, shipFitting);
  }

  public getColor(): string {
    const c = '#'+Math.random().toString(16).substr(2,6);
    return c;
  }



}
