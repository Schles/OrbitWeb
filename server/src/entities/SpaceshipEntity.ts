import {Spaceship} from "../../../shared/src/model/Spaceship";
import {IPhysics, PhysicsInput} from "../physics/impl/IPhysics";
import {HybridPhysics} from "../physics/impl/HybridPhysics";
import {Vector2} from "../../../shared/src/util/VectorInterface";
import {CannonEntity} from "./CannonEntity";

export class SpaceshipEntity extends Spaceship {

  private physics: IPhysics;

  constructor(spaceship: Spaceship) {
    super(spaceship.id, spaceship.color);

    this.cannon = new CannonEntity(this);

    this.physics = new HybridPhysics();
  }

  public moveTo(target: Vector2, stopAtTarget?:boolean): PhysicsInput {
    return this.physics.moveTo(this, target, stopAtTarget);
  }

  public iterate(delta: number) {
    this.physics.iterate(this, delta);

    (<CannonEntity> this.cannon).iterate(delta);
  }


}
