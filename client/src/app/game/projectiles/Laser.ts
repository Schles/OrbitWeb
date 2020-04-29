import {ProjectileGO} from "../gameobjects/ProjectileGO";
import {SpaceshipGO} from "../gameobjects/SpaceshipGO";


export class Laser extends ProjectileGO {
  constructor(id: string, source: SpaceshipGO, target: SpaceshipGO) {
    super(id, source, target);
    this.gameObject = this.getGameObject();
  }

  public iterate(delta) {
    super.iterate(delta);


    const c = PIXI.utils.string2hex(this.color);
    let lineWidth = 2;

    const progress = this.timeToLife / this.duration;

    if ( progress > 0.6)
      lineWidth = 2;
    else if (progress > 0.3)
      lineWidth = 1;
    else
      lineWidth = 3;

    if ( this.target !== undefined) {

      this.drawLine(this.source.position, this.target.position);
    }
  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    this.lineObject = new PIXI.Graphics();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }





}

