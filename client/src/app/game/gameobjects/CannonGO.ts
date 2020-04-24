
import * as math from "mathjs";
import {Cannon} from "../../../../../shared/src/model/Cannon";
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {CMath} from "../../util/CMath";
import {Vector2} from "../../../../../shared/src/util/VectorInterface";


export class CannonGO extends Cannon {

  public parent: Spaceship;
  public gameObject: PIXI.Container;

  constructor(spaceship: Spaceship) {
    super(spaceship);
    this.parent = spaceship;
    this.gameObject = this.getGameObject();

  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    const cannon: PIXI.Graphics = new PIXI.Graphics();

    const c = PIXI.utils.string2hex(this.parent.color);

    // Set the fill color
    cannon.beginFill(0xFFFFFF);

    // Draw a circle
    cannon.drawRect(0, 0, 20, 1);

    // Applies fill to lines and shapes since the last call to beginFill.
    cannon.endFill();

    //cannonCont.addChild(cannon);

    const sprite = PIXI.Sprite.from("assets/ShipATypeB.png");
    sprite.tint = c;
    sprite.x = 10;
    sprite.y = 12;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    sprite.rotation = Math.PI * -2 / 4;
    cannonCont.addChild(sprite);


    return cannonCont;
  }



  private getOrientation(): Vector2 {
    return CMath.rotate({x: 1, y: 0}, this.rotation + this.parent.rotation);
  }



  public iterateGraphics() {
    this.gameObject.rotation  = this.rotation;

  }

}
