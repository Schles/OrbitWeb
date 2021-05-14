
import { CMath, GameManager, Server, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { ProjectileEntity } from '../../model/ProjectileEntity';


@Server("PROJECTILE", "Mine")
export class ProjectileMine extends ProjectileEntity {

  private damageRange: number;

  constructor(
    source: SpaceshipEntity,
    private value: ShipEquipmentDBValue
  ) {
    super(undefined, source);
    this.type = 'Mine'

    if ( value.projectile) {
      this.damage = value.projectile.damage;
      this.damageRange = value.projectile.damageRange;
      this.timeToLife = value.projectile.timeToLife;
    }

    this.range = value?.range ? value.range : 30;

    this.position.x = this.source.position.x;
    this.position.y = this.source.position.y;

  }


  iterateContext(delta: number, context: GameManager) {
    const targets = (context.players as SpaceshipEntity[])
      .filter( (p) => this.isInRange(p));


    if ( targets.length > 0) {

      (context.players as SpaceshipEntity[])
        .filter( (p) => {
          const len = CMath.len(CMath.sub(p.position, this.position));
          return this.source.id !== p.id && len < this.damageRange;
        }).forEach((p) => this.takeHit(p, context));
      this.afterHit();
    }

    this.iterate(delta);
  }

  protected isInRange(player: SpaceshipEntity): boolean {
    return this.source.id !== player.id && super.isInRange(player);
  }

  onInit() {
    super.onInit();


  }
}
