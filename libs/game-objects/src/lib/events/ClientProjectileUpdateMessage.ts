
import {ProjectileUpdateMessage} from "@orbitweb/common";
import { ClientMessageRecieved, GameManager, ProjectileGO } from "@orbitweb/game-objects";


export class ClientProjectileUpdateMessage extends ClientMessageRecieved<ProjectileUpdateMessage> {

  constructor(message: ProjectileUpdateMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    //console.log(msg);
    const projectile: ProjectileGO = context.projectiles.find( (proj) => proj.id === this.message.id);

    if ( projectile === undefined) {
      return;
    }

    projectile.position.x = this.message.x;
    projectile.position.y = this.message.y;

    projectile.speed.x = this.message.speedX;
    projectile.speed.y = this.message.speedY;

    projectile.rotation = this.message.rotation;

  }
}
