import { Injectable, NgZone } from '@angular/core';
import { FittingDB } from '../game/FittingDB';
import { OrbitWeb } from '@orbitweb/game-objects';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private application: OrbitWeb;

  public fittingDB: FittingDB;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.application = new OrbitWeb({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
      }); // this creates our pixi application
    });

    this.fittingDB = new FittingDB();
  }

  public app(): OrbitWeb {
    return this.application;
  }
}
