
import { Physics, Server, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';

@Server("PROJECTILE", "Mine")
export class ProjectileMine extends ProjectileEntity {

  constructor(
    source: SpaceshipEntity,
    private value: ShipEquipmentDBValue
  ) {
    super(undefined, source);
    this.type = 'Mine'

    this.damage = value?.absolute ? value.absolute : 10;
    this.range = value?.custom?.minDistanceToExplode
      ? value.custom.minDistanceToExplode
      : 30;
    this.timeToLife = value?.custom?.timeToLife ? value.custom.timeToLife : 150;

    this.position.x = this.source.position.x;
    this.position.y = this.source.position.y;

  }


  protected isInRange(player: SpaceshipEntity): boolean {
    return this.source.id !== player.id && super.isInRange(player);
  }

  onInit() {
    super.onInit();


  }
}
