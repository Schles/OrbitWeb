
import { Physics, Server, ShipEquipmentDBValue } from '@orbitweb/common';
import { Vector2 } from '@orbitweb/common';
import { GameLogic } from '@orbitweb/game-logic';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';

@Server("PROJECTILE", "Bomb")
export class ProjectileBomb extends ProjectileEntity {
  private minDistanceToExplode: number;
  private maxSpeed: number;


  private targetPosition: Vector2;

  constructor(
    source: SpaceshipEntity,
    value: ShipEquipmentDBValue
  ) {
    super(undefined, source);
    this.type = 'Bomb';

    this.targetPosition = source.position;

    console.log(value);

    if ( value.projectile) {
      this.damage = value.projectile.damage;
      this.range = value.projectile.damageRange;
      this.timeToLife = 0;
    }





    this.position.x = this.source.position.x;
    this.position.y = this.source.position.y;
    this.radius = this.range;

  }


  protected isInRange(player: SpaceshipEntity): boolean {
    return this.source.id !== player.id && super.isInRange(player);
  }

  protected afterHit() {

  }
}
