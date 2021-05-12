import { Client, ProjectileSpawnMessage } from '@orbitweb/common';
import {
  ClientMessageRecieved,
  GameManagerClient,
  Laser,
  ProjectileGO,
  Rocket,
} from '@orbitweb/game-objects';
import { Mine } from '../../../../../libs/game-objects/src/lib/entity/projectiles/Mine';

@Client("EVENT", "projectileSpawnMessage")
export class ClientProjectileSpawnMessage extends ClientMessageRecieved<ProjectileSpawnMessage> {
  constructor(message: ProjectileSpawnMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    const source = context.players.find((p) => p.id === this.message.source);

    if (source !== undefined) {
      let projectileGO: ProjectileGO;
      if (this.message.projType === 'rocketProjectile') {
        projectileGO = new Rocket(this.message.id, source);
      } else if (this.message.projType === 'mineProjectile') {
        projectileGO = new Mine(this.message.id, source, {
          x: this.message.x,
          y: this.message.y,
        });
      } else if (this.message.projType === 'laserProjectile') {
        projectileGO = new Laser(this.message.id, source, {
          x: this.message.x,
          y: this.message.y,
        });
      } else {
        projectileGO = new ProjectileGO(this.message.id, source);
      }

      if (context.projectiles.findIndex((p) => p.id === projectileGO.id) < 0) {
        context.projectiles.push(projectileGO);

        projectileGO.onInit();
        context.renderer.fxStage.addChild(projectileGO.gameObject);
      }
    }
  }
}
