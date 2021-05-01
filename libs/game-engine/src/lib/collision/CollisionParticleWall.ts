import {Particle} from "@orbitweb/common";
import {Vector2} from "@orbitweb/common";
import {CMath} from "@orbitweb/common";

export class CollisionParticleWall {
  public static collide(particle: Particle, n: Vector2, penetrationDepth: number) {
    //console.log("collide");

    const d: Vector2 = CMath.normalize(particle.speed);
    const curSpeed: number = CMath.len(particle.speed);
    //console.log("normal", n);
    //console.log("speed", d);

    const r = CMath.sub(d, CMath.scale(n , 2 * CMath.dot(d, n)));

    const viewDir = CMath.rotate({x: 0, y: 1}, 0);


    //console.log("viewDir", viewDir);
    //console.log("r", r);


    //particle.speed = r;
    const angle = CMath.angle( r, viewDir);

    //console.log(angle);

    particle.rotation = angle;

    const displacementVector = CMath.scale(n, penetrationDepth);

    particle.position.x += displacementVector.x;
    particle.position.y += displacementVector.y;
    //console.log(particle.position);

    particle.speed = CMath.scale(r, curSpeed);

    //console.log("---");

  }
}
