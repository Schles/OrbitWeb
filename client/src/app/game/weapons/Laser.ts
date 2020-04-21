import {Vector2} from "../CMath";
import {Projectile} from "./Projectile";
import {Spaceship} from "../Spaceship";


export class Laser extends Projectile {

  public id;

  public gameObject: PIXI.Container;

  private lineObject: PIXI.Graphics;

  public source: Spaceship;
  public target: Spaceship;



  private color;

  constructor(color) {
    super(color);
    this.gameObject = this.getGameObject();
  }

  public iterate(delta) {
    super.iterate(delta);


    const c = PIXI.utils.string2hex(this.color);
    let lineWidth = 2;

    const progress = this.timeToLife / this.lifeTime;

    if ( progress > 0.6)
      lineWidth = 2;
    else if (progress > 0.3)
      lineWidth = 1;
    else
      lineWidth = 3;

    if ( this.target !== undefined) {

      this.drawLine(this.source.position, this.target.position, lineWidth, c);
    }
  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    this.lineObject = new PIXI.Graphics();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }





}
