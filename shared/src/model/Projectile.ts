import {Vector2} from "../util/VectorInterface";
import {Particle} from "./Particle";

export class Projectile extends Particle {
  public remainingTime: number = 5;


  constructor(public id: string,
              public color) {
    super();
  }

  public onInit() {

  }

  public iterate(delta: number) {
    this.remainingTime -= delta;
  }

  public onDestroy() {

  }
}
