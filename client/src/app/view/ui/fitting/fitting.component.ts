import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../../service/game.service";
import {ShipFitting} from "../../../../../../shared/src/model/ShipFitting";
import {ShipEquipment} from "../../../../../../shared/src/model/ShipEquipment";
import {FormControl, FormGroup} from "@angular/forms";
import {Events} from "../../../game/Events";
import {PlayerService} from "../../../service/player.service";
import {EquipmentSlotComponent} from "./equipment-slot/equipment-slot.component";
import {Message} from "../../../../../../shared/src/message/Message";
import {PlayerLoginMessage} from "../../../../../../shared/src/message/login/PlayerLoginMessage";

@Component({
  selector: 'app-fitting',
  templateUrl: './fitting.component.html',
  styleUrls: ['./fitting.component.scss']
})
export class FittingComponent implements OnInit, AfterViewInit {

  @ViewChild(EquipmentSlotComponent, {static: false}) fittingComponent: EquipmentSlotComponent;

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

    console.log(this.myForm.value);
    const shipFitting: ShipFitting = new ShipFitting();
    if ( this.myForm.value.customEq) {
      shipFitting.fitting = this.fittingComponent.getFitting();
    } else {
      console.log("spawn default");
      shipFitting.fitting = this.gameService.fittingDB.getSet("default");
    }

    console.log(shipFitting.fitting);



    Events.loginPlayer.emit({
      name: this.myForm.value.name,
      fitting: shipFitting,
    });

  }

  public getColor(): string {
    const c = '#'+Math.random().toString(16).substr(2,6);
    return c;
  }



}
