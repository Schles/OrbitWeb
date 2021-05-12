import { Client, ProjectileDestroyMessage } from '@orbitweb/common';
import { ClientMessageRecieved, GameManagerClient } from '@orbitweb/game-objects';

@Client("EVENT", "projectileDestroyMessage")
export class ClientProjectileDestroyMessage extends ClientMessageRecieved<ProjectileDestroyMessage> {
  constructor(message: ProjectileDestroyMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    const projectile = context.projectiles.find(
      (p) => p.id === this.message.id
    );

    if (projectile !== undefined) {
      if (context.projectiles.findIndex((p) => p.id === projectile.id) > -1) {
        context.renderer.fxStage.removeChild(projectile.gameObject);

        const p = context.projectiles.findIndex(
          (value) => value.id === projectile.id
        );
        if (p !== undefined) {
          projectile.onDestroy();
          context.projectiles.splice(p, 1);
        }
      }
    }
  }
}
