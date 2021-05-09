import { Particle } from '@orbitweb/common';
import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';

export class CollisionParticleWall {
  public static collide(
    particle: Particle,
    n: Vector2,
    penetrationDepth: number
  ) {
    const d: Vector2 = CMath.normalize(particle.speed);
    const curSpeed: number = CMath.len(particle.speed);

    const r = CMath.sub(d, CMath.scale(n, 2 * CMath.dot(d, n)));

    const viewDir = CMath.rotate({ x: 0, y: 1 }, 0);

    //particle.speed = r;
    const angle = CMath.angle(r, viewDir);

    particle.rotation = angle;

    const displacementVector = CMath.scale(n, penetrationDepth);

    particle.position.x += displacementVector.x;
    particle.position.y += displacementVector.y;

    particle.speed = CMath.scale(r, curSpeed);
  }
}
