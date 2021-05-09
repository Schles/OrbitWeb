import { IAction } from '../action/IAction';
import { Spaceship } from './Spaceship';

export interface ShipEquipmentState {
  active: boolean;
  pendingState: boolean;
  rotation: number;
}

export class ShipEquipment {
  public state: ShipEquipmentState = {
    active: false,
    pendingState: false,
    rotation: 0,
  };

  public remainingTime;

  constructor(
    public name: string,
    public tier: number,
    public cpuCost: number,
    public powerCost: number,
    public cycleTime: number,
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
