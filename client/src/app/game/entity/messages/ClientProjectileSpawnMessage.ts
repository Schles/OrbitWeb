import {ClientMessageRecieved} from "../../model/MessageRecieved";
import {SpaceShooter} from "../../SpaceShooter";
import {ProjectileSpawnMessage} from "../../../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {ProjectileGO} from "../../model/ProjectileGO";
import {Rocket} from "../projectiles/Rocket";

export class ClientProjectileSpawnMessage extends ClientMessageRecieved<ProjectileSpawnMessage> {

  constructor(message: ProjectileSpawnMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {

    const source = context.players.find( (p) => p.id === this.message.source);
    const target = context.players.find( (p) => p.id === this.message.target);

    if ( source !== undefined && target !== undefined) {
      let projectileGO: ProjectileGO;
      if ( this.message.projType === "rocketProjectile")
        projectileGO = new Rocket(this.message.id, source, target);
      else
        projectileGO = new ProjectileGO(this.message.id, source, target);

      context.spawnProjectile(projectileGO);
    }

  }
}
