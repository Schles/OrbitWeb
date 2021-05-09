import { GameIterable, Projectile } from '@orbitweb/common';
import { SpaceshipEntity } from './SpaceshipEntity';

export class ProjectileEntity extends Projectile implements GameIterable {
  constructor(id: string, public source: SpaceshipEntity) {
    super(id, source.color);
  }

  public iterate(delta: number) {
    super.iterate(delta);
  }
}
