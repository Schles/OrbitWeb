import {Particle} from "../Particle";

export class ParticleEffect extends Particle {
  public timeToLive: number = 0;
  public lifeTime: number = 3;
  public sprite: PIXI.Sprite;
}
