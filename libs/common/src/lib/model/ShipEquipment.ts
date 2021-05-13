import { IAction } from '../action/IAction';
import { Spaceship } from './Spaceship';

export interface ShipEquipmentState {
  active: boolean;
  cooldown: boolean;
  pendingState: boolean;
  rotation: number;
}

export class ShipEquipment {
  public state: ShipEquipmentState = {
    active: false,
    cooldown: false,
    pendingState: false,
    rotation: 0,
  };

  public remainingTime;

  public isOnCooldown : boolean = false;
  public isCasting: boolean = false;

  constructor(
    public name: string,
    public tier: number,
    public cpuCost: number,
    public castTime: number,
    public cooldownTime: number,
    public passive: boolean,
    public action: IAction
  ) {
    this.remainingTime = 0.0;
  }

  public onInit(parent: Spaceship) {}

  public iterate(parent: Spaceship, delta: number) {
    this.remainingTime -= delta;
    this.remainingTime = this.remainingTime >= 0 ? this.remainingTime : 0;
  }

  public onDestroy(parent: Spaceship) {}
}
