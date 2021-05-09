import { ProjectileEntity } from '../../model/ProjectileEntity';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { Physics, ShipEquipmentDBValue } from '@orbitweb/common';
import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';
import { Particle } from '@orbitweb/common';

export class ProjectileRocket extends ProjectileEntity {
  private minDistanceToExplode: number;
  private maxSpeed: number;
  private damage: number;

  constructor(
    id: string,
    source: SpaceshipEntity,
    private target: SpaceshipEntity,
    value: ShipEquipmentDBValue
  ) {
    super(id, source);
    this.type = 'rocketProjectile';
    this.duration = 20; // Still used?

    this.damage = value?.absolute ? value.absolute : 10;
    this.minDistanceToExplode = value?.custom?.minDistanceToExplode
      ? value.custom.minDistanceToExplode
      : 30;
    this.timeToLife = value?.custom?.timeToLife ? value.custom.timeToLife : 15;
    this.maxSpeed = value?.custom?.maxSpeed ? value.custom.maxSpeed : 40;
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

    if (len < this.minDistanceToExplode) {
      this.target.takeDamage(this.damage, this.source);
      this.timeToLife = 0;
      return;
    }

    const dir: Vector2 = CMath.normalize(distVector);

    const orient: Vector2 = this.getOrientation(this);

    const angle: number = CMath.angle(dir, { x: 1, y: 0 });

    this.rotation = angle;

    this.speed = CMath.scale(dir, this.maxSpeed);

    Physics.iterate(this, delta);
  }

  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({ x: 1, y: 0 }, particle.rotation);
  }
}
