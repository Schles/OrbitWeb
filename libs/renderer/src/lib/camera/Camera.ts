import { CMath } from '@orbitweb/common';
import { Rectangle, Vector2 } from '@orbitweb/common';
import { Container, Matrix } from 'pixi.js';

export class Camera {
  private targetRectangle: Rectangle;

  public width: number;
  public height: number;

  public maxCameraRange: number = 500;

  private _vip: Vector2;

  constructor(private view: Container) {}

  public setVIP(position: Vector2) {
    this._vip = position;
  }

  public setSize(w: number, h: number) {
    this.width = w;
    this.height = h;

    this.maxCameraRange =
      this.width > this.height ? this.height / 2 : this.width / 2;
    //this.iterate([this.targetRectangle.x1, this.targetRectangle.x2], 1);
  }

  public getViewMatrix(): Matrix {
    const mat = new Matrix();
    mat.translate(-this.width / 2, -this.height / 2);
    return mat;
  }

  public getModelMatrix(): Matrix {
    const mat = new Matrix();

    mat.translate(this.view.worldTransform.tx, this.view.worldTransform.ty);
    //return mat;

    return mat;
  }

  public localCenterPoint: Vector2;

  public iterate(positions: Vector2[], delta: number) {
    //return true;

    let rect: Rectangle;
    const p1 = { x: 0, y: 0 };
    //console.log("cam", this.getModelMatrix().append(this.getViewMatrix()).apply(p1));
    //console.log("cam", this.view.worldTransform);

    //return;
    if (positions.length < 1) return;

    //let scale = this.findZoom(rect);
    let scale = 1.0;

    scale = scale > 2 ? 2 : scale;

    scale = 1.0;

    this.view.scale.x = scale;
    this.view.scale.y = scale;

    let focusPoint = this.focusPoint(positions, this._vip);
    focusPoint = { x: 0, y: 0 };

    if (this.localCenterPoint) {
      const disVector: Vector2 = CMath.sub(focusPoint, this.localCenterPoint);
      const disVLen: number = CMath.len(disVector);

      if (disVLen > 5) {
        let scale = 0.05;
        const newVector: Vector2 = CMath.add(
          this.localCenterPoint,
          CMath.scale(disVector, scale)
        );
        focusPoint = newVector;
      }
    }

    this.localCenterPoint = focusPoint;

    const w = this.width / 2;
    const h = this.height / 2;

    const a = this.view.toGlobal(<any>this.localCenterPoint);
    const b = this.view.toGlobal(<any>{
      x: w / scale,
      y: h / scale,
    });

    this.view.x = b.x - a.x;
    this.view.y = b.y - a.y;
  }

  public findZoom(rect: Rectangle): number {
    const w1 = Math.tan(this.width / 2);
    const h1 = Math.tan(this.height / 2);

    const a_w = this.width / (rect.x2.x - rect.x1.x);
    const a_h = this.height / (rect.x2.y - rect.x1.y);

    if (a_w > a_h) {
      return a_w;
    } else return a_h;
  }

  public focusPoint(positions: Vector2[], vip: Vector2): Vector2 {
    if (positions.length < 2 && vip !== undefined) return vip;

    const center = this.findCenter(positions);

    if (vip === undefined) return center;

    const distanceToCenter = CMath.len(CMath.sub(center, vip));

    if (distanceToCenter < this.maxCameraRange) {
      return center;
    } else {
      return this.focusPoint(
        positions.reduce((acc, cur) => {
          if (cur.x === vip.x && cur.y === vip.y) acc.push(cur);
          else if (CMath.len(CMath.sub(cur, vip)) <= this.maxCameraRange)
            acc.push(cur);

          return acc;
        }, []),
        vip
      );
    }
  }

  public focus(positions: Vector2[], vip: Vector2): Rectangle {
    const center = this.findCenter(positions);

    const distanceToCenter = CMath.len(CMath.sub(center, vip));

    if (distanceToCenter < this.maxCameraRange) {
    } else {
    }

    let rectangle: Rectangle = {
      x1: {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY,
      },
      x2: {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY,
      },
    };

    positions.forEach((value) => {
      if (value.x > rectangle.x2.x) rectangle.x2.x = value.x;

      if (value.x < rectangle.x1.x) rectangle.x1.x = value.x;

      if (value.y > rectangle.x2.y) rectangle.x2.y = value.y;

      if (value.y < rectangle.x1.y) rectangle.x1.y = value.y;
    });

    return rectangle;
  }

  private findCenter(positions: Vector2[]): Vector2 {
    let rectangle: Rectangle = {
      x1: {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY,
      },
      x2: {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY,
      },
    };

    positions.forEach((value) => {
      if (value.x > rectangle.x2.x) rectangle.x2.x = value.x;

      if (value.x < rectangle.x1.x) rectangle.x1.x = value.x;

      if (value.y > rectangle.x2.y) rectangle.x2.y = value.y;

      if (value.y < rectangle.x1.y) rectangle.x1.y = value.y;
    });

    return {
      x: (rectangle.x1.x + rectangle.x2.x) / 2,
      y: (rectangle.x1.y + rectangle.x2.y) / 2,
    };
  }
}
