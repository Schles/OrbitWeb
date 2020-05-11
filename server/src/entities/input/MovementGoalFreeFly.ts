import {MovementGoal} from "./MovementGoal";
import {PhysicsInput} from "../../physics/impl/IPhysics";
import {SpaceshipEntity} from "../SpaceshipEntity";
import {CMath} from "../../utils/CMath";

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
