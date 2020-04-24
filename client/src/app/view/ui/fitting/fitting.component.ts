import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../service/game.service";
import {ShipFitting} from "../../../../../../shared/src/model/ShipFitting";
import {ShipEquipment} from "../../../../../../shared/src/model/ShipEquipment";
import {FormControl} from "@angular/forms";
import {SpaceshipFactory} from "../../../game/SpaceshipFactory";
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

  constructor(private gameService: GameService) {
    this.nameControl = new FormControl();
  }



  ngOnInit() {
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
      const shipFitting: ShipFitting = new ShipFitting();
      let eq: ShipEquipment = new ShipEquipment();
      eq.name = "Repair";
      eq.cpuCost = 10;
      eq.powerCost = 20;
      eq.action = {
        targetSelf: true
      }
      shipFitting.fitting.push(eq);


      eq = new ShipEquipment();
      eq.name = "Webber";
      eq.cpuCost = 100;
      eq.powerCost = 200;
      eq.action = {
        targetEnemy: true
      };
      shipFitting.fitting.push(eq);

      Game.loginPlayer.emit( {
        name: "Schles",
        fitting: shipFitting
      });
    }
  }

  public spawn() {
      const name = this.nameControl.value;
      const shipFitting: ShipFitting = new ShipFitting();

      let eq: ShipEquipment = new ShipEquipment();
      eq.name = "Repair";
      eq.cpuCost = 10;
      eq.powerCost = 20;
      eq.action = {
        targetSelf: true
      }
      shipFitting.fitting.push(eq);


    eq = new ShipEquipment();
    eq.name = "Webber";
    eq.cpuCost = 100;
    eq.powerCost = 200;
    eq.action = {
      targetEnemy: true
    };
    shipFitting.fitting.push(eq);


      Game.loginPlayer.emit({
        name: name,
        fitting: shipFitting
      });
  }

  public getColor(): string {
    const c = '#'+Math.random().toString(16).substr(2,6);
    return c;
  }

}
