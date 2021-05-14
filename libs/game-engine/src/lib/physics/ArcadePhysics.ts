import { AbstractPhysics, PhysicsInput } from '../AbstractPhysics';

import { Particle, Spaceship } from '@orbitweb/common';

import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';

export class ArcadePhysics extends AbstractPhysics {
  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({ x: 0, y: 1 }, particle.rotation);
  }

  public iterate(spaceship: Spaceship, delta) {
    super.iterate(spaceship, delta);

    const orientation = this.getOrientation(spaceship);

    if (spaceship.curSpeedDEP > spaceship.maxSpeed) {
      spaceship.curSpeedDEP = spaceship.maxSpeed;
    }

    if (
      spaceship.curSpeedDEP >
      1.05 * (spaceship.speedInput * spaceship.maxSpeed)
    ) {
      spaceship.curSpeedDEP -= spaceship.acceleration * delta;
    } else if (
      spaceship.curSpeedDEP <
      0.95 * (spaceship.speedInput * spaceship.maxSpeed)
    ) {
      spaceship.curSpeedDEP += spaceship.acceleration * delta;
    } else {
    }

    spaceship.speed = {
      x: orientation.x * spaceship.curSpeedDEP,
      y: orientation.y * spaceship.curSpeedDEP,
    };
  }

  public moveTo(
    particle: Particle,
    target: Vector2,
    stopAtTarget?: boolean
  ): PhysicsInput {
    const dir = {
      x: target.x - particle.position.x,
      y: target.y - particle.position.y,
    };

    const orientation = this.getOrientation(particle);
    const angleTarget = CMath.angle(dir, orientation);

    return {
      r: angleTarget,
      a: {
        x: 0,
        y: 0,
      },
      vCap: 1,
    };
  }
}
