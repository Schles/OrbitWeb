import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../service/game.service";
import {ShipFitting} from "../../../../../../shared/src/model/ShipFitting";
import {ShipEquipment} from "../../../../../../shared/src/model/ShipEquipment";
import {FormControl, FormGroup} from "@angular/forms";
import {Spaceship} from "../../../../../../shared/src/model/Spaceship";
import {Game} from "../../../game/Game";
import {PlayerLoginMessage} from "../../../../../../shared/src/message/login/PlayerLoginMessage";

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

  constructor(private gameService: GameService) {
    this.myForm = new FormGroup({});
    this.nameControl = new FormControl();
  }



  ngOnInit() {
    this.equipmentSlots = new Array(5);

    Game.loginPlayer.subscribe( (value: { name: string, fitting: ShipFitting, spaceship?: Spaceship}) => {
      //this.ownPlayer = value;

      console.log(value);

      this.gameService.login(value.name);

      this.gameService.send(new PlayerLoginMessage(value.name, value.fitting));

      /*
        this.renderer.pApp.spawnPlayer(this.ownPlayer);

      this.ownPlayer.iterateGraphics();

      const msg: PlayerJoinedMessage = this.ownPlayer.getPlayerJoinedMessage();
      this.socketService.send(msg);
*/
      //this.ui.loginEnabled = false;
    });

    if ( this.gameService.DEBUG) {
      const shipFitting = new ShipFitting();
      shipFitting.fitting = this.gameService.fittingDB.getSet("default");

      Game.loginPlayer.emit( {
        name: "Schles",
        fitting: shipFitting
      });
    }
  }

  public spawn() {
      const name = this.nameControl.value;
      const shipFitting: ShipFitting = new ShipFitting();
      for (let i = 0; i < this.equipmentSlots.length; i++) {
        const slot = this.equipmentSlots[i];
        console.log(i);
        if ( this.equipmentSlots[i] !== undefined) {
          shipFitting.fitting.push(this.equipmentSlots[i]);
        } else {
          console.log("bin leer", this.emptySlot);
          shipFitting.fitting.push(this.emptySlot);
        }

        console.log(JSON.parse(JSON.stringify(shipFitting.fitting)));
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
