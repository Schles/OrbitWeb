import {Particle} from "./Particle";
import {TimedAbility} from "./TimedAbility";

export class Projectile extends Particle implements TimedAbility {

  public duration: number;
  public timeToLife: number;

  public type: string;

  constructor(public id: string,
              public color) {
    super();
    this.timeToLife = 1;
    this.type = "projectile";
  }

  public onInit() {

  }

  public iterate(delta: number) {
    this.timeToLife -= delta;
  }

  public onDestroy() {

  }


}
