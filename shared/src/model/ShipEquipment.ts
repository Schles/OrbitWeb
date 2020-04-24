import {IAction} from "../action/IAction";

export class ShipEquipment {

  constructor(public name: string,
              public tier: number,
              public cpuCost: number,
              public powerCost: number,
              public action: IAction) {
  }
}
