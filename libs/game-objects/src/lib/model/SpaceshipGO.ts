import {Spaceship} from "@orbitweb/common";
import {Physics} from "@orbitweb/common";
import {CMath} from "@orbitweb/common";
import {Vector2} from "@orbitweb/common";
import { Container, Filter, Graphics, Matrix } from "pixi.js";
import {NameplateGO} from "./NameplateGO";
import { string2hex } from "@pixi/utils"

export class SpaceshipGO extends Spaceship {

  public actionOrbitTarget: boolean = false;
  public actionKeepAtRange: boolean = false;

  public gameObject: Container;

  public playerLayer: Container;
  public uiLayer: Container;
  public equipmentLayer: Container;

  public progressLayer: Graphics;
  public health = 100;

  private iColor;



  constructor(spaceship: Spaceship) {
    super(spaceship.id, spaceship.color);
    this.gameObject = this.getGameObject();
    this.gameObject.filters = [];
  }

  private view: Matrix;
  private model: Matrix

  private cameraCenterPoint;

  public setCameraCenter(point) {
    this.cameraCenterPoint = point;
  }

  public setMatrix(view: Matrix, model: Matrix) {
    this.view = view;
    this.model = model;
  }

  public iterate(delta: number) {
    Physics.iterate(this, delta);

    this.iterateGraphics();
  }

  private nameplate: NameplateGO;

  private filter: Filter;

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


    // target

    this.equipmentLayer = new Graphics();
    this.equipmentLayer.filters = [];

    // text

    this.uiLayer = new Container();

    this.nameplate = new NameplateGO(this);
    /*

     */


    this.uiLayer.addChild(this.nameplate);



    parentObject.addChild(this.playerLayer);
    parentObject.addChild(this.uiLayer);
    parentObject.addChild(this.equipmentLayer);
    return parentObject;
  }

  private buildSixEck( pos: Vector2): number[] {
    const len = 50;


    const dir:Vector2 = {x: len, y: 0};

    const toRad = (deg) => {
      return deg / 180 * Math.PI;
    };

    const z = pos;
    const a = CMath.add(pos, CMath.rotate(dir, 0));
    const b = CMath.add(pos, CMath.rotate(dir, toRad(60)));
    const c = CMath.add(pos, CMath.rotate(dir, toRad(120)));
    const d = CMath.add(pos, CMath.rotate(dir, toRad(180)));
    const e = CMath.add(pos, CMath.rotate(dir, toRad(240)));
    const f = CMath.add(pos, CMath.rotate(dir, toRad(300)));

    const buffer = [
      z.x, z.y, 0,
      a.x, a.y, 0,
      b.x, b.y, 0,
      c.x, c.y, 0,
      d.x, d.y, 0,
      e.x, e.y, 0,
      f.x, f.y, 0];

    //return buffer;

    const b2 = [
      pos.x, pos.y - len, 0,
      pos.x, pos.y + len, 0,
      pos.y - 2*len, pos.y, 0
    ]

    return b2;


  }

  public iterateGraphics() {
    this.gameObject.x = this.position.x;
    this.gameObject.y = this.position.y;

    this.playerLayer.rotation = this.rotation;

    this.progressLayer.clear();

    if ( this.activationProgress > 0) {
      this.progressLayer.beginFill(this.iColor);
      this.progressLayer.drawCircle(0, 0, this.activationProgress * this.radius);
      this.progressLayer.endFill();
    }

    this.nameplate.update(this);
    //this.nameplate.text = this.health.toFixed(0) + " " + this.id;

  }

  public removeTarget() {
    this.targetPlayer = undefined;
    this.actionOrbitTarget = false;
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
