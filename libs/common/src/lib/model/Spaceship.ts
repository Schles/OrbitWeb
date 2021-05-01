import {Particle} from "./Particle";
import {Vector2} from "../util/VectorInterface";
import {ShipFitting} from "./ShipFitting";
import {Structure} from "./Structure";
import {Inventory} from "./Inventory";


export class Spaceship extends Particle {

  public id;

  public maxSpeed: number = 50;

  public health = 100;
  public maxHealth:number = 150;

  public color: string = "#00FF00";

  public curSpeedDEP: number = 0;

  public fitting: ShipFitting = new ShipFitting();

  public inventory: Inventory[] = [];

  public timeToMaxSpeed = 2;

  public power: number = 100;

  public shipSize: number = 7;

  public speedInput: number = 1;

  public maxOmega: number = 1 * Math.PI;

  public cpuCapacity: number = 200;

  public activationProgress: number = 0;

  public energyRechargeRate: number = 1.0;
  public energyCapacity: number = 150;

  public timestampLastActionMs: number;
  public isNPC: boolean = false;
  public maxIdleTimeMs: number = 30 * 60 * 1000;

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
  public actionUseStructure: boolean = false;

  public targetStructure: Structure;

  public get acceleration(): number {
    return this.maxSpeed / (this.timeToMaxSpeed * this.mass);
  }


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
