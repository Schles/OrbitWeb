import { Injectable, NgZone } from '@angular/core';
import { OrbitWeb } from '@orbitweb/game-objects';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private application: OrbitWeb;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.application = new OrbitWeb({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
      });
    });
  }

  public app(): OrbitWeb {
    return this.application;
  }
}
