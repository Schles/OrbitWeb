import {IPhysics} from "./IPhysics";
import {CMath, Vector2} from "../CMath";
import {Particle} from "../Particle";
import * as math from "mathjs";
import {Spaceship} from "../Spaceship";

export class HybridPhysics extends IPhysics {
  public getOrientation(particle: Particle): Vector2 {

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

      const bremskraft: Vector2 = {
        x: spaceship.speed.x / v,
        y: spaceship.speed.y / v
      }

      spaceship.speed.x -= 2 * bremskraft.x * spaceship.acceleration * delta;
      spaceship.speed.y -= 2 * bremskraft.y * spaceship.acceleration * delta;
    }
/*
    if ( math.abs(spaceship.omega) > spaceship.maxOmega ) {
      spaceship.omega = math.sign(spaceship.omega) * spaceship.maxOmega;
    }
    */

spaceship.omega = spaceship.omega / (4 * delta);

  }

  public moveTo(particle: Spaceship, target: Vector2, stopAtTarget?: boolean): { r: number; a: Vector2 } {

    const dir = {
      x: target.x - particle.position.x,
      y: target.y - particle.position.y
    };

    const orientation = this.getOrientation(particle);

    const angle = CMath.angle(dir, CMath.rotate({x: 0, y: 1}, particle.rotation));



    let  angleTarget =  CMath.angle(dir, orientation);

    let ang = angleTarget;

/*
    //ang = 0;

        if ( math.abs(ang) > this.maxOmega / delta) {
          ang = math.sign(ang) * this.maxOmega;
        }


    const newSpeed = CMath.rotate(this.speed, ang);
*/


    const a: Vector2 = {
      x: 0,
      y: 0
    }

    if( math.abs(angleTarget) > 0) {

      //const schub: Vector2 = CMath.rotate(this.getOrientation(this), angleTarget);

      const b = {
        x: particle.position.x + particle.speed.x * 0.016,
        y: particle.position.y + particle.speed.y * 0.016,
      };

      const schub: Vector2 = CMath.sub(target, b);
      const schub_len = CMath.length(schub);

      a.x = particle.acceleration *  schub.x / schub_len;
      a.y = particle.acceleration *  schub.y / schub_len;

    } else {
      a.x = particle.acceleration * orientation.x;
      a.y = particle.acceleration * orientation.y;

    }

    return {
      a: a,
      r: angle,
    }

  }

}
