import * as math from 'mathjs';
import { Particle, PhysicsInput, Spaceship } from '@orbitweb/common';
import { Tangents, Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';

export abstract class AbstractPhysics {
  abstract getOrientation(particle: Particle): Vector2;

  abstract moveTo(
    particle: Particle,
    target: Vector2,
    stopAtTarget?: boolean
  ): PhysicsInput;

  protected orbitOutside(
    spaceship: Spaceship,
    target: Vector2,
    t1: Vector2,
    t2: Vector2
  ): PhysicsInput {
    const orient = this.getOrientation(spaceship);

    const v1: Vector2 = {
      x: t1.x - spaceship.position.x,
      y: t1.y - spaceship.position.y,
    };

    const v2: Vector2 = {
      x: t2.x - spaceship.position.x,
      y: t2.y - spaceship.position.y,
    };

    const angle1: number = CMath.degree(v1, orient);
    const angle2: number = CMath.degree(v2, orient);

    if (math.abs(angle2) < math.abs(angle1)) return this.moveTo(spaceship, t2);
    else return this.moveTo(spaceship, t1);
  }

  protected orbitTangent(spaceship: Spaceship, target: Vector2): PhysicsInput {
    const angle = CMath.angle(this.getOrientation(spaceship), { x: 0, y: 1 });
    return {
      r: angle,
      a: {
        x: 0,
        y: 0,
      },
      vCap: 1,
    };
  }

  protected orbitInside(spaceship: Spaceship, target: Vector2): PhysicsInput {
    return this.keepAtRange(spaceship, target, spaceship.orbitRadius);
  }

  public keepAtRange(
    spaceship: Spaceship,
    target: Vector2,
    range: number
  ): PhysicsInput {
    const dir: Vector2 = {
      x: target.x - spaceship.position.x,
      y: target.y - spaceship.position.y,
    };

    const len = CMath.len(dir);

    const targetPoint: Vector2 = {
      x: (dir.x * range) / len,
      y: (dir.y * range) / len,
    };

    return this.moveTo(spaceship, targetPoint);
  }

  public orbitTarget(spaceship: Spaceship, target: Vector2): PhysicsInput {
    const tangents: Tangents = CMath.constructTangent(
      target,
      spaceship.orbitRadius,
      spaceship.position
    );
    if (tangents.tangents !== undefined) {
      return this.orbitOutside(
        spaceship,
        target,
        tangents.tangents.t1,
        tangents.tangents.t2
      );
    } else if (tangents.isInside) {
      return this.orbitInside(spaceship, target);
    } else {
      return this.orbitTangent(spaceship, target);
    }
  }

  public iterate(spaceship: Spaceship, delta) {
    const angle = spaceship.rotation;

    let acc = {
      x: 0,
      y: 0,
    };

    if (CMath.len(spaceship.speed) > 0) {
      acc = CMath.scale(
        CMath.rotate(
          {
            x: 0,
            y: 1,
          },
          angle
        ),
        spaceship.acceleration
      );
    }

    let input = {
      r: 0,
      a: acc,
    };

    if (spaceship.actionOrbitTarget) {
      if (spaceship.targetPlayer !== undefined)
        input = this.orbitTarget(spaceship, spaceship.targetPlayer.position);
    } else if (spaceship.actionKeepAtRange) {
      if (spaceship.targetPlayer !== undefined)
        input = this.keepAtRange(
          spaceship,
          spaceship.targetPlayer.position,
          spaceship.orbitRadius
        );
    } else {
      if (spaceship.targetPosition !== undefined) {
        const a: Vector2 = this.getOrientation(spaceship);
        const b: Vector2 = CMath.normalize(
          CMath.sub(spaceship.targetPosition, spaceship.position)
        );

        if (math.abs(CMath.angle(a, b)) < 0.5) {
          spaceship.targetPosition = undefined;
        } else {
          input = this.moveTo(spaceship, spaceship.targetPosition);
        }
      }
    }

    spaceship.accel = input.a;
    spaceship.omega = input.r;
  }
}
