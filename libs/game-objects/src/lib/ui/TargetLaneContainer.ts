import { AssetManager, CGame, CMath, Spaceship, Vector2 } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';
import { OrbitWeb } from '@orbitweb/game-objects';

export class TargetLaneContainer extends Container {
  private laneGraphics: Graphics;

  private crossHairRadius = 300.0;
  public crossHairColor = 0xff0000;
  private crossHairAlpha = 0.4;

  private _targetOrbit: number;

  constructor(color, public center: Vector2, public radius, public bandWidth) {
    super();
    this.crossHairColor = color;
    this.laneGraphics = new Graphics();


    this.draw();

    this.addChild(this.laneGraphics);

  }




  private draw() {
    this.laneGraphics.clear();

    this.laneGraphics.lineStyle(this.bandWidth, this.crossHairColor, this.crossHairAlpha);
    this.laneGraphics.drawCircle(this.center.x, this.center.y, this.radius);

    this.laneGraphics.endFill();
  }

  public iterate(delta: number) {
    this.alpha = CGame.clamp(this.alpha - delta, 0 ,1);
  /*  if (this.source) {
      const len = CMath.len(this.source.position);

      const delta = Math.abs(this._targetOrbit - len);

      let alpha = delta / 30;

      if (delta < 10) {
        alpha = delta / 100;
      }

      this.alpha = CGame.clamp(alpha, 0.1,0.3);
    }

   */
  }


}
