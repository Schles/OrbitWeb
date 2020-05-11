import {MovementGoal} from "./MovementGoal";
import {PhysicsInput} from "../../physics/impl/IPhysics";
import {SpaceshipEntity} from "../SpaceshipEntity";
import {CMath} from "../../utils/CMath";

export class MovementGoalIdle extends MovementGoal{
  constructor() {
    super();
  }


  iterate(player: SpaceshipEntity, delta: number): PhysicsInput {

    const dir = CMath.rotate({x: 0, y: 1}, player.rotation);

    return {
      r: 0,
      a: {
        x: 0,
        y: 0
      },
      vCap: 1
    }

  }
}
