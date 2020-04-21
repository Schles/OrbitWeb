import {Particle} from "../../Particle";
import {ShipConstraint} from "./ShipConstraint";
import * as math from "mathjs";

export class IndirektPhysicsConstraint extends ShipConstraint{
  public clamp(particle: Particle) {

    const length = math.norm( [this.speed.x, this.speed.y] );

    const sx = this.speed.x > 0 ? this.speed.x / length : 1;
    const sy = this.speed.y > 0 ? this.speed.y / length : 1;



    if (length > this.maxSpeed * this.speedInput) {
      //this.speed.x *= this.maxSpeed * this.speedInput  / length;
      //this.speed.y *= this.maxSpeed * this.speedInput / length;
      /*
      const bremsKraft: Vector2 = {
        x: this.speed.x * this.acceleration / length,
        y: this.speed.y * this.acceleration / length,
      };

      //console.log(bremsKraft);

      accForce = {
        x: accForce.x - bremsKraft.x,
        y: accForce.y - bremsKraft.y,
      }

       */
    }




    //console.log("speed", length);



    // Rotation




    //let deltaAngle =  CMath.angle(input.accel, this.getOrientation(this));
    let deltaAngle = input.r;

    let omega = deltaAngle / delta;
//console.log(omega);
    if (isNaN(omega))
      omega = 0;

    if ( math.abs(omega) > this.maxOmega) {

      omega = math.sign(omega) * this.maxOmega
      //console.log("correct");
      /*
      const maxRotForce = CMath.rotate(this.getOrientation(this), math.sign(omega) * this.maxOmega / delta);
      accForce = {
        x: maxRotForce.x * this.acceleration,
        y: maxRotForce.y * this.acceleration
      }
*/
    }

    //console.log("omega", omega);

    //this.rotation += omega * delta;
    this.rotation += omega * delta;




    const or = this.physics.getOrientation(this);


    //this.speed = CMath.rotate(this.speed, -omega * delta);
    this.speed = {
      x: or.x * this.curSpeed,
      y: or.y * this.curSpeed
    }


    if ( this.curSpeed > this.maxSpeed) {
      this.curSpeed = this.maxSpeed;
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
        */



    this.accel = {
      x: 0,
      y: 0,
    }

    ;


    //const omega = this.getAngularVelocity(this, this.targetPlayer.position);
//    console.log(omega);
  }
}
