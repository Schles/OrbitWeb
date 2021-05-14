import { MovementGoal } from '../../model/MovementGoal';
import { PhysicsInput } from '@orbitweb/game-engine';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { CMath } from '@orbitweb/common';

export class MovementGoalIdle extends MovementGoal {
  constructor() {
    super();
  }

  iterate(player: SpaceshipEntity, delta: number): PhysicsInput {
    const dir = CMath.rotate({ x: 0, y: 1 }, player.rotation);

    return {
      r: 0,
      a: {
        x: 0,
        y: 0,
      },
      vCap: 1,
    };
  }
}
