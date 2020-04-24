import {Particle} from "./Particle";
import {Vector2} from "../util/VectorInterface";
import {Cannon} from "./Cannon";
import {ShipFitting} from "./ShipFitting";




export class Spaceship extends Particle {

  public id;

  public health = 100;

  public color: string = "#00FF00";

  public maxSpeed: number = 50;

  public curSpeed: number = 0;

  public fitting: ShipFitting = new ShipFitting();

  public get acceleration(): number {
    return this.maxSpeed / (this.timeToMaxSpeed);
  }

  public timeToMaxSpeed = 2;

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

  public cannon: Cannon;

  constructor(id, color) {
    super();
    this.id = id;
    this.color = color;
    //this.cannon = new Cannon(this);


//    this.physics = new HybridPhysics();

  }

  public removeTarget() {
    this.targetPlayer = undefined;
    this.actionOrbitTarget = false;
  }


  public onInit() {

  }

  public onDestroy() {

  }

/*
  public getPlayerMessage(): PlayerMessage {
    return new PlayerMessage(this.id, this.position.x, this.position.y, this.speed.x, this.speed.y, this.rotation, this.cannon.rotation);
  }

  public getPlayerJoinedMessage(): PlayerJoinedMessage {
    return new PlayerJoinedMessage(this.id, this.position.x, this.position.y, this.speed.x, this.speed.y, this.rotation, this.cannon.rotation, this.health, this.color, this.shipSize);
  }
*/

}
