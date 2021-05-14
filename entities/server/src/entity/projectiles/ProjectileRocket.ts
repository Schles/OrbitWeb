
import { Physics, Server, ShipEquipmentDBValue } from '@orbitweb/common';
import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';
import { Particle } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';

@Server("PROJECTILE", "Rocket")
export class ProjectileRocket extends ProjectileEntity {
  private maxSpeed: number;

  constructor(
    source: SpaceshipEntity,
    value: ShipEquipmentDBValue,
    private target: SpaceshipEntity
  ) {
    super(undefined, source);
    this.type = 'Rocket';

    if ( value.projectile) {
      this.damage = value.projectile.damage;
      this.range = value.projectile.damageRange;
      this.timeToLife = value.projectile.timeToLife;
    }

    this.maxSpeed = value?.custom?.maxSpeed ? value.custom.maxSpeed : 40;
  }

  onInit() {
    super.onInit();

    this.position.x = this.source.position.x;
    this.position.y = this.source.position.y;
  }


  protected isInRange(player: SpaceshipEntity): boolean {
    return player.id !== this.source.id && super.isInRange(player);
  }

  iterate(delta: number) {
    super.iterate(delta);

    if ( this.target ) {

      const distVector = CMath.sub(this.target.position, this.position);
      const dir: Vector2 = CMath.normalize(distVector);
      const angle: number = CMath.angle(dir, { x: 1, y: 0 });

      this.rotation = angle;

      this.speed = CMath.scale(dir, this.maxSpeed);
    }
    Physics.iterate(this, delta);
  }

  public getOrientation(particle: Particle): Vector2 {
    return CMath.rotate({ x: 1, y: 0 }, particle.rotation);
  }
}
