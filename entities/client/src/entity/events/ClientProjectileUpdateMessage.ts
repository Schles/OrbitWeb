import { Client, ProjectileUpdateMessage } from '@orbitweb/common';
import {
  ClientMessageRecieved,
  GameManagerClient,
  ProjectileGO,
} from '@orbitweb/game-objects';

@Client("EVENT", "projectileUpdateMessage")
export class ClientProjectileUpdateMessage extends ClientMessageRecieved<ProjectileUpdateMessage> {
  constructor(message: ProjectileUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    //console.log(msg);
    const projectile: ProjectileGO = context.projectiles.find(
      (proj) => proj.id === this.message.id
    );

    if (projectile === undefined) {
      return;
    }

    projectile.position.x = this.message.x;
    projectile.position.y = this.message.y;

    projectile.speed.x = this.message.speedX;
    projectile.speed.y = this.message.speedY;

    projectile.rotation = this.message.rotation;
  }
}
