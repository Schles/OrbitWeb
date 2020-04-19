import {Vector2} from "./CMath";

export class Projectile {

  public id;

  public gameObject: PIXI.Container;

  private lineObject: PIXI.Graphics;

  public remainingTime: number = 5;

  private color;

  constructor(color) {
    this.color = color;
    this.gameObject = this.getGameObject();
  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    this.lineObject = new PIXI.Graphics();

    // Set the fill color
    //this.lineObject.lineStyle(5, 0xFF00FF);

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }



  public drawLine(start: Vector2, end: Vector2) {

      const c = PIXI.utils.string2hex(this.color);

      this.lineObject.clear();
      this.lineObject.lineStyle(2, c);
      this.lineObject.moveTo(start.x, start.y);
      this.lineObject.lineTo(end.x, end.y);
  }


}
