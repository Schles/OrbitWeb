import { GameIterable, Vector2 } from '@orbitweb/common';
import { Container } from 'pixi.js';

export class FXEffect implements GameIterable{
  gameObject: Container;

  constructor(protected position: Vector2, public timeToLife: number) {
  }

  iterate(delta: number) {
    this.timeToLife -= delta;
  }




}