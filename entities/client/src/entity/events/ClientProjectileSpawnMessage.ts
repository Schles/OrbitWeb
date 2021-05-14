import {
  AssetManager,
  Client,
  MessageRecieved,
  GameFactory,
  GameManager,
  ProjectileSpawnMessage
} from '@orbitweb/common';
import { SpaceshipGO } from '../../model/SpaceshipGO';
import { ProjectileGO } from '../../model/ProjectileGO';
import { Laser } from '../projectiles/Laser';
import { ClientMessageRecieved } from '../../model/ClientMessageRecieved';
import { World } from '@orbitweb/renderer';


@Client("EVENT", "projectileSpawnMessage")
export class ClientProjectileSpawnMessage extends ClientMessageRecieved<ProjectileSpawnMessage> {
  constructor(message: ProjectileSpawnMessage) {
    super(message);
  }


  onRecieveWithRenderer(context: GameManager, renderer: World) {

    const source = context.players.find((p) => p.id === this.message.source) as SpaceshipGO;

    if (source !== undefined) {
      let projectileGO: ProjectileGO;
      if (this.message.projType === 'laser') {
        projectileGO = new Laser(this.message.id, source, {
          x: this.message.x,
          y: this.message.y,
        });
      } else {
        const config = AssetManager.getValue(this.message.projType+"Launcher");
        projectileGO = GameFactory.instantiate('CLIENT', 'PROJECTILE', this.message.projType, this.message, source, config);
      }


      if (context.projectiles.findIndex((p) => p.id === projectileGO.id) < 0) {
        context.projectiles.push(projectileGO);

        projectileGO.onInit();
        renderer.gameStage.addChild(projectileGO.gameObject);
      }
    }
  }
}
