import { IPhysics, PhysicsInput } from './IPhysics';

import { Particle, Spaceship } from '@orbitweb/common';

import * as math from 'mathjs';
import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';

export class OrbitPhysics extends IPhysics {
  public getOrientation(particle: Particle): Vector2 {
    const n: number = <number>math.norm([particle.speed.x, particle.speed.y]);
    //console.log(n);

    //
    if (n == 0) {
      return CMath.rotate({ x: 0, y: 1 }, particle.rotation);
    } else {
      return {
        x: particle.speed.x / n,
        y: particle.speed.y / n
      };
    }

    //return particle.speed;
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
