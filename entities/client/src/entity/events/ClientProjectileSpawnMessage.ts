import { AssetManager, Client, GameFactory, ProjectileSpawnMessage } from '@orbitweb/common';
import {
  ClientMessageRecieved,
  GameManagerClient,
  Laser,
  ProjectileGO,
} from '@orbitweb/game-objects';

@Client("EVENT", "projectileSpawnMessage")
export class ClientProjectileSpawnMessage extends ClientMessageRecieved<ProjectileSpawnMessage> {
  constructor(message: ProjectileSpawnMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    const source = context.players.find((p) => p.id === this.message.source);

    if (source !== undefined) {
      let projectileGO: ProjectileGO;
      if (this.message.projType === 'laser') {
        projectileGO = new Laser(this.message.id, source, {
          x: this.message.x,
          y: this.message.y,
        });
      } else {
        const config = AssetManager.getValue(this.message.projType);
        projectileGO = GameFactory.instantiate('CLIENT', 'PROJECTILE', this.message.projType, this.message, source, config);
      }


      if (context.projectiles.findIndex((p) => p.id === projectileGO.id) < 0) {
        context.projectiles.push(projectileGO);

        projectileGO.onInit();
        context.renderer.gameStage.addChild(projectileGO.gameObject);
      }
    }
  }
}
