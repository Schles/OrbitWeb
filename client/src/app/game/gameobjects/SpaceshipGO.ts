
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {CannonGO} from "./CannonGO";

export class SpaceshipGO extends Spaceship {

  public actionOrbitTarget: boolean = false;
  public actionKeepAtRange: boolean = false;

  public gameObject: PIXI.Container;

  public playerLayer: PIXI.Container;
  public uiLayer: PIXI.Container;

  public targetLayer: PIXI.Graphics;

  public cannon: CannonGO;

  public health = 100;




  constructor(spaceship: Spaceship) {
    super(spaceship.id, spaceship.color);
    this.cannon = new CannonGO(this);
    this.gameObject = this.getGameObject();

    //this.physics = new HybridPhysics();

    window.addEventListener(
      "keydown", (event) => {
        //



        if (event.key === "ArrowDown") {
          this.speedInput -= 0.1;
          if (this.speedInput < 0)
            this.speedInput = 0;
        } else if (event.key === "ArrowUp") {
          this.speedInput += 0.1;
          if (this.speedInput > 1)
            this.speedInput = 1;
        } else if (event.key === "PageUp") {
          this.orbitRadius += 50;
        } else if (event.key === "PageDown") {
          this.orbitRadius -= 50;

          if ( this.orbitRadius < 50)
            this.orbitRadius = 50;
        } else if (event.key === "R") {
          this.actionKeepAtRange = true;
          this.actionOrbitTarget = false;
        }


      });

  }

  public iterate(delta: number) {
    //this.physics.iterate(this, delta);

    //this.cannon.iterate(delta);
  }

  private nameplate: PIXI.Text;

  public getGameObject(): PIXI.Container {
    // Initialize the pixi Graphics class
    const parentObject: PIXI.Container = new PIXI.Container();


    const playerObject: PIXI.Container = new PIXI.Container();

    //const playerRadius = this.shipSize;
    const playerRadius = 10;

    const graphics: PIXI.Graphics = new PIXI.Graphics();

    // Set the fill color
    const c = PIXI.utils.string2hex(this.color);
    graphics.beginFill(c); // Red

    // Draw a circle
    graphics.drawCircle(0, 0, playerRadius); // drawCircle(x, y, radius)

    // Applies fill to lines and shapes since the last call to beginFill.
    graphics.endFill();

    playerObject.addChild(graphics);

    const look: PIXI.Graphics = new PIXI.Graphics();

    // Set the fill color
    look.beginFill(c); // Red

    // Draw a circle
    look.lineStyle(1, c);
    look.moveTo(-playerRadius, 0);
    look.lineTo(0, 3 * playerRadius);
    look.lineTo(playerRadius, 0);
    look.endFill();




    //playerObject.addChild(look);


    const cannonCont: PIXI.Container = this.cannon.gameObject;

    // target

    this.targetLayer = new PIXI.Graphics();



    playerObject.addChild(cannonCont);
    this.playerLayer = playerObject;

    // text

    const uiLayer: PIXI.Container = new PIXI.Container();

    this.nameplate = new PIXI.Text(this.id, {fontFamily : 'Arial', fontSize: 14, fill : 0xff1010, align : 'center'});
    this.nameplate.position.x = 20;
    this.nameplate.position.y = -50;
    uiLayer.addChild(this.nameplate);



    parentObject.addChild(playerObject);
    parentObject.addChild(uiLayer);
    parentObject.addChild(this.targetLayer);
    return parentObject;
  }

  public iterateGraphics() {
    this.gameObject.x = this.position.x;
    this.gameObject.y = this.position.y;

    this.playerLayer.rotation = this.rotation;

    this.nameplate.text = this.health.toFixed(0) + " " + this.id;

    if ( this.targetPlayer !== undefined) {
      this.renderTargeting();
    }

    this.cannon.iterateGraphics();
  }

  public removeTarget() {
    this.targetPlayer = undefined;
    this.actionOrbitTarget = false;
  }

  public renderTargeting() {


  }
}
