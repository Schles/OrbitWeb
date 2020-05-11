import {Vector2} from "../../../../../shared/src/util/VectorInterface";
import {Projectile} from "../../../../../shared/src/model/Projectile";
import {SpaceshipGO} from "./SpaceshipGO";
import {Physics} from "../../../../../shared/src/physics/Physics";
import {Structure} from "../../../../../shared/src/model/Structure";

export class StructureGO extends Structure {

  public gameObject: PIXI.Container;

  protected lineObject: PIXI.Graphics;

  constructor(id: string, x: number, y: number, activationRange: number, activationDuration: number) {
    super(x, y);
    this.id = id;
    this.activationRange = activationRange;
    this.activationDuration = activationDuration;

    this.gameObject = this.getGameObject();
  }

  public onInit() {
    this.gameObject.x = this.position.x;
    this.gameObject.y = this.position.y;
  }

  public onDestroy() {

  }

  public iterate(delta: number) {
  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    this.lineObject = new PIXI.Graphics();

    // Set the fill color
    //this.lineObject.lineStyle(5, 0xFF00FF);

    this.lineObject.beginFill(0xAA33BB);
    this.lineObject.drawCircle(0,0, 40);
    this.lineObject.endFill();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }


}
