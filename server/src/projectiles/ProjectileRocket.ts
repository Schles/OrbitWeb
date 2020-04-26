import {ProjectileEntity} from "../entities/ProjectileEntity";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";
import {Physics} from "../../../shared/src/physics/Physics";
import {Vector2} from "../../../shared/src/util/VectorInterface";
import {CMath} from "../utils/CMath";
import {TimedAbility} from "../../../shared/src/model/TimedAbility";
import {Particle} from "../../../shared/src/model/Particle";

export class ProjectileRocket extends ProjectileEntity {


  private minDistanceToExplode: number = 30.0;
  private maxSpeed: number = 40;
  private damage: number = 20;

  constructor(id: string, source: SpaceshipEntity, target: SpaceshipEntity) {
    super(id, source, target);
    this.type = "rocketProjectile";
    this.duration = 20;
    this.timeToLife = 5;
  }


  onInit() {
    super.onInit();

    this.position.x = this.source.position.x;
    this.position.y = this.source.position.y;

  }

  iterate(delta: number) {
    super.iterate(delta);
/*
    this.speed.x = 10.0;
    this.speed.y = 3.0;
*/

    const distVector = CMath.sub(this.target.position, this.position);

    const len = CMath.len(distVector);

    if ( len < this.minDistanceToExplode) {
      this.target.health -= this.damage;
      this.target.lastHitBy = this.source;
      this.timeToLife = 0;
      return;
    }
 
    const dir: Vector2 = CMath.normalize(distVector);

   const orient: Vector2 = this.getOrientation(this);

   const angle: number = CMath.angle(dir, {x: 1, y: 0});

    this.rotation = angle;

    this.speed = CMath.scale(dir, this.maxSpeed);

    Physics.iterate(this, delta);
  }

  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({x: 1, y: 0}, particle.rotation);
  }

}
