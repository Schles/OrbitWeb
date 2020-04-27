import {Spaceship} from "../../../shared/src/model/Spaceship";
import {IPhysics, PhysicsInput} from "../physics/impl/IPhysics";
import {HybridPhysics} from "../physics/impl/HybridPhysics";
import {Vector2} from "../../../shared/src/util/VectorInterface";
import {ShipEquipmentEntity} from "./ShipEquipmentEntity";

export class SpaceshipEntity extends Spaceship {

  private physics: IPhysics;

  public maxSpeed: number = 50;

  public lastHitBy: SpaceshipEntity;

  public get acceleration(): number {
    return this.maxSpeed / (this.timeToMaxSpeed);
  }

  constructor(spaceship: Spaceship) {
    super(spaceship.id, spaceship.color);

    this.physics = new HybridPhysics();
  }

  public moveTo(target: Vector2, stopAtTarget?:boolean): PhysicsInput {
    return this.physics.moveTo(this, target, stopAtTarget);
  }

  public iterate(delta: number) {
    this.physics.iterate(this, delta);

    this.power += this.energyRechargeRate * delta;

    this.power = this.power <= this.energyCapacity ? this.power : this.energyCapacity;

    this.health = this.health <= 150 ? this.health : 150;

    this.fitting.fitting.forEach( (eq: ShipEquipmentEntity) => {
      eq.iterate(this, delta);
    });
  }


}
