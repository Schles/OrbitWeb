import { AbstractPhysics, PhysicsInput } from '../AbstractPhysics';

import { Particle, Spaceship } from '@orbitweb/common';

import * as math from 'mathjs';
import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';

export class HybridPhysics extends AbstractPhysics {
  public getOrientation(particle: Particle): Vector2 {
    const n: number = <number>math.norm([particle.speed.x, particle.speed.y]);

    if (n == 0) {
      return CMath.rotate({ x: 0, y: 1 }, particle.rotation);
    } else {
      return {
        x: particle.speed.x / n,
        y: particle.speed.y / n,
      };
    }
  }

  public iterate(spaceship: Spaceship, delta) {
    super.iterate(spaceship, delta);

    const v = CMath.len(spaceship.speed);

    if (v > spaceship.speedInput * spaceship.maxSpeed) {
      const bremskraft: Vector2 = {
        x: spaceship.speed.x / v,
        y: spaceship.speed.y / v,
      };

      spaceship.speed.x -= 2 * bremskraft.x * spaceship.acceleration * delta;
      spaceship.speed.y -= 2 * bremskraft.y * spaceship.acceleration * delta;
    }

    spaceship.omega = spaceship.omega / (4 * delta);
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

    const angle = CMath.angle(
      dir,
      CMath.rotate({ x: 0, y: 1 }, particle.rotation)
    );

    const angleTarget = CMath.angle(dir, orientation);

    const a: Vector2 = {
      x: 0,
      y: 0,
    };

    if (math.abs(angleTarget) > 0) {
      const b = {
        x: particle.position.x + particle.speed.x * 0.016,
        y: particle.position.y + particle.speed.y * 0.016,
      };

      const schub: Vector2 = CMath.sub(target, b);
      const schub_len = CMath.len(schub);

      a.x = (particle.acceleration * schub.x) / schub_len;
      a.y = (particle.acceleration * schub.y) / schub_len;
    } else {
      a.x = particle.acceleration * orientation.x;
      a.y = particle.acceleration * orientation.y;
    }

    return {
      a: a,
      r: angle,
      vCap: 1,
    };
  }
}
