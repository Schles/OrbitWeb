import { MovementGoal } from '../../model/MovementGoal';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { PhysicsInput } from '@orbitweb/game-engine';
import { MovementGoalFreeFly } from './MovementGoalFreeFly';

import * as math from 'mathjs';
import { Vector2 } from '@orbitweb/common';

export class MovementGoalOrbit extends MovementGoal {

  public distance: number;

  constructor(public center: Vector2, distance: number) {
    super();
    this.distance = Math.max(100, Math.min(400, distance));
  }

  iterate(player: SpaceshipEntity, deltaTime: number): PhysicsInput {
    /*
    let deltaAngle = player.rotation - this.reqAngle;

    if (this.isAligned(player, this.reqAngle)) {
      player.movementGoal = new MovementGoalFreeFly();
    }

    deltaAngle = MovementGoalAlignTo.capOmega(
      deltaAngle,
      player.maxOmega,
      deltaTime
    );
*/

      player.targetPosition = this.center;
      





      const delta = Math.abs(player.orbitRadius - this.distance);


      const clamp = (delta, max): number => {
        return Math.sign(delta) * Math.min(Math.abs(delta), max);
      }


      if ( delta > 5) {
        player.orbitRadius -= clamp(player.orbitRadius - this.distance, 30) * deltaTime;
      }

      //player.orbitRadius = this.distance;
      //console.log("target", this.distance, player.orbitRadius);
      

    return {
      a: {
        x: 1,
        y: 0,
      },
      r: 1,
      vCap: 1,
    };
  }

  public static capOmega(
    angle: number,
    maxOmega: number,
    deltaTime: number
  ): number {
    let deltaAngle = angle;
    if (deltaAngle > Math.PI) {
    } else {
      deltaAngle *= -1;
    }

    if (math.abs(deltaAngle) > maxOmega * deltaTime) {
      deltaAngle = math.sign(deltaAngle) * maxOmega;
    }

    return deltaAngle;
  }
}
