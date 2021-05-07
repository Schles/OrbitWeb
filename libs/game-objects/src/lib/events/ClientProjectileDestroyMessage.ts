

import { ProjectileDestroyMessage } from "@orbitweb/common";
import { ClientMessageRecieved, GameManager } from "@orbitweb/game-objects";


export class ClientProjectileDestroyMessage extends ClientMessageRecieved<ProjectileDestroyMessage> {

  constructor(message: ProjectileDestroyMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const projectile = context.projectiles.find((p) => p.id === this.message.id);

    if (projectile !== undefined) {

      if (context.projectiles.findIndex((p) => p.id === projectile.id) > -1) {

        context.fxStage.removeChild(projectile.gameObject);

        const p = context.projectiles.findIndex(value => value.id === projectile.id);
        if (p !== undefined) {
          projectile.onDestroy();
          context.projectiles.splice(p, 1);
        }
      }
    }
  }
}
