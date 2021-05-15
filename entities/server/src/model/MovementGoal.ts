import { SpaceshipEntity } from './SpaceshipEntity';;
import * as math from 'mathjs';
import { MovementGoalFreeFly } from '../entity/movement/MovementGoalFreeFly';
import { PhysicsInput } from '@orbitweb/common';

export class MovementGoal {
  constructor() {}

  protected isAligned(player: SpaceshipEntity, targetAngle: number): boolean {
    let deltaAngle = player.rotation - targetAngle;

    if (
      math.abs(deltaAngle) < (5 * Math.PI) / 180 ||
      math.abs(deltaAngle) > (355 * Math.PI) / 180
    ) {
      player.movementGoal = new MovementGoalFreeFly();
      return true;
    }

    return false;
  }

  public iterate(player: SpaceshipEntity, delta: number): PhysicsInput {
    return {
      a: {
        x: 0,
        y: 0,
      },
      r: 0,
      vCap: 1,
    };
  }
}
