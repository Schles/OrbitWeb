import { GameIterable, Structure } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';

export class StructureGO extends Structure implements GameIterable {
  public gameObject: Container;

  protected lineObject: Graphics;

  constructor(
    id: string,
    x: number,
    y: number,
    activationRange: number,
    activationDuration: number,
    info: string
  ) {
    super(x, y);
    this.id = id;
    this.activationRange = activationRange;
    this.activationDuration = activationDuration;
    this.info = info;
    this.gameObject = this.getGameObject();
  }

  public onInit() {
    this.gameObject.x = this.position.x;
    this.gameObject.y = this.position.y;
  }

  public onDestroy() {}

  public iterate(delta: number) {}

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    // Set the fill color
    //this.lineObject.lineStyle(5, 0xFF00FF);

    this.lineObject.beginFill(0xaa33bb);
    this.lineObject.drawCircle(0, 0, 40);
    this.lineObject.endFill();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }
}
