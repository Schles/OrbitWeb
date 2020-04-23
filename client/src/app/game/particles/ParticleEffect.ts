import {Particle} from "../Particle";

export class ParticleEffect extends Particle {
  public timeToLive: number = 0;
  public lifeTime: number = 2;
  public sprite: PIXI.Sprite;
}
