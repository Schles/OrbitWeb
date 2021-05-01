import {Vector2} from "@orbitweb/common";
import {Projectile} from "@orbitweb/common";
import {SpaceshipGO} from "./SpaceshipGO";
import {Physics} from "@orbitweb/common";

export class ProjectileGO extends Projectile {

  public gameObject: PIXI.Container;

  protected lineObject: PIXI.Graphics;

  constructor(id: string, public source: SpaceshipGO, public target: SpaceshipGO) {
    super(id, source.color);

    this.gameObject = this.getGameObject();
  }

  public iterate(delta: number) {
    Physics.iterate(this, delta);
    this.iterPhysics();
  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    this.lineObject = new PIXI.Graphics();

    // Set the fill color
    //this.lineObject.lineStyle(5, 0xFF00FF);
    cannonCont.addChild(this.lineObject);

    this.drawLine(this.source.position, this.target.position);

    return cannonCont;
  }



  public drawLine(start: Vector2, end: Vector2) {

    const c = PIXI.utils.string2hex(this.color);

    this.lineObject.clear();
    this.lineObject.lineStyle(2, c);
    this.lineObject.moveTo(start.x, start.y);
    this.lineObject.lineTo(end.x, end.y);
  }

  public iterPhysics() {
    this.gameObject.x = this.position.x;
    this.gameObject.y = this.position.y;

    this.gameObject.rotation = this.rotation;
  }
}
