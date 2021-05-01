import {Particle} from "@orbitweb/common";
import {Vector2} from "@orbitweb/common";
import {CMath} from "@orbitweb/common";

export class CollisionParticleParticle {
  public static collide(p1: Particle, p2: Particle, penetrationDepth: number) {
    const r1 = 10;
    const r2 = 10;

    const deltaVector: Vector2 = CMath.sub(p1.position, p2.position);

    const distanceBetweenCircles: number = CMath.len(deltaVector);

    // Changing speed of colliders

    const getV = (v1, v2, m1, m2) => {
      return (v1 * (m1 - m2) + (2 * m2 * v2)) / (m1 + m2);
    };

    const v1 = {
      x: getV(p1.speed.x, p2.speed.x, p1.mass, p2.mass),
      y: getV(p1.speed.y, p2.speed.y, p1.mass, p2.mass),
    };

    const v2 = {
      x: getV(p2.speed.x, p1.speed.x, p2.mass, p1.mass),
      y: getV(p2.speed.y, p1.speed.y, p2.mass, p1.mass),
    };

    p1.speed = v1;
    p2.speed = v2;

    // Changing orientation of colliders

    const viewDir = {x: 0, y: 1};

    const rot1 =  CMath.angle( CMath.normalize(v1), viewDir);
    const rot2 =  CMath.angle( CMath.normalize(v2), viewDir);

    p1.rotation = rot1;
    p2.rotation = rot2;

    const pCollision: Vector2 = {
      x: (p1.position.x * p2.radius + p2.position.x * p1.radius) / (p1.radius + p2.radius),
      y: (p1.position.y * p2.radius + p2.position.y * p1.radius) / (p1.radius + p2.radius),
    };


    // Particle displacement

    const dist1: Vector2 = CMath.sub(p1.position, pCollision);
    const dist2: Vector2 = CMath.sub(p2.position, pCollision);

    const f1: number = 1 - (CMath.len(dist1) / p1.radius);
    const f2: number = 1 - (CMath.len(dist2) / p2.radius);


    const dn1: Vector2 = CMath.normalize(dist1);
    const dn2: Vector2 = CMath.normalize(dist2);

    p1.position.x += dn1.x * ( 1 + f1);
    p1.position.y += dn1.y * ( 1 + f1);

    p2.position.x += dn2.x * ( 1 + f2);
    p2.position.y += dn2.y * ( 1 + f2);

  }
}
