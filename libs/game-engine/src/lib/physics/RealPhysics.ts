import { AbstractPhysics, PhysicsInput } from '../AbstractPhysics';

import * as math from 'mathjs';
import { Particle, Spaceship } from '@orbitweb/common';
import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';

export class RealPhysics extends AbstractPhysics {
  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({ x: 0, y: 1 }, particle.rotation);
  }

  public iterate(spaceship: Spaceship, delta) {
    super.iterate(spaceship, delta);

    const orientation = this.getOrientation(spaceship);

    const v = CMath.len(spaceship.speed);

    if (v > spaceship.speedInput * spaceship.maxSpeed) {
      spaceship.speed.x -= orientation.x * spaceship.acceleration * delta;
      spaceship.speed.y -= orientation.y * spaceship.acceleration * delta;
    }

    if (math.abs(spaceship.omega) > spaceship.maxOmega) {
      spaceship.omega = math.sign(spaceship.omega) * spaceship.maxOmega;
    }
  }

  public moveTo(
    particle: Spaceship,
    target: Vector2,
    stopAtTarget?: boolean
  ): PhysicsInput {
    const dir = {
      x: target.x - particle.position.x,
      y: target.y - particle.position.y,
    };

    const orientation = this.getOrientation(particle);
    const angleTarget = CMath.angle(dir, orientation);

    const d = CMath.rotate(orientation, angleTarget);

    return {
      r: angleTarget,
      a: {
        x: d.x * particle.acceleration,
        y: d.y * particle.acceleration,
      },
      vCap: 1,
    };
  }
}
