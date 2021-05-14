import { Client, Vector2 } from '@orbitweb/common';
import { Projectile } from '@orbitweb/common';
import { SpaceshipGO } from './SpaceshipGO';
import { Physics } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';
import { GameIterable } from '@orbitweb/common';


export class ProjectileGO extends Projectile implements GameIterable {
  public gameObject: Container;
  public damageRange: number = 30;
  protected lineObject: Graphics;

  constructor(id: string, public source: SpaceshipGO) {
    super(id, source.color);

    this.gameObject = this.getGameObject();
  }

  public iterate(delta: number) {
    Physics.iterate(this, delta);
    this.iterPhysics();
  }

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.lineObject = new Graphics();

    // Set the fill color
    //this.lineObject.lineStyle(5, 0xFF00FF);
    //cannonCont.addChild(this.lineObject);

    //this.drawLine(this.source.position, this.target.position);

    return cannonCont;
  }

  public drawLine(start: Vector2, end: Vector2) {
    const c = string2hex(this.color);

    this.lineObject.clear();
    this.lineObject.lineStyle(2, c);
    this.lineObject.moveTo(start.x, start.y);
    this.lineObject.lineTo(end.x, end.y);
  }

  private iterPhysics() {
    this.gameObject.x = this.position.x;
    this.gameObject.y = this.position.y;

    this.gameObject.rotation = this.rotation;
  }
}
