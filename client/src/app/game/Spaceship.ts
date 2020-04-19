import {Particle} from "./Particle";
import * as math from 'mathjs';
import {CMath, Tangents, Vector2} from "./CMath";
import {compileNgModule} from "@angular/compiler";
import {Physics} from "./Physics";
import {Cannon} from "./Cannon";
import {Game} from "./Game";

export class Spaceship extends Particle {

  public id;

  public color: string = "#00FF00";

  public maxSpeed: number = 50;
  private acceleration: number = 10000;

  public maxOmega: number = 1;

  private _targetPlayer: Spaceship;

  public set targetPlayer(target: Spaceship) {
    this._targetPlayer = target;
  };

  public get targetPlayer(): Spaceship {
    return this._targetPlayer;
  }

  public targetPosition: Vector2;

  public rotateRadius = 100;

  public actionOrbitTarget: boolean = false;

  public gameObject: PIXI.Container;

  public cannon: Cannon;

  public health = 100;




  constructor(id, color) {
    super();
    this.id = id;
    this.color = color;
    this.cannon = new Cannon(this);
    this.gameObject = this.getGameObject();



  }

  public iterate(delta: number) {

    // Input
    //let rotation = this.getRotation(this, this.target);
    //const accel = this.getAccel(this, this.target);
    let input = {
      rotation: 0,
      accel: 0
    }

    if (this.actionOrbitTarget) {
      if( this.targetPlayer !== undefined)
        input = this.orbitTarget(this.targetPlayer.position);

    } else {
      if (this.targetPosition !== undefined)
        input = this.moveTo(this.targetPosition)
    }


    //const input = this.moveTo(this.target, true);


    let omega = input.rotation / delta;
    const accel = input.accel;

    // Clamping

    const length = math.norm( [this.speed.x, this.speed.y] );
    if (length > this.maxSpeed) {
      this.speed.x *= this.maxSpeed / length;
      this.speed.y *= this.maxSpeed / length;
    }



    if ( math.abs(omega) > this.maxOmega) {
      omega = math.sign(omega) * this.maxOmega
    }

    if (isNaN(omega))
      omega = 0;

    const newDir = this.getOrientation(this);


    //const omega = this.getAngularVelocity(this, this.targetPlayer.position);
//    console.log(omega);
    // Updating physics

    this.accel = {
      x: newDir.x * accel * delta,
      y: newDir.y * accel * delta
    };


    this.rotation += omega * delta;


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

  public orbitTarget(target: Vector2): { rotation: number, accel: number }{

    const tangents: Tangents = CMath.constructTangent(target, this.rotateRadius, this.position);


    const orient: Vector2 = this.getOrientation(this);

    if( tangents.tangents !== undefined ) {

      const v1: Vector2 = {
        x: tangents.tangents.t1.x - this.position.x,
        y: tangents.tangents.t1.y - this.position.y,
      };

      const v2: Vector2 = {
        x: tangents.tangents.t2.x - this.position.x,
        y: tangents.tangents.t2.y - this.position.y,
      };





      //console.log(tangents.tangents.t2);


      const angle1: number = CMath.degree(v1, orient);
      const angle2: number = CMath.degree(v2, orient);

      if ( math.abs(angle2) < math.abs(angle1))
        return this.moveTo(tangents.tangents.t2);
      else
        return this.moveTo(tangents.tangents.t1);


    }

    return {
      rotation: 0,
      accel: 0.01
    };

  }

  public moveTo(target: Vector2, stopAtTarget?:boolean): { rotation: number, accel: number } {

    const dir = {
      x: target.x - this.position.x,
      y: target.y - this.position.y
    };

    const angle = CMath.angle(dir, this.getOrientation(this));





    let timeToStop = 100;

    let accel = this.acceleration;

    if( stopAtTarget ) {
      const dist = {
        x: target.x - this.position.x,
        y: target.y - this.position.y
      }

      const remainingDistance = math.norm( [dist.x, dist.y]);
      const v = math.norm ( [this.speed.x, this.speed.y]);

      if ( remainingDistance < 1) {
        accel = 0;

        this.speed = {
          x: 0,
          y: 0
        }


      } else if ( v * timeToStop > remainingDistance ) {



        accel = -2 * remainingDistance / (timeToStop * timeToStop);

      } else {

      }



    }

    return {
      rotation: angle,
      accel: accel
    };

  }

  private getOrientation(particle: Particle): Vector2 {
    //return CMath.rotate({x: 0, y: 1}, particle.rotation);
    const n = math.norm( [particle.speed.x, particle.speed.y]);
    //console.log(n);

    //if(n == 0)
      return CMath.rotate({x: 0, y: 1}, particle.rotation);



    //return particle.speed;

  }

  private nameplate: PIXI.Text;

  public getGameObject(): PIXI.Container {
    // Initialize the pixi Graphics class
    const container: PIXI.Container = new PIXI.Container();



    const graphics: PIXI.Graphics = new PIXI.Graphics();

    // Set the fill color
    const c = PIXI.utils.string2hex(this.color);
    graphics.beginFill(c); // Red

    // Draw a circle
    graphics.drawCircle(0, 0, 10); // drawCircle(x, y, radius)

    // Applies fill to lines and shapes since the last call to beginFill.
    graphics.endFill();

    container.addChild(graphics);

    const look: PIXI.Graphics = new PIXI.Graphics();

    // Set the fill color
    look.beginFill(c); // Red

    // Draw a circle
    look.drawRect(0, 0, 1, 30);

  // Applies fill to lines and shapes since the last call to beginFill.
    look.endFill();

    container.addChild(look);


    const cannonCont: PIXI.Container = this.cannon.gameObject;

    container.addChild(cannonCont);


    // text



    this.nameplate = new PIXI.Text(this.id, {fontFamily : 'Arial', fontSize: 14, fill : 0xff1010, align : 'center'});
    this.nameplate.position.x = 0;
    this.nameplate.position.y = -30;
    container.addChild(this.nameplate);

    return container;
  }

  public iterateGraphics() {
    this.gameObject.x = this.position.x;
    this.gameObject.y = this.position.y;

    this.gameObject.rotation = this.rotation;

    this.nameplate.text = this.health + " " + this.id;

    this.cannon.iterateGraphics();
  }

  public removeTarget() {
    this.targetPlayer = undefined;
    this.actionOrbitTarget = false;
  }

  public drawOrbit() {
    const graphics: PIXI.Graphics = new PIXI.Graphics();

    graphics.beginFill(0xe74c3c, 0.1);

    graphics.drawCircle(0, 0, this.player1.rotateRadius);




    //this.targetContainer.addChild(graphics)
  }


}
