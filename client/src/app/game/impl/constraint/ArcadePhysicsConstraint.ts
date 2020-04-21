import {Particle} from "../../Particle";
import {ShipConstraint} from "./ShipConstraint";
import * as math from "mathjs";

export class ArcadePhysicsConstraint extends ShipConstraint {
  public clamp(particle: Particle) {

/*
    if (length > this.maxSpeed * this.speedInput) {
    const or = this.physics.getOrientation(this);


    //this.speed = CMath.rotate(this.speed, -omega * delta);
    this.speed = {
      x: or.x * this.curSpeed,
      y: or.y * this.curSpeed
    }


    if ( this.curSpeed > this.maxSpeed) {
      this.curSpeed = this.maxSpeed;
    }
spaceship.speed = {
      x: spaceship.speed.x + orientation.x * spaceship.acceleration * delta,
      y: spaceship.speed.y + orientation.y * spaceship.acceleration * delta,
    }

    if ( this.curSpeed > 1.05 * (this.speedInput * this.maxSpeed)) {
      this.curSpeed -= this.acceleration * delta;
    } else if ( 1.05 * (this.curSpeed < this.speedInput * this.maxSpeed) ) {
      this.curSpeed += this.acceleration * delta;
    } else {

    }


    /*
        this.speed = {
          x: this.speed.x + or.x * this.acceleration * delta,
          y: this.speed.y + or.y * this.acceleration * delta,
        }




    this.accel = {
      x: 0,
      y: 0,
    }    ;
*/

    //const omega = this.getAngularVelocity(this, this.targetPlayer.position);
//    console.log(omega);
  }
}
