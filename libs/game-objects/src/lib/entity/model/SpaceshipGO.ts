import { GameIterable, Spaceship } from '@orbitweb/common';
import { Physics } from '@orbitweb/common';
import { Container, Graphics } from 'pixi.js';
import { string2hex } from '@pixi/utils';

import { TargetingLayer } from '../../ui/TargetingContainer';

export class SpaceshipGO extends Spaceship implements GameIterable {
  public actionOrbitTarget: boolean = false;
  public actionKeepAtRange: boolean = false;

  public gameObject: Container;


  public playerLayer: Container;
  public equipmentLayer: Container;

  private progressLayer: Graphics;
  public health = 100;

  private iColor;

  constructor(spaceship: Spaceship) {
    super(spaceship.id, spaceship.color);
    this.gameObject = this.getGameObject();
    this.gameObject.filters = [];


  }

  public iterate(delta: number) {
    Physics.iterate(this, delta);

    this.iterateGraphics();

    this.fitting.fitting.forEach((fit) => {
      fit.iterate(this, delta);
    });
  }

  public getGameObject(): Container {
    const parentObject: Container = new Container();

    // Player

    this.playerLayer = new Container();
    this.playerLayer.filters = [];

    //const playerRadius = this.shipSize;
    const playerRadius = this.radius;

    const graphics: Graphics = new Graphics();
    const c = string2hex(this.color);
    graphics.beginFill(c);
    graphics.drawCircle(0, 0, playerRadius); // drawCircle(x, y, radius)
    graphics.endFill();

    this.playerLayer.addChild(graphics);

    const look: Graphics = new Graphics();
    this.iColor = string2hex(this.invertColor(this.color));
    // Set the fill color
    look.beginFill(this.iColor); // Red

    // Draw a circle

    look.drawRect(0, 0, 2, playerRadius);

    look.endFill();

    this.playerLayer.addChild(look);

    this.progressLayer = new Graphics();
    this.playerLayer.addChild(this.progressLayer);

    this.equipmentLayer = new Graphics();
    this.equipmentLayer.filters = [];

    parentObject.addChild(this.playerLayer);
    parentObject.addChild(this.equipmentLayer);
    return parentObject;
  }

  private iterateGraphics() {
    this.gameObject.x = this.position.x;
    this.gameObject.y = this.position.y;

    this.playerLayer.rotation = this.rotation;

    this.progressLayer.clear();

    if (this.activationProgress > 0) {
      this.progressLayer.beginFill(this.iColor);
      this.progressLayer.drawCircle(
        0,
        0,
        this.activationProgress * this.radius
      );
      this.progressLayer.endFill();
    }
  }

  public invertColor(hex) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  public padZero(str, len = 2) {
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
}
