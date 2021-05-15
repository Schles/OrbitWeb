
import { CMath, EventLogMessage, GameManager, Server, ShipEquipmentDBValue } from '@orbitweb/common';
import { Vector2 } from '@orbitweb/common';
import { ProjectileEntity } from '../../model/ProjectileEntity';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

@Server("PROJECTILE", "Bomb")
export class ProjectileBomb extends ProjectileEntity {
  private targetPosition: Vector2;

  constructor(
    source: SpaceshipEntity,
    value: ShipEquipmentDBValue
  ) {
    super(undefined, source);
    this.type = 'Bomb';

    this.targetPosition = source.position;

    if ( value.projectile) {
      this.damage = value.projectile.damage;
      this.range = value.projectile.damageRange;
      this.timeToLife = 0;
    }





    this.position.x = this.source.position.x;
    this.position.y = this.source.position.y;
    this.radius = this.range;

  }

  protected takeHit(player: SpaceshipEntity, context: GameManager): void {


    const distance = CMath.len(CMath.sub(player.position, this.position));
    const scaling = distance / this.range;

    const dmgTaken = player.takeDamage(Math.round(this.damage * (1 - scaling)), this.source);
    const eventLog = new EventLogMessage("PLAYER_DAMAGE_TAKEN", {damageTaken: dmgTaken, equipmentSource: this.type, source: this.source.id, target: player.id});
    context.send(eventLog);
  }

  protected isInRange(player: SpaceshipEntity): boolean {
    return this.source.id !== player.id && super.isInRange(player);
  }

  protected afterHit() {

  }
}
