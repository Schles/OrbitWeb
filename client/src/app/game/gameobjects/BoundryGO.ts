import {Rectangle, Vector2} from "../../../../../shared/src/util/VectorInterface";
import {Projectile} from "../../../../../shared/src/model/Projectile";
import {SpaceshipGO} from "./SpaceshipGO";
import {Physics} from "../../../../../shared/src/physics/Physics";
import {Structure} from "../../../../../shared/src/model/Structure";

export class BoundryGO {

  public gameObject: PIXI.Container;
  public size: Rectangle
  protected lineObject: PIXI.Graphics;

  constructor() {

    this.gameObject = this.getGameObject();
  }

  public setSize(size: Rectangle) {
    console.log("setsize", size);
    this.size = size;

    const w = size.x2.x - size.x1.x;
    const h = size.x2.y - size.x1.y;

    this.lineObject.clear();
    this.lineObject.lineStyle(2, 0x00FF00);


    this.lineObject.drawRect(size.x1.x, size.x1.y, w, h);
    this.lineObject.endFill();
  }

  public onDestroy() {

  }

  public iterate(delta: number) {
  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();
    this.lineObject = new PIXI.Graphics();
    cannonCont.addChild(this.lineObject);
    return cannonCont;
  }


}
