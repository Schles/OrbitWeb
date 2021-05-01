import {MovementGoal} from "../../model/MovementGoal";
import {PhysicsInput} from "@orbitweb/game-engine";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";
import {CMath} from "@orbitweb/common";

export class MovementGoalFreeFly extends MovementGoal{
  constructor() {
    super();
  }


  iterate(player: SpaceshipEntity, delta: number): PhysicsInput {

    const dir = CMath.rotate({x: 0, y: 1}, player.rotation);

    return {
      r: 0,
      a: {
        x: dir.x * player.acceleration,
        y: dir.y * player.acceleration
      },
      vCap: 1
    }

  }
}
