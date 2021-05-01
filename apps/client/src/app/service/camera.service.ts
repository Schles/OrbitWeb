import {Injectable} from '@angular/core';
import {Vector2} from "@orbitweb/common";

import {Camera, Events} from "@orbitweb/renderer";
import {ShipFitting} from "@orbitweb/common";
import {Spaceship} from "@orbitweb/common";
import {PlayerLoginMessage} from "@orbitweb/common";
import {Input} from "../game/core/Input";
import {GameService} from "./game.service";
import { PlayerService } from './player.service';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private userName: string;

  public input: Input;

public camera: Camera;

  constructor(private gameService: GameService,    
              private playerService: PlayerService) {

            
  }

  public init() {

            
    this.camera = this.gameService.app().depCamera;
    this.camera.setSize(this.gameService.app().renderer.width, this.gameService.app().renderer.height);


    this.gameService.app().OnResizeWindow.subscribe( (size) => {
      console.error(" got it", size);
      this.camera.setSize(size.x, size.y);
    });


    this.gameService.app().ticker.add ( (delta) => {
      const dT = this.gameService.app().ticker.elapsedMS / 1000;

      let me;
      let mePosition;
      if (this.playerService.getUserName() !== undefined) {
        me = this.gameService.app().players.find((p) => p.id === this.playerService.getUserName());
        if (me !== undefined)
          mePosition = me.position;
      }

      this.camera.iterate(this.gameService.app().players.map( (v) => v.position), mePosition, dT);
    });
  }
}
