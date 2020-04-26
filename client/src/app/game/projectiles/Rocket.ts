
import {ProjectileGO} from "../gameobjects/ProjectileGO";
import {SpaceshipGO} from "../gameobjects/SpaceshipGO";


export class Rocket extends ProjectileGO {

  private lineObject: PIXI.Graphics;




  private color;

  constructor(id: string, source: SpaceshipGO, target: SpaceshipGO) {
    super(id, source, target);
  }


  onInit() {
    super.onInit();
  }

  public iterate(delta) {
    super.iterate(delta);

   // console.log("rocket");
  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    this.lineObject = new PIXI.Graphics();

    this.lineObject.beginFill(0xFFFFFF, 1.0);
    this.lineObject.drawRect(0,-5, 20, 10);
    this.lineObject.endFill();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }





}
