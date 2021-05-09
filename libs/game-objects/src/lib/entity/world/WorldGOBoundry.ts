import { Rectangle } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';

export class WorldGOBoundry {
  public gameObject: Container;
  public size: Rectangle;
  protected lineObject: Graphics;

  constructor() {
    this.gameObject = this.getGameObject();
  }

  public setSize(size: Rectangle) {
    this.size = size;

    const w = size.x2.x - size.x1.x;
    const h = size.x2.y - size.x1.y;

    this.lineObject.clear();
    this.lineObject.lineStyle(2, 0xf05e23);

    this.lineObject.drawRect(size.x1.x, size.x1.y, w, h);
    this.lineObject.endFill();
  }

  public onDestroy() {}

  public iterate(delta: number) {}

  public getGameObject(): Container {
    const cannonCont: Container = new Container();
    this.lineObject = new Graphics();
    cannonCont.addChild(this.lineObject);
    return cannonCont;
  }
}
