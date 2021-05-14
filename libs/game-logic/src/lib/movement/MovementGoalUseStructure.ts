import { MovementGoal } from '../model/MovementGoal';
import { PhysicsInput } from '@orbitweb/game-engine';
import { SpaceshipEntity } from '../model/SpaceshipEntity';
import { CMath } from '@orbitweb/common';
import { StructureEntity } from '../model/StructureEntity';
import { MovementGoalAlignTo } from './MovementGoalAlignTo';
import { MovementGoalIdle } from './MovementGoalIdle';
import { Vector2 } from '@orbitweb/common';

export class MovementGoalUseStructure extends MovementGoal {
  public acivationTime: number = 0;

  constructor(public structure: StructureEntity) {
    super();
  }

  iterate(player: SpaceshipEntity, delta: number): PhysicsInput {
    if (this.structure === undefined) {
      console.error('structure is already dead', this.structure);
      return undefined;

      /*
      player.movementGoal = new MovementGoalIdle();
      return player.movementGoal.iterate(player, delta);
       */
    }

    const viewDir = CMath.rotate({ x: 0, y: 1 }, player.rotation);

    // Distance Check

    const distanceToTarget = CMath.len(
      CMath.sub(player.position, this.structure.position)
    );

    if (distanceToTarget < this.structure.activationRange) {
      //console.log("ticking");
      this.acivationTime += delta;
    } else {
      this.acivationTime -= delta;
      this.acivationTime = this.acivationTime > 0 ? this.acivationTime : 0;
    }

    player.activationProgress =
      this.acivationTime / this.structure.activationDuration;

    // Activation Time Check

    if (this.acivationTime > this.structure.activationDuration) {
      this.structure.onActivateStructure(player);
      player.movementGoal = new MovementGoalIdle();
      return player.movementGoal.iterate(player, delta);
    }

    const targetDir = CMath.sub(this.structure.position, player.position);

    const reqAngle = CMath.angle(targetDir, { x: 0, y: 1 });
    const deltaAngle = player.rotation - reqAngle;
    const cappedAngle = MovementGoalAlignTo.capOmega(
      deltaAngle,
      player.maxOmega,
      delta
    );

    let bremsweg =
      (player.curSpeed * player.curSpeed) / (2 * player.acceleration);

    if (distanceToTarget < this.structure.activationRange) {
      const curSpeed = player.curSpeed;

      let bremskraft: Vector2 = {
        x: 0,
        y: 0,
      };
      if (curSpeed > 0) {
        bremskraft = {
          x: (-1 * player.speed.x) / player.curSpeed,
          y: (-1 * player.speed.y) / player.curSpeed,
        };
      }

      const f = curSpeed / player.maxSpeed;

      let a = {
        x: (0 + f) * bremskraft.x * player.acceleration,
        y: (0 + f) * bremskraft.y * player.acceleration,
      };

      return {
        r: cappedAngle,
        a: a,
        vCap: 1,
      };
    } else if (distanceToTarget > bremsweg) {
      return {
        r: cappedAngle,
        a: {
          x: viewDir.x * player.acceleration,
          y: viewDir.y * player.acceleration,
        },
        vCap: 1,
      };
    }
    let vCap = distanceToTarget / bremsweg;
    vCap = vCap > 0 ? vCap : 0;
    vCap = vCap <= 1 ? vCap : 1;

    const curSpeed = player.curSpeed;

    let bremskraft: Vector2 = {
      x: 0,
      y: 0,
    };
    if (curSpeed > 0) {
      bremskraft = {
        x: (-1 * player.speed.x) / player.curSpeed,
        y: (-1 * player.speed.y) / player.curSpeed,
      };
    }

    const f = curSpeed / player.maxSpeed;

    let a = {
      x: (0 + f) * bremskraft.x * player.acceleration,
      y: (0 + f) * bremskraft.y * player.acceleration,
    };

    return {
      r: cappedAngle,
      a: a,
      vCap: 1,
    };
  }
}
