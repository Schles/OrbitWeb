import { AssetManager, CGame, CMath, Spaceship } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';

export class TargetOrbitContainer extends Container {
  private source: Spaceship;
  private target: Spaceship;

  private crossHair: Graphics;

  private crossHairRadius = 300.0;
  public crossHairColor = 0xff0000;
  private crossHairAlpha = 0.4;

  private _targetOrbit: number;

  public set targetOrbit(val: number) {
    this._targetOrbit = CGame.clamp(
      val,
      AssetManager.config.world.minRadius,
      AssetManager.config.world.maxRadius
    );
    this.draw(this._targetOrbit);
  }

  constructor(color) {
    super();
    this.crossHairColor = color;
    this.crossHair = new Graphics();
    this.alpha = 0;
    const width = 5;

    const length = 10;

    this.draw(300);

    this.crossHair.visible = true;

    this.addChild(this.crossHair);
  }

  private draw(radius: number) {
    this.crossHair.clear();
    this.crossHair.lineStyle(2, this.crossHairColor, this.crossHairAlpha);
    this.crossHair.drawCircle(0, 0, radius);
    this.crossHair.endFill();
  }

  public setSource(spaceship: Spaceship) {
    this.source = spaceship;

    if (spaceship) this.crossHairColor = string2hex(spaceship.color);
  }

  public iterate(delta: number) {
    if (this.source) {
      const len = CMath.len(this.source.position);

      const delta = Math.abs(this._targetOrbit - len);

      let alpha = delta / 30;

      if (delta < 10) {
        alpha = delta / 100;
      }

      this.alpha = alpha;
    }
    /*
    if (this.source !== undefined) {
      if (this.source.targetPlayer !== undefined) {
        this.crossHair.visible = true;
        this.crossHair.x = this.source.targetPlayer.position.x;
        this.crossHair.y = this.source.targetPlayer.position.y;
      } else {
        this.crossHair.visible = false;
      }
    } else {
      this.crossHair.visible = false;
    }
    */
  }
}
