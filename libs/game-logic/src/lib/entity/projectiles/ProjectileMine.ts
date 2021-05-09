import { ProjectileEntity } from '../../model/ProjectileEntity';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { Physics, ShipEquipmentDBValue } from '@orbitweb/common';
import { Vector2 } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';
import { Particle } from '@orbitweb/common';
import { GameLogic } from '@orbitweb/game-logic';

export class ProjectileMine extends ProjectileEntity {
  private minDistanceToExplode: number;
  private maxSpeed: number;
  private damage: number;
  private targetPosition: Vector2;

  constructor(id: string, source: SpaceshipEntity, value: ShipEquipmentDBValue) {
    super(id, source);
    this.type = 'mineProjectile';
    this.duration = 20; // Still used? 

    this.targetPosition = source.position;

    this.damage = value?.absolute ? value.absolute : 10;
    this.minDistanceToExplode = value?.custom?.minDistanceToExplode ? value.custom.minDistanceToExplode : 30;
    this.timeToLife = value?.custom?.timeToLife ? value.custom.timeToLife : 150;
    this.maxSpeed = value?.custom?.maxSpeed ? value.custom.maxSpeed : 40;


  }

  onInit() {
    super.onInit();

    this.position.x = this.source.position.x;
    this.position.y = this.source.position.y;
  }

  public context: GameLogic;

  iterate(delta: number) {
    super.iterate(delta);
    /*
    this.speed.x = 10.0;
    this.speed.y = 3.0;
*/

    const players: SpaceshipEntity[] = this.context.players;

    const targetPlayer = players.filter((p) => p.id !== this.source.id).find((p) => {
      const len = CMath.len(CMath.sub(p.position, this.position));

      if (len < this.minDistanceToExplode) {
        return p;
      }
    });

    if (targetPlayer) {

      targetPlayer.takeDamage(this.damage, this.source);
      this.timeToLife = 0;
      console.log("HIT", targetPlayer.id);
      return;
    }
  }
}
