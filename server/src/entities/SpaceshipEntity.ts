import {Spaceship} from "../../../shared/src/model/Spaceship";
import {IPhysics, PhysicsInput} from "../physics/impl/IPhysics";
import {HybridPhysics} from "../physics/impl/HybridPhysics";
import {Vector2} from "../../../shared/src/util/VectorInterface";
import {ShipEquipmentEntity} from "./ShipEquipmentEntity";
import {CMath} from "../utils/CMath";
import {StructureEntity} from "../structures/StructureEntity";
import {MovementGoalFreeFly} from "./input/MovementGoalFreeFly";
import {MovementGoal} from "./input/MovementGoal";

export class SpaceshipEntity extends Spaceship {

  private physics: IPhysics;

  public maxSpeed: number = 50;

  public lastHitBy: SpaceshipEntity;

  public activationTime: number = 0;

  public silentRemove: boolean = false;

  private minorGoal: number;
  private majorGoal: number;

  public movementGoal: MovementGoal;

  public get curSpeed(): number {
    return CMath.len(this.speed);
  }

  public get acceleration(): number {
    return this.maxSpeed / (this.timeToMaxSpeed * this.mass);
  }

  constructor(spaceship: Spaceship) {
    super(spaceship.id, spaceship.color);

    this.movementGoal = new MovementGoalFreeFly();

    this.physics = new HybridPhysics();
  }

  public iterate(delta: number) {
    //this.physics.iterate(this, delta);
    this.activationProgress = 0;
    const input = this.movementGoal.iterate(this, delta);

    this.accel = input.a;
    this.omega = input.r;



    if ( this.curSpeed > input.vCap * this.maxSpeed) {
      this.speed.x = this.speed.x * input.vCap * this.maxSpeed / this.curSpeed;
      this.speed.y = this.speed.y * input.vCap * this.maxSpeed / this.curSpeed;
    }


    this.iterateStructure(delta);

    this.power += this.energyRechargeRate * delta;

    this.power = this.power <= this.energyCapacity ? this.power : this.energyCapacity;

    this.health = this.health <= 150 ? this.health : 150;

    this.fitting.fitting.forEach( (eq: ShipEquipmentEntity) => {
      eq.iterate(this, delta);
    });
  }

  private iterateStructure(delta: number) {
    if (this.actionUseStructure === true) {

      if ( this.targetStructure === undefined)
        return;

      const dir = CMath.sub(this.position, this.targetStructure.position);
      if (CMath.len(dir) < this.targetStructure.activationRange) {
        this.activationTime += delta;
      } else {
        this.activationTime = 0;
      }


      if ( this.activationTime > this.targetStructure.activationDuration) {
        (<StructureEntity> this.targetStructure).onActivateStructure(this);
      }

    } else {
      this.activationTime = 0;
    }
  }

}
