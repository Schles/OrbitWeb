
import { CMath, Physics, Server, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';
import { GameLogic } from '../../../../../libs/game-logic/src';

@Server("PROJECTILE", "Mine")
export class ProjectileMine extends ProjectileEntity {

  private damageRange: number;

  constructor(
    source: SpaceshipEntity,
    private value: ShipEquipmentDBValue
  ) {
    super(undefined, source);
    this.type = 'Mine'

    this.damage = value?.absolute ? value.absolute : 10;
    this.range = value?.range ? value.range : 30;
    this.damageRange = value?.custom?.damageRange ? value.custom.damageRange : this.range;
    this.timeToLife = value?.custom?.timeToLife ? value.custom.timeToLife : 150;

    this.position.x = this.source.position.x;
    this.position.y = this.source.position.y;

  }


  iterateContext(delta: number, context: GameLogic) {
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
