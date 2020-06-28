import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../service/game.service";
import {ShipFitting} from "../../../../../../shared/src/model/ShipFitting";
import {ShipEquipment} from "../../../../../../shared/src/model/ShipEquipment";
import {FormControl, FormGroup} from "@angular/forms";
import {Spaceship} from "../../../../../../shared/src/model/Spaceship";
import {Game} from "../../../game/Game";
import {PlayerLoginMessage} from "../../../../../../shared/src/message/login/PlayerLoginMessage";
import {PlayerService} from "../../../service/player.service";

@Component({
  selector: 'app-fitting',
  templateUrl: './fitting.component.html',
  styleUrls: ['./fitting.component.scss']
})
export class FittingComponent implements OnInit {

  public nameControl: FormControl;

  public get database(): ShipEquipment[] {
    return this.gameService.fittingDB.db;
  }

  public equipmentSlots: ShipEquipment[] = [];

  public emptySlot: ShipEquipment = new ShipEquipment("Empty", 0, 0, 0, 0, true, {});

  public equipmentCPUCost: number = 0;
  public equipmentCPUCapacity: number = 200;

  public myForm;

  constructor(private gameService: GameService, private playerService: PlayerService) {
    this.myForm = new FormGroup({});
    this.nameControl = new FormControl();



    if ( this.gameService.DEBUG) {
      const shipFitting = new ShipFitting();
      shipFitting.fitting = this.gameService.fittingDB.getSet("default");

      Game.loginPlayer.emit( {
        name: "Enemy",
        fitting: shipFitting
      });
    }

  }



  ngOnInit() {
    this.equipmentSlots = new Array(5);

    document.addEventListener('keyup',  (event) => {
      if ( event.shiftKey === true && event.code === "Enter") {
        if( this.playerService.getUserName() === undefined)
          this.spawn();
      }
    });


  }

  public getCPUP() {
    const p = this.equipmentCPUCost * 100 / this.equipmentCPUCapacity;

    return p <= 100 ? p : 100;
}

  public spawn() {
      const name = this.nameControl.value;
      const shipFitting: ShipFitting = new ShipFitting();
      for (let i = 0; i < this.equipmentSlots.length; i++) {
        const slot = this.equipmentSlots[i];
        if ( this.equipmentSlots[i] !== undefined) {
          shipFitting.fitting.push(this.equipmentSlots[i]);
        } else {
          shipFitting.fitting.push(this.emptySlot);
        }
      }


    Game.loginPlayer.emit({
        name: name,
        fitting: shipFitting
    });


  }

  public spawnDefault() {
    const name = this.nameControl.value;
    const shipFitting = new ShipFitting();
    shipFitting.fitting = this.gameService.fittingDB.getSet("default");

    Game.loginPlayer.emit( {
      name: name,
      fitting: shipFitting
    });
  }

  public getColor(): string {
    const c = '#'+Math.random().toString(16).substr(2,6);
    return c;
  }

  public dragging: ShipEquipment;

  public dragStart(event: DragEvent, item: ShipEquipment){
    console.log("start");
    this.dragging = item;
  };

  public dragEnd(event: DragEvent, item: ShipEquipment){
    console.log("abort");
    this.dragging = undefined;
    this.updatePowerCost();
  };

  public drop(event, i: number) {
    this.equipmentSlots[i] = this.dragging;
    console.log(i, event);
  }

  public dragOver(event: DragEvent ){
    if(this.dragging){
      event.preventDefault();
    }
  };

  public updatePowerCost(){
    this.equipmentCPUCost = this.equipmentSlots.reduce( (acc, cur) => {
      if( ! (cur === undefined ||cur === null))
        acc += cur.cpuCost;

        return acc;
    }, 0);

  }

}
