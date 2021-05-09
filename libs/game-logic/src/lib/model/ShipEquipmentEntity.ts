import { ShipEquipment } from '@orbitweb/common';
import { SpaceshipEntity } from './SpaceshipEntity';

export class ShipEquipmentEntity extends ShipEquipment {
  protected alreadyApplied: boolean = false;
  protected alreadyRemoved: boolean = false;

  constructor(shipEquipment: ShipEquipment) {
    super(
      shipEquipment.name,
      shipEquipment.tier,
      shipEquipment.cpuCost,
      shipEquipment.powerCost,
      shipEquipment.cycleTime,
      shipEquipment.passive,
      shipEquipment.action
    );
  }

  iterate(parent: SpaceshipEntity, delta: number) {
    if (this.passive) return;

    super.iterate(parent, delta);

    if (this.isOnCooldown()) return;

    if (this.state.active === false && this.state.pendingState === false) {
      return;
    }

    //    this.state.active = this.state.pendingState;

    this.onUpdateEquipment(parent, delta);
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    this.state.active = true;
  }

  protected onUpdateEquipment(parent: SpaceshipEntity, delta: number) {
    if (this.state.active === false && this.state.pendingState === true) {
      if (!this.canAfford(parent, delta)) {
        return;
      }
      this.payPower(parent);
      this.onStartEquipment(parent);
    } else if (
      this.state.active === true &&
      this.state.pendingState === false
    ) {
      this.onEndEquipment(parent);
    } else if (this.state.active === true && this.state.pendingState === true) {
      this.onEndEquipment(parent);

      if (!this.canAfford(parent, delta)) {
        return;
      }

      this.payPower(parent);
      this.onStartEquipment(parent);
    }
    /*
    if (this.state.active && !this.alreadyApplied) {
      if (!this.canAfford(parent, delta)) {
        this.state.active = false;
        this.state.pendingState = false;
        return;
      }

      // First start

      this.alreadyApplied = true;
      this.alreadyRemoved = false;

      //this.payPower(parent);
      //this.remainingTime = this.cycleTime;
      this.onStartEquipment(parent);
    } else if ( this.state.active && this.alreadyApplied) {
      // Reapply

      this.onEndEquipment(parent);

      if (!this.canAfford(parent, delta)) {
        this.state.active = false;
        this.state.pendingState = false;
        return;
      }

      this.alreadyRemoved = false;

      //this.payPower(parent);
      //this.remainingTime = this.cycleTime;
      this.onStartEquipment(parent);

    } else if ( !this.state.active) {
      this.alreadyRemoved = true;
      this.alreadyApplied = false;
      this.onEndEquipment(parent);
    }

 */
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    this.state.active = false;
  }

  protected payPower(parent: SpaceshipEntity) {
    parent.power -= this.powerCost;
    this.remainingTime = this.cycleTime;
  }

  protected canAfford(parent: SpaceshipEntity, delta: number): boolean {
    const price = this.powerCost;

    return parent.power >= price;
  }

  protected isOnCooldown(): boolean {
    return this.remainingTime > 0;
  }

  onDestroy(parent: SpaceshipEntity) {
    super.onDestroy(parent);

    if (this.state.active) {
      this.onEndEquipment(parent);
    }
  }
}
