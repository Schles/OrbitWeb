import {ClientMessageRecieved} from "./MessageRecieved";
import {SpaceShooter} from "../../engine/SpaceShooter";

import {ProjectileDestroyMessage} from "../../../../../shared/src/message/game/projectile/ProjectileDestroyMessage";

export class ClientProjectileDestroyMessage extends ClientMessageRecieved<ProjectileDestroyMessage> {

  constructor(message: ProjectileDestroyMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
    const projectile = context.projectiles.find ( (p) => p.id === this.message.id);

    if (projectile !== undefined) {
      context.destroyProjectile(projectile);
    }
  }
}
