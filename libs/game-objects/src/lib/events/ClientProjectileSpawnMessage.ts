import { ProjectileSpawnMessage } from "@orbitweb/common";
import { ClientMessageRecieved, GameManager, ProjectileGO, Rocket } from "@orbitweb/game-objects";

export class ClientProjectileSpawnMessage extends ClientMessageRecieved<ProjectileSpawnMessage> {

  constructor(message: ProjectileSpawnMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {

    const source = context.players.find((p) => p.id === this.message.source);
    const target = context.players.find((p) => p.id === this.message.target);

    if (source !== undefined && target !== undefined) {
      let projectileGO: ProjectileGO;
      if (this.message.projType === "rocketProjectile")
        projectileGO = new Rocket(this.message.id, source, target);
      else
        projectileGO = new ProjectileGO(this.message.id, source, target);


      if (context.projectiles.findIndex((p) => p.id === projectileGO.id) < 0) {
        context.projectiles.push(projectileGO);

        projectileGO.onInit();
        context.fxStage.addChild(projectileGO.gameObject);
      }
    }

  }
}
