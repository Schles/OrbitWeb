import { AbstractPhysics } from '../AbstractPhysics';

import { Particle, PhysicsInput, Spaceship } from '@orbitweb/common';

import * as math from 'mathjs';
import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';

export class OrbitPhysics extends AbstractPhysics {
  moveTo(particle: Particle, target: Vector2, stopAtTarget?: boolean): PhysicsInput {
    return undefined;
  }
  public getOrientation(particle: Particle): Vector2 {
    const n: number = <number>math.norm([particle.speed.x, particle.speed.y]);

    if (n == 0) {
      return CMath.rotate({ x: 0, y: 1 }, particle.rotation);
    } else {
      return {
        x: particle.speed.x / n,
        y: particle.speed.y / n
      };
    }
  }

  public iterate(spaceship: Spaceship, delta) {
    const dir = { x: 0, y: 1 };

    const omega = spaceship.omega;

    spaceship.rotation += (omega / spaceship.orbitRadius) * delta;

    spaceship.position = CMath.scale(
      CMath.rotate(dir, spaceship.rotation),
      spaceship.orbitRadius
    );
  }

}
