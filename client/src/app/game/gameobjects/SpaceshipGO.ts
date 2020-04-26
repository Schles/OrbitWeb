
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {CannonGO} from "./CannonGO";

export class SpaceshipGO extends Spaceship {

  public actionOrbitTarget: boolean = false;
  public actionKeepAtRange: boolean = false;

  public gameObject: PIXI.Container;

  public playerLayer: PIXI.Container;
  public uiLayer: PIXI.Container;
  public equipmentLayer: PIXI.Container;

  public targetLayer: PIXI.Graphics;
  public health = 100;




  constructor(spaceship: Spaceship) {
    super(spaceship.id, spaceship.color);
    this.gameObject = this.getGameObject();
    this.gameObject.filters = [];
  }

  public iterate(delta: number) {
    this.iterateGraphics();
  }

  private nameplate: PIXI.Text;

  public getGameObject(): PIXI.Container {
    const parentObject: PIXI.Container = new PIXI.Container();

    // Player

    this.playerLayer = new PIXI.Container();
    this.playerLayer.filters = [];

    //const playerRadius = this.shipSize;
    const playerRadius = 10;

    const graphics: PIXI.Graphics = new PIXI.Graphics();
    const c = PIXI.utils.string2hex(this.color);
    graphics.beginFill(c);
    graphics.drawCircle(0, 0, playerRadius); // drawCircle(x, y, radius)
    graphics.endFill();

    this.playerLayer.addChild(graphics);



    const look: PIXI.Graphics = new PIXI.Graphics();

    // Set the fill color
    look.beginFill(c); // Red

    // Draw a circle
    look.lineStyle(1, c);
    look.moveTo(-playerRadius, 0);
    look.lineTo(0, 3 * playerRadius);
    look.lineTo(playerRadius, 0);
    look.endFill();




    this.playerLayer.addChild(look);




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

    this.nameplate.text = this.health.toFixed(0) + " " + this.id;

  }

  public removeTarget() {
    this.targetPlayer = undefined;
    this.actionOrbitTarget = false;
  }

}
