import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {Physics} from "../../../../../shared/src/physics/Physics";

export class SpaceshipGO extends Spaceship {

  public actionOrbitTarget: boolean = false;
  public actionKeepAtRange: boolean = false;

  public gameObject: PIXI.Container;

  public playerLayer: PIXI.Container;
  public uiLayer: PIXI.Container;
  public equipmentLayer: PIXI.Container;

  public progressLayer: PIXI.Graphics;
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
  }

  private nameplate: PIXI.Text;

  public getGameObject(): PIXI.Container {
    const parentObject: PIXI.Container = new PIXI.Container();

    // Player

    this.playerLayer = new PIXI.Container();
    this.playerLayer.filters = [];

    //const playerRadius = this.shipSize;
    const playerRadius = this.radius;

    const graphics: PIXI.Graphics = new PIXI.Graphics();
    const c = PIXI.utils.string2hex(this.color);
    graphics.beginFill(c);
    graphics.drawCircle(0, 0, playerRadius); // drawCircle(x, y, radius)
    graphics.endFill();

    this.playerLayer.addChild(graphics);



    const look: PIXI.Graphics = new PIXI.Graphics();
    this.iColor = PIXI.utils.string2hex(this.invertColor(this.color));
    // Set the fill color
    look.beginFill(this.iColor); // Red

    // Draw a circle

    look.drawRect(0, 0, 2, playerRadius);

    look.endFill();




    this.playerLayer.addChild(look);

    this.progressLayer = new PIXI.Graphics();
    this.playerLayer.addChild(this.progressLayer);


    // target

    this.equipmentLayer = new PIXI.Graphics();
    this.equipmentLayer.filters = [];

    // text

    this.uiLayer = new PIXI.Container();

    this.nameplate = new PIXI.Text(this.id, {fontFamily : 'Arial', fontSize: 14, fill : 0xff1010, align : 'center'});
    this.nameplate.position.x = 20;
    this.nameplate.position.y = -50;
    this.uiLayer.addChild(this.nameplate);



    parentObject.addChild(this.playerLayer);
    parentObject.addChild(this.uiLayer);
    parentObject.addChild(this.equipmentLayer);
    return parentObject;
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

    this.nameplate.text = this.health.toFixed(0) + " " + this.id;

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
