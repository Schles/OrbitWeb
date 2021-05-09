import { MovementGoal } from '../../model/MovementGoal';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { PhysicsInput } from '@orbitweb/game-engine';
import { MovementGoalFreeFly } from './MovementGoalFreeFly';

import * as math from 'mathjs';

export class MovementGoalAlignTo extends MovementGoal {
  constructor(public reqAngle: number) {
    super();
  }

  iterate(player: SpaceshipEntity, deltaTime: number): PhysicsInput {
    let deltaAngle = player.rotation - this.reqAngle;

    if (this.isAligned(player, this.reqAngle)) {
      player.movementGoal = new MovementGoalFreeFly();
    }

    deltaAngle = MovementGoalAlignTo.capOmega(
      deltaAngle,
      player.maxOmega,
      deltaTime
    );

    return {
      a: {
        x: 1,
        y: 0,
      },
      r: deltaAngle,
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
