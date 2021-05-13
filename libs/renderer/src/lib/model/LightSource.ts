import { CGame, GameIterable, Vector2 } from '@orbitweb/common';

export class LightSource implements GameIterable{

  public timeToLife: number;

  public get progress(): number {
    let p = 1 - this.timeToLife / this.duration;

    if ( p < 0.5) {
      p = 2 * p;
    } else {
      p = 1 - p;
    }

    return CGame.clamp(p, 0, 1);
  }

  constructor(public position: Vector2, public radius: number, private duration: number) {
    this.timeToLife = duration;
  }

  iterate(delta: number) {
    this.timeToLife -= delta;
  }




}