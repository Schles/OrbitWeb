import { ShipEquipment } from '@orbitweb/common';
import { SpaceshipGO } from './SpaceshipGO';

export class ShipEquipmentGO extends ShipEquipment {
  private alreadyApplied: boolean = false;
  private alreadyRemoved: boolean = false;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment.name, shipEquipment.tier, shipEquipment.cpuCost, shipEquipment.castTime, shipEquipment.cooldownTime, shipEquipment.passive, shipEquipment.action);
  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);

    this.onUpdateEquipment(parent, delta);
  }

  protected onStartEquipment(parent: SpaceshipGO) {}

  protected onUpdateEquipment(parent: SpaceshipGO, delta: number) {
    if (this.state.active && !this.alreadyApplied) {
      // First start
      this.alreadyApplied = true;
      this.alreadyRemoved = false;
      this.onStartEquipment(parent);
    } else if (!this.state.active && !this.alreadyRemoved) {
      this.alreadyRemoved = true;
      this.alreadyApplied = false;
      this.onEndEquipment(parent);
    }
  }

  protected onEndEquipment(parent: SpaceshipGO) {}
}
