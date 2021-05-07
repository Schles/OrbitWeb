import { ProjectileGO, SpaceshipGO } from "@orbitweb/game-objects";
import { Container, Graphics } from "pixi.js";



export class Rocket extends ProjectileGO {

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

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    this.lineObject.beginFill(0xFFFFFF, 1.0);
    this.lineObject.drawRect(0,-5, 20, 10);
    this.lineObject.endFill();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }





}
