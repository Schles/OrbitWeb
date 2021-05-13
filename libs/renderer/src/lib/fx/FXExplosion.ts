import { FXEffect } from './Effect';
import { Vector2 } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';

export class FXExplosion extends FXEffect {

  private g: Graphics;

  constructor(position: Vector2, duration: number, private radius: number) {
    super(position, duration);

    this.gameObject = this.createGO();
    this.gameObject.x = position.x;
    this.gameObject.y = position.y;


  }

  iterate(delta: number) {
    super.iterate(delta);

    const progress = (1 - this.timeToLife);

    const size = this.radius;

    this.g.clear();
    this.g.beginFill(0xFF0000, 0.2);
    this.g.drawCircle(0, 0, size * progress);
    this.g.endFill();

  }

  private createGO(): Container {
    const container = new Container();
    this.g = new Graphics();



    //const c = string2hex(this.source.color);


    container.addChild(this.g);

      return container;
  }
}