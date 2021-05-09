import { GameIterable, Spaceship } from '@orbitweb/common';
import { ShipEquipmentEntity } from './ShipEquipmentEntity';
import { CMath } from '@orbitweb/common';
import { StructureEntity } from './StructureEntity';
import { MovementGoalFreeFly } from '../entity/movement/MovementGoalFreeFly';
import { MovementGoal } from './MovementGoal';
import { Physics } from '@orbitweb/game-engine';

export class SpaceshipEntity extends Spaceship implements GameIterable {
  public lastHitBy: SpaceshipEntity;

  public activationTime: number = 0;

  public silentRemove: boolean = false;

  private minorGoal: number;
  private majorGoal: number;

  public movementGoal: MovementGoal;

  public get curSpeed(): number {
    return CMath.len(this.speed);
  }

  constructor(spaceship: Spaceship) {
    super(spaceship.id, spaceship.color);

    this.movementGoal = new MovementGoalFreeFly();
  }

  public iterate(delta: number) {
    const physics = new Physics();
    physics.iterate(this, delta);

    this.activationProgress = 0;
    const input = this.movementGoal.iterate(this, delta);
    /*
    

    this.accel = input.a;
    this.omega = input.r;

    if (this.curSpeed > input.vCap * this.maxSpeed) {
      this.speed.x =
        (this.speed.x * input.vCap * this.maxSpeed) / this.curSpeed;
      this.speed.y =
        (this.speed.y * input.vCap * this.maxSpeed) / this.curSpeed;
    }
*/
    this.iterateStructure(delta);

    this.power += this.energyRechargeRate * delta;

    this.power =
      this.power <= this.energyCapacity ? this.power : this.energyCapacity;

    this.health = this.health <= this.maxHealth ? this.health : this.maxHealth;

    this.fitting.fitting.forEach((eq: ShipEquipmentEntity) => {
      eq.iterate(this, delta);
    });
  }

  private iterateStructure(delta: number) {
    if (this.actionUseStructure === true) {
      if (this.targetStructure === undefined) return;

      const dir = CMath.sub(this.position, this.targetStructure.position);
      if (CMath.len(dir) < this.targetStructure.activationRange) {
        this.activationTime += delta;
      } else {
        this.activationTime = 0;
      }

      if (this.activationTime > this.targetStructure.activationDuration) {
        (<StructureEntity>this.targetStructure).onActivateStructure(this);
      }
    } else {
      this.activationTime = 0;
    }
  }
}
