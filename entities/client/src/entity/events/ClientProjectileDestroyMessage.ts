import { Client, ProjectileDestroyMessage } from '@orbitweb/common';
import { ClientMessageRecieved, GameManagerClient } from '@orbitweb/game-objects';
import { FXEffect } from '../../../../../libs/renderer/src/lib/fx/Effect';
import { FXExplosion } from '../../../../../libs/renderer/src/lib/fx/FXExplosion';
import { LightSource } from '../../../../../libs/renderer/src/lib/model/LightSource';

@Client("EVENT", "projectileDestroyMessage")
export class ClientProjectileDestroyMessage extends ClientMessageRecieved<ProjectileDestroyMessage> {
  constructor(message: ProjectileDestroyMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    const projectile = context.projectiles.find(
      (p) => p.id === this.message.id
    );

    if (projectile !== undefined) {
      if (context.projectiles.findIndex((p) => p.id === projectile.id) > -1) {
        context.renderer.gameStage.removeChild(projectile.gameObject);

        const fxEffect: FXEffect = new FXExplosion(projectile.position, 0.1, projectile.radius);

        context.addFXEffect(fxEffect);

        let a = projectile.position;





        const localP = context.renderer.foregroundStage.toGlobal(a);;


        console.log(localP);

        context.lights.push( new LightSource(localP, 200,  0.5));


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
