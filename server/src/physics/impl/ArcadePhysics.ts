import {IPhysics} from "./IPhysics";



import {Particle} from "../../../../shared/src/model/Particle";
import {SpaceshipEntity} from "../../entities/SpaceshipEntity";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {CMath} from "../../utils/CMath";



export class ArcadePhysics extends IPhysics {
  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({x: 0, y: 1}, particle.rotation);
  }

  public iterate(spaceship: SpaceshipEntity, delta) {
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
