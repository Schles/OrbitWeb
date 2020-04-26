import {CMath} from "../util/CMath";
import {Vector2} from "../../../../shared/src/util/VectorInterface";

export interface Rectangle {
  x1: Vector2,
  x2: Vector2
}

export class Camera {

  private targetRectangle: Rectangle

  public width: number;
  public height: number;

  constructor(private view: PIXI.Container,
              ) {
    this.targetRectangle = {
      x1: {
        x: 400,
        y: 150,
      },
      x2: {
        x: 700,
        y: 340
      }
    }






  }

  public setSize(w: number, h: number) {
    this.width = w;
    this.height = h;

    this.iterate([this.targetRectangle.x1, this.targetRectangle.x2], 1);
  }

  public iterate(positions: Vector2[], delta) {

    ;
    let rect: Rectangle;

    if ( positions.length < 1)
      return;
    else if (positions.length < 2) {
      const pos: Vector2 = positions[0];
      rect = {
        x1: {
          x: pos.x - 20,
          y: pos.y - 20
        },
        x2: {
          x: pos.x + 20,
          y: pos.y + 20
        }
      };
    } else
      rect = this.focus(positions);

    let scale = this.findZoom(rect);

    scale = scale > 2 ? 2 : scale;

    scale = 1.0;


    this.view.scale.x = scale;
    this.view.scale.y = scale;

    const localCenterPoint = CMath.add( rect.x1, CMath.scale(CMath.sub(rect.x2, rect.x1), 0.5));

    const w = this.width / 2;
    const h = this.height / 2;



    const a = this.view.toGlobal(<any>localCenterPoint);
    const b = this.view.toGlobal(<any>{
      x: w / scale,
      y: h / scale
    });


    this.view.x = b.x - a.x;
    this.view.y = b.y - a.y;
  }

  public findZoom(rect: Rectangle): number {
    const w1 = Math.tan(this.width / 2);
    const h1 = Math.tan(this.height / 2);


    const a_w = this.width / (rect.x2.x - rect.x1.x);
    const a_h = this.height / (rect.x2.y - rect.x1.y);

    if ( a_w > a_h) {
      return a_w;
    } else
      return a_h;

  }

  public focus(positions: Vector2[]): Rectangle {


    let rectangle: Rectangle = {
      x1: {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY
      },
      x2: {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY
      },
    };

    positions.forEach( value => {
      if ( value.x > rectangle.x2.x)
        rectangle.x2.x = value.x;

      if ( value.x < rectangle.x1.x)
        rectangle.x1.x = value.x;

      if ( value.y > rectangle.x2.y)
        rectangle.x2.y = value.y;

      if ( value.y < rectangle.x1.y)
        rectangle.x1.y = value.y;


    });

    return rectangle;
  }
}
