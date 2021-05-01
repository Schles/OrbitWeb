import {Projectile} from "@orbitweb/common";
import {SpaceshipEntity} from "./SpaceshipEntity";


export class ProjectileEntity extends Projectile {

  constructor(id: string, public source: SpaceshipEntity, public target: SpaceshipEntity) {
    super(id, source.color);
  }


  iterate(delta: number) {
    super.iterate(delta);
  }
}
