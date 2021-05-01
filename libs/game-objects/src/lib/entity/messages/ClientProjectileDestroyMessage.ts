import { ClientMessageRecieved } from "../../model/MessageRecieved";

import {ProjectileDestroyMessage} from "@orbitweb/common";
import { GameManager } from "../../GameManager";

export class ClientProjectileDestroyMessage extends ClientMessageRecieved<ProjectileDestroyMessage> {

  constructor(message: ProjectileDestroyMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const projectile = context.projectiles.find ( (p) => p.id === this.message.id);

    if (projectile !== undefined) {
      context.destroyProjectile(projectile);
    }
  }
}
