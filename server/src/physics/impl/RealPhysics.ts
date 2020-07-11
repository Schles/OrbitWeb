import {IPhysics, PhysicsInput} from "./IPhysics";

import * as math from "mathjs";
import {Particle} from "../../../../shared/src/model/Particle";
import {SpaceshipEntity} from "../../game/model/SpaceshipEntity";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {CMath} from "../../utils/CMath";


export class RealPhysics extends IPhysics {
  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({x: 0, y: 1}, particle.rotation);
  }

  public iterate(spaceship: SpaceshipEntity, delta) {
    super.iterate(spaceship, delta);

    const orientation = this.getOrientation(spaceship);

    const v = CMath.len(spaceship.speed);


    if ( v > spaceship.speedInput * spaceship.maxSpeed) {
      spaceship.speed.x -= orientation.x * spaceship.acceleration * delta;
      spaceship.speed.y -= orientation.y * spaceship.acceleration * delta;
    }

    if ( math.abs(spaceship.omega) > spaceship.maxOmega ) {
      spaceship.omega = math.sign(spaceship.omega) * spaceship.maxOmega;
    }

  }


  public moveTo(particle: SpaceshipEntity, target: Vector2, stopAtTarget?: boolean): PhysicsInput {

    const dir = {
      x: target.x - particle.position.x,
      y: target.y - particle.position.y
    };

    const orientation = this.getOrientation(particle);

    const angle = CMath.angle(orientation, {x: 0, y: 1});
    let  angleTarget =  CMath.angle(dir, orientation);

    const d = CMath.rotate(orientation, angleTarget);

    return {
      r: angleTarget,
      a: {
        x: d.x * particle.acceleration,
        y: d.y * particle.acceleration
      },
      vCap: 1
    }

  }

}
