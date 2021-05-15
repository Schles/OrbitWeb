import { Rectangle, Vector2, WorldDB } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';

export class WorldGOArena {
  public gameObject: Container;
  public size: Rectangle;
  protected lineObject: Graphics;

  constructor() {
    this.gameObject = this.getGameObject();


  }

  public setSize(center: Vector2, boundry: WorldDB['world']) {


    this.lineObject.clear();
    this.lineObject.lineStyle(2, 0xf05e23);
    this.lineObject.drawCircle(center.x, center.y, boundry.minRadius);
    this.lineObject.drawCircle(center.x, center.y, boundry.maxRadius);
    this.lineObject.endFill();

    this.lineObject.lineStyle(2, 0xf05e23);
    const laneSize = (boundry.maxRadius - boundry.minRadius) / boundry.lanes;

    for ( let i = 1; i < boundry.lanes; i++) {


      this.drawDashedLine(this.lineObject, center.x, center.y, boundry.minRadius + laneSize * i, 20);
    }


    this.lineObject.endFill();
  }


  private drawDashedLine(object: Graphics, x: number, y: number, radius: number, dashLength: number) {


    const dA = 0.1;

    const angle = 1;


    const a1 = angle;
    const a2 = a1 + dA;


    const rad = 180.0 / Math.PI;

    const getPoints = (angle, radius): Vector2 => {
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    };
      const path: { p1: Vector2, p2: Vector2 }[] = [];

      const stepSize = 1;

      const deg = (deg: number): number => {
        return deg * Math.PI / 180;
      };

      for (let i = 0; i < 360; i += 2 * stepSize) {
        path.push({
          p1: getPoints(deg(i), radius),
          p2: getPoints(deg(i + stepSize), radius)
        });
      }
      for (let i = 0; i < path.length; i++) {
        const p = path[i];
        object.drawPolygon([p.p1.x+ x, p.p1.y + y, p.p2.x + x, p.p2.y + y]);
      }

    //  object.drawPolygon(path);
//      object.moveTo()

    //  console.log(path);
    /*
        path = path.map( (v, index) => {
          return index % 2 === 0 ? v + x : v + y;
        })
    */


    //console.log(Math.sin(90));


  }

  public onDestroy() {
  }

  public iterate(delta: number) {
  }

  public getGameObject(): Container {
    const cannonCont: Container = new Container();
    this.lineObject = new Graphics();
    cannonCont.addChild(this.lineObject);
    return cannonCont;
  }
}
