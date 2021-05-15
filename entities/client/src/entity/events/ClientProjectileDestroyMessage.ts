import { Client, MessageRecieved, GameManager, ProjectileDestroyMessage } from '@orbitweb/common';

import { FXEffect } from '../../../../../libs/renderer/src/lib/fx/Effect';
import { FXExplosion } from '../../../../../libs/renderer/src/lib/fx/FXExplosion';
import { LightSource } from '../../../../../libs/renderer/src/lib/model/LightSource';
import { ProjectileGO } from '../../model/ProjectileGO';
import { ClientMessageRecieved } from '../../model/ClientMessageRecieved';
import { World } from '@orbitweb/renderer';

@Client("EVENT", "projectileDestroyMessage")
export class ClientProjectileDestroyMessage extends ClientMessageRecieved<ProjectileDestroyMessage> {
  constructor(message: ProjectileDestroyMessage) {
    super(message);
  }


  onRecieveWithRenderer(context: GameManager, renderer: World) {
    console.log(this.message);

    const projectile = context.projectiles.find(
      (p) => p.id === this.message.id
    ) as ProjectileGO;

    if (projectile !== undefined) {
      if (context.projectiles.findIndex((p) => p.id === projectile.id) > -1) {
        renderer.gameStage.removeChild(projectile.gameObject);

        const localP = renderer.foregroundStage.toGlobal(projectile.position);
        renderer.lights.push( new LightSource(localP, projectile.damageRange,  0.5));


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
