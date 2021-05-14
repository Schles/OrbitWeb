import { CMath, EventLogMessage, GameIterable, GameManager, Projectile } from '@orbitweb/common';
import { SpaceshipEntity } from './SpaceshipEntity';
import { GameLogic } from '@orbitweb/game-logic';


export class ProjectileEntity extends Projectile implements GameIterable {

  protected range: number;
  protected damage: number;

  constructor(id: string, public source: SpaceshipEntity) {
    super(id, source.color);
  }

  public iterateContext(delta: number, context: GameManager) {
    const targets = (context.players as SpaceshipEntity[])
      .filter( (p) => this.isInRange(p));


    if ( targets.length > 0) {
      targets.forEach((p) => this.takeHit(p, context));
      this.afterHit();
    }

    this.iterate(delta);
  }

  protected isInRange(player: SpaceshipEntity): boolean {
    const len = CMath.len(CMath.sub(player.position, this.position));
    return len < this.range;
  }

  protected takeHit(player: SpaceshipEntity, context: GameManager): void {
    const dmgTaken = player.takeDamage(this.damage, this.source);
    const eventLog = new EventLogMessage("PLAYER_DAMAGE_TAKEN", {damageTaken: dmgTaken, equipmentSource: this.type, source: this.source.id, target: player.id});
    context.send(eventLog);
  }

  protected afterHit() {
    this.timeToLife = 0;
  }


  public iterate(delta: number) {
    super.iterate(delta);
  }
}
