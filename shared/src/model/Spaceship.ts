import {Particle} from "./Particle";
import {Vector2} from "../util/VectorInterface";
import {Cannon} from "./Cannon";
import {ShipFitting} from "./ShipFitting";




export class Spaceship extends Particle {

  public id;

  public health = 100;

  public color: string = "#00FF00";

  public curSpeed: number = 0;

  public fitting: ShipFitting = new ShipFitting();

  public timeToMaxSpeed = 2;

  public power: number = 100;

  public shipSize: number = 7;

  public speedInput: number = 1;

  public maxOmega: number = 1;

  public cpuCapacity: number = 200;

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

  constructor(id, color) {
    super();
    this.id = id;
    this.color = color;
  }

  public removeTarget() {
    this.targetPlayer = undefined;
    this.actionOrbitTarget = false;
  }


  public onInit() {

  }

  public onDestroy() {

  }
}
