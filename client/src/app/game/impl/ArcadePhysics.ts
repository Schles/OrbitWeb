import {IPhysics} from "./IPhysics";
import {CMath, Vector2} from "../CMath";
import {Particle} from "../Particle";
import * as math from "mathjs";
import {Spaceship} from "../Spaceship";

export class ArcadePhysics extends IPhysics {
  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({x: 0, y: 1}, particle.rotation);
  }

  public iterate(spaceship: Spaceship, delta) {
    super.iterate(spaceship, delta);

    const orientation = this.getOrientation(spaceship);

    if ( spaceship.curSpeed > spaceship.maxSpeed) {
      spaceship.curSpeed = spaceship.maxSpeed;
    }

    if ( spaceship.curSpeed > 1.05 * (spaceship.speedInput * spaceship.maxSpeed)) {
      spaceship.curSpeed -= spaceship.acceleration * delta;
    } else if ( spaceship.curSpeed < 0.95 * (spaceship.speedInput * spaceship.maxSpeed) ) {
      spaceship.curSpeed += spaceship.acceleration * delta;
    } else {

    }

    spaceship.speed = {
      x: orientation.x * spaceship.curSpeed,
      y: orientation.y * spaceship.curSpeed
    }

  }

  public moveTo(particle: Particle, target: Vector2, stopAtTarget?: boolean): { r: number; a: Vector2 } {
    const dir = {
      x: target.x - particle.position.x,
      y: target.y - particle.position.y
    };

    const orientation = this.getOrientation(particle);
    const angleTarget =  CMath.angle(dir, orientation);

    return {
      r: angleTarget,
      a: {
        x: 0,
        y: 0
      }
    };
  }

}
