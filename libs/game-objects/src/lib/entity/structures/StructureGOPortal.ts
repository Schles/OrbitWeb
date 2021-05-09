import { StructureGO } from '@orbitweb/game-objects';
import { Container, Graphics } from 'pixi.js';

export class StructureGOPortal extends StructureGO {
  private wander: Graphics;

  private progress: number = 0;

  private duration: number = 3;

  public iterate(delta: number) {
    this.progress += delta;

    this.progress = this.progress % this.duration;

    const progress = 1 - this.progress / this.duration;

    this.wander.clear();
    this.wander.lineStyle(2, 0xffaaaa);

    this.wander.drawCircle(0, 0, this.activationRange * progress);
    this.wander.endFill();
  }
  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    // Set the fill color
    //this.lineObject.lineStyle(5, 0xFF00FF);

    this.wander = new Graphics();
    this.lineObject.addChild(this.wander);

    this.lineObject.lineStyle(2, 0xffaaaa);
    this.lineObject.drawCircle(0, 0, this.activationRange);
    this.lineObject.endFill();

    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }

  onDestroy() {
    this.wander.clear();
    this.lineObject.removeChild(this.wander);
    super.onDestroy();
  }
}
