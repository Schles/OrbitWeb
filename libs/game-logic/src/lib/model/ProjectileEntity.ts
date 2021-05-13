import { CMath, GameIterable, Projectile } from '@orbitweb/common';
import { SpaceshipEntity } from './SpaceshipEntity';
import { GameLogic } from '@orbitweb/game-logic';

export class ProjectileEntity extends Projectile implements GameIterable {

  protected range: number;
  protected damage: number;

  constructor(id: string, public source: SpaceshipEntity) {
    super(id, source.color);
  }

  public iterateContext(delta: number, context: GameLogic) {
    const targets = (context.players as SpaceshipEntity[])
      .filter( (p) => this.isInRange(p));


    if ( targets.length > 0) {
      targets.forEach((p) => this.takeHit(p));
      this.afterHit();
    }

    this.iterate(delta);
  }

  protected isInRange(player: SpaceshipEntity): boolean {
    const len = CMath.len(CMath.sub(player.position, this.position));
    return len < this.range;
  }

  protected takeHit(player: SpaceshipEntity): void {
    console.log('HIT', player.id);
    player.takeDamage(this.damage, this.source);

  }

  protected afterHit() {
    this.timeToLife = 0;
  }


  public iterate(delta: number) {
    super.iterate(delta);
  }
}
