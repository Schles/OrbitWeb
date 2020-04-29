import {CMath} from "../util/CMath";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {GameService} from "../service/game.service";
import {PlayerService} from "../service/player.service";

export interface Rectangle {
  x1: Vector2,
  x2: Vector2
}

export class Camera {

  private targetRectangle: Rectangle;

  public width: number;
  public height: number;

  public maxCameraRange: number = 500;

  constructor(private view: PIXI.Container,
              private gameService: GameService,
              private playerService: PlayerService) {

    this.setSize(this.gameService.app().renderer.width, this.gameService.app().renderer.height);

    this.gameService.app().OnResizeWindow.subscribe( (size) => {
      console.error(" got it", size);
      this.setSize(size.x, size.y);
    });


    this.gameService.app().ticker.add ( (delta) => {
      const dT = this.gameService.app().ticker.elapsedMS / 1000;

      let me;
      let mePosition;
      if (this.playerService.getUserName() !== undefined) {
        me = this.gameService.app().players.find((p) => p.id === this.playerService.getUserName());
        if (me !== undefined)
          mePosition = me.position;
      }

      this.iterate(this.gameService.app().players.map( (v) => v.position), mePosition, dT);
    });



  }

  public setSize(w: number, h: number) {

    this.width = w;
    this.height = h;

    //this.iterate([this.targetRectangle.x1, this.targetRectangle.x2], 1);
  }

  public iterate(positions: Vector2[], vip: Vector2, delta) {
    let rect: Rectangle;

    if ( positions.length < 1)
      return;


    //let scale = this.findZoom(rect);
    let scale = 1.0;

    scale = scale > 2 ? 2 : scale;

    scale = 1.0;


    this.view.scale.x = scale;
    this.view.scale.y = scale;

    const localCenterPoint = this.focusPoint(positions, vip);

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

  public focusPoint(positions: Vector2[], vip: Vector2): Vector2 {

    if ( positions.length < 2 && vip !== undefined )
      return vip;

    const center = this.findCenter(positions);

    if (vip === undefined)
      return center;

    const distanceToCenter = CMath.len(CMath.sub(center, vip));
    2
    if ( distanceToCenter < this.maxCameraRange ) {
        return center;
    } else {
        return this.focusPoint(positions.reduce( (acc, cur) => {
          if ( cur.x === vip.x && cur.y === vip.y)
            acc.push(cur);
          else if (CMath.len(CMath.sub(cur, vip)) <= this.maxCameraRange)
            acc.push(cur);

          return acc;
        }, []), vip)
    }
  }

  public focus(positions: Vector2[], vip: Vector2): Rectangle {


    const center = this.findCenter(positions);

    const distanceToCenter = CMath.len(CMath.sub(center, vip));

    console.log(distanceToCenter);

    if ( distanceToCenter < this.maxCameraRange ) {

    } else {

    }

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

  private findCenter(positions: Vector2[]): Vector2 {
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

    return {
      x: (rectangle.x1.x + rectangle.x2.x) / 2,
      y: (rectangle.x1.y + rectangle.x2.y) / 2,
    }

  }
}
