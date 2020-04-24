import {Vector2} from "../../util/CMath";


export class Projectile {

  public id;

  public gameObject: PIXI.Container;

  private lineObject: PIXI.Graphics;

  public timeToLife: number = 1;
  public lifeTime: number = 1;


  private color;

  constructor(color) {
    this.color = color;
    this.gameObject = this.getGameObject();
  }

  public iterate(delta) {
      this.timeToLife -= delta;
  }


  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    this.lineObject = new PIXI.Graphics();

    // Set the fill color
    //this.lineObject.lineStyle(5, 0xFF00FF);

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }

  public getSource(): Vector2 {

  }

  public getTarget(): Vector2 {

  }

  public drawLine(start: Vector2, end: Vector2, lineWidth: number, color) {



      this.lineObject.clear();
      this.lineObject.lineStyle(lineWidth, color);
      this.lineObject.moveTo(start.x, start.y);
      this.lineObject.lineTo(end.x, end.y);
  }


}
