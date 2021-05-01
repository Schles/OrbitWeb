import {Injectable, NgZone} from '@angular/core';
import {FittingDB} from "../game/FittingDB";
import {SpaceshipGO} from "@orbitweb/game-objects";
import {ProjectileGO} from "@orbitweb/game-objects";
import {StructureGO} from "@orbitweb/game-objects";

import { GameManager } from '@orbitweb/game-objects';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private application: GameManager;

  public fittingDB: FittingDB;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.application = new GameManager({ width: window.innerWidth, height: window.innerHeight, antialias: true,  }); // this creates our pixi application
    });

    this.fittingDB = new FittingDB(); 
  }

  public app() {
    return this.application;
  }



  public clear() {
    const players: SpaceshipGO[] = this.app().players.map ( p => p);

    players.forEach( (p) => {
      this.app().killPlayer(p);
    });

    const projectiles: ProjectileGO[] = this.app().projectiles.map (p => p);

    projectiles.forEach( (p) => {
      this.app().destroyProjectile(p);
    });

    const structures: StructureGO[] = this.app().structures.map (p => p);

    structures.forEach( (structureGO) => {
      this.app().gameStage.removeChild(structureGO.gameObject);

      const p = this.app().structures.findIndex(value => value.id === structureGO.id);
      if (p !== undefined) {
        structureGO.onDestroy();
        this.app().structures.splice(p, 1);
      }
    });

  }

}
