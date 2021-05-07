import { Spaceship } from "@orbitweb/common";
import { Container, Graphics } from "pixi.js";


export class TargetingLayer extends Container {

  private source: Spaceship;
  private target: Spaceship;

  private crossHair: Graphics;

  private crossHairRadius = 30.0;
  public crossHairColor = 0xFF0000;
  private crossHairAlpha = 0.4;

  constructor(color) {
    super();
    this.crossHairColor = color;
    this.crossHair = new Graphics();

    const width = 5;

    const length = 10;

    this.crossHair.lineStyle(width, this.crossHairColor, this.crossHairAlpha);
    this.crossHair.drawCircle(0, 0, this.crossHairRadius);
    this.crossHair.endFill();

    this.crossHair.beginFill(this.crossHairColor, this.crossHairAlpha);
    this.crossHair.drawRect(this.crossHairRadius, -1 * width / 2, length, width);
    this.crossHair.drawRect(-1 * this.crossHairRadius - length, -1 * width / 2, length, width);

    this.crossHair.drawRect(-1 * width / 2, this.crossHairRadius, width, length);
    this.crossHair.drawRect(-1 * width / 2, -1 * this.crossHairRadius - length, width, length);
    this.crossHair.endFill();

    this.crossHair.visible = false;

    this.addChild(this.crossHair);

  }

  public setSource(spaceship: Spaceship) {
    this.source = spaceship;
  }

  public iterate() {

    if ( this.source !== undefined) {

      if ( this.source.targetPlayer !== undefined) {
        this.crossHair.visible = true;
        this.crossHair.x = this.source.targetPlayer.position.x;
        this.crossHair.y = this.source.targetPlayer.position.y;
      } else {
        this.crossHair.visible = false;
      }
    } else {
      this.crossHair.visible = false;
    }

  }
}
