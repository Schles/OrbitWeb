import {IPhysics} from "./IPhysics";
import {CMath, Vector2} from "../CMath";
import {Particle} from "../Particle";
import * as math from "mathjs";
import {Spaceship} from "../Spaceship";

export class RealPhysics extends IPhysics {
  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({x: 0, y: 1}, particle.rotation);
    const n = math.norm( [particle.speed.x, particle.speed.y]);
    //console.log(n);


    //
    if(n == 0) {
      return CMath.rotate({x: 0, y: 1}, particle.rotation);
    } else {
      return {
        x: particle.speed.x / n,
        y: particle.speed.y / n
      }
    }


    //return particle.speed;
  }

  public iterate(spaceship: Spaceship, delta) {
    super.iterate(spaceship, delta);

    const orientation = this.getOrientation(spaceship);

    const v = CMath.length(spaceship.speed);


    if ( v > spaceship.speedInput * spaceship.maxSpeed) {
      spaceship.speed.x -= orientation.x * spaceship.acceleration * delta;
      spaceship.speed.y -= orientation.y * spaceship.acceleration * delta;
    }

    if ( math.abs(spaceship.omega) > spaceship.maxOmega ) {
      spaceship.omega = math.sign(spaceship.omega) * spaceship.maxOmega;
    }

  }


  public moveTo(particle: Spaceship, target: Vector2, stopAtTarget?: boolean): { r: number; a: Vector2 } {

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
      }
    }

  }

}
