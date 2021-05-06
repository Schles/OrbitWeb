import { ClientMessageRecieved } from "../../model/MessageRecieved";
import {ProjectileSpawnMessage} from "@orbitweb/common";
import {Rocket} from "../projectiles/Rocket";
import { ProjectileGO } from "../../model/ProjectileGO";
import { GameManager } from "../../manager/GameManager";

export class ClientProjectileSpawnMessage extends ClientMessageRecieved<ProjectileSpawnMessage> {

  constructor(message: ProjectileSpawnMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {

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
