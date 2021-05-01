import {SpaceshipEntity} from "./SpaceshipEntity";
import {PhysicsInput} from "@orbitweb/game-engine";
import * as math from "mathjs";
import {MovementGoalFreeFly} from "../entity/movement/MovementGoalFreeFly";

export class MovementGoal {
  constructor() {
  }

  protected isAligned(player: SpaceshipEntity, targetAngle: number): boolean {
    let deltaAngle = player.rotation - targetAngle;

    if ( math.abs(deltaAngle) < (5 * Math.PI / 180) || math.abs(deltaAngle) > (355 * Math.PI / 180)) {
      player.movementGoal = new MovementGoalFreeFly();
      return true;
    }

    return false;



  }



  public iterate(player: SpaceshipEntity, delta: number): PhysicsInput {
    return {
      a: {
        x: 0,
        y: 0
      },
      r:0,
      vCap: 1
    }
  }
}
