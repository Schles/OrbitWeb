import {Particle} from "./Particle";
import * as math from 'mathjs';
import {CMath, Tangents, Vector2} from "./CMath";
import {compileNgModule} from "@angular/compiler";
import {Physics} from "./Physics";
import {Cannon} from "./Cannon";
import {Game} from "./Game";
import {PlayerMessage} from "../shared/player-message";
import {PlayerJoinedMessage} from "../shared/player-joined-message";
import {IPhysics} from "./impl/IPhysics";
import {ArcadePhysics} from "./impl/ArcadePhysics";
import {RealPhysics} from "./impl/RealPhysics";
import {HybridPhysics} from "./impl/HybridPhysics";

export class Spaceship extends Particle {

  public id;

  public color: string = "#00FF00";
  public maxSpeed: number = 50;

  public curSpeed: number = 0;

  public get acceleration(): number {
    return this.maxSpeed / (this.timeToMaxSpeed);
  }

  public timeToMaxSpeed = 2;

  public physics: IPhysics;

  public shipSize: number = 7;

  public speedInput: number = 1;
  public maxOmega: number = 1;

  private _targetPlayer: Spaceship;

  public set targetPlayer(target: Spaceship) {
    this._targetPlayer = target;
  };

  public get targetPlayer(): Spaceship {
    return this._targetPlayer;
  }

  public targetPosition: Vector2;

  public orbitRadius = 100;

  public actionOrbitTarget: boolean = false;
  public actionKeepAtRange: boolean = false;

  public gameObject: PIXI.Container;

  public playerLayer: PIXI.Container;
  public uiLayer: PIXI.Container;

  public targetLayer: PIXI.Graphics;

  public cannon: Cannon;

  public health = 100;




  constructor(id, color) {
    super();
    this.id = id;
    this.color = color;
    this.cannon = new Cannon(this);
    this.gameObject = this.getGameObject();

    this.physics = new HybridPhysics();

    window.addEventListener(
      "keydown", (event) => {
        //

        console.log(event);

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
    this.physics.iterate(this, delta);

    this.cannon.iterate(delta);
  }

  public getAngularVelocity(particle: Particle, target: Vector2): number {



    const r = {
      x: particle.position.x - target.x,
      y: particle.position.y - target.y
    };

    // TODO: winkel nur zwischen 0 und 180 grad
    const alpha = CMath.angle(r, particle.speed);

    const v_norm = math.norm( [ particle.speed.x, particle.speed.y ]);
    const r_norm = math.norm( [ r.x, r.y ]);
    //console.log(v_norm);

    //console.log(alpha * 180 / math.pi);
    //console.log(particle.speed);

    const omega: number = v_norm * math.sin(alpha) / r_norm;

    return math.abs(omega);
  }



  public getRotation(particle: Particle, target: Vector2 | null ): number {

    const tDir:Vector2 = {
      x: target.x - particle.position.x,
      y: target.y - particle.position.y
    };

//    console.log("orient", particle.rotation * (180 / math.pi));

    const orient:Vector2 = {
      x: math.cos(particle.rotation),
      y: math.sin(particle.rotation)
    }

    const dotProduct = math.dot( [tDir.x, tDir.y], [orient.x, orient.y])

    let angle = math.acos(dotProduct / ( math.norm( [tDir.x, tDir.y]) * math.norm( [orient.x, orient.y])));

    return angle;
  }



  public moveTo(target: Vector2, stopAtTarget?:boolean): { r: number, a: Vector2 } {
    return this.physics.moveTo(this, target, stopAtTarget);
  }

  private nameplate: PIXI.Text;

  public getGameObject(): PIXI.Container {
    // Initialize the pixi Graphics class
    const parentObject: PIXI.Container = new PIXI.Container();


    const playerObject: PIXI.Container = new PIXI.Container();

    const playerRadius = this.shipSize;

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

    this.nameplate.text = this.health + " " + this.id;

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

  public drawOrbit() {
    const graphics: PIXI.Graphics = new PIXI.Graphics();

    graphics.beginFill(0xe74c3c, 0.1);

    graphics.drawCircle(0, 0, this.player1.rotateRadius);




    //this.targetContainer.addChild(graphics)
  }

  public getPlayerMessage(): PlayerMessage {
    return new PlayerMessage(this.id, this.position.x, this.position.y, this.speed.x, this.speed.y, this.rotation, this.cannon.rotation);
  }

  public getPlayerJoinedMessage(): PlayerJoinedMessage {
    return new PlayerJoinedMessage(this.id, this.position.x, this.position.y, this.speed.x, this.speed.y, this.rotation, this.cannon.rotation, this.health, this.color, this.shipSize);
  }

  public testEmitter() {


  }
}
