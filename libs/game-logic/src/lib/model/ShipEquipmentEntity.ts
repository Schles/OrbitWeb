import { ShipEquipment } from '@orbitweb/common';
import { SpaceshipEntity } from './SpaceshipEntity';

export class ShipEquipmentEntity extends ShipEquipment {
  protected alreadyApplied: boolean = false;
  protected alreadyRemoved: boolean = false;



  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment.name, shipEquipment.tier, shipEquipment.cpuCost, shipEquipment.castTime, shipEquipment.cooldownTime, shipEquipment.passive, shipEquipment.action);
  }

  iterate(parent: SpaceshipEntity, delta: number) {
    if (this.passive) return;

    super.iterate(parent, delta);

    if ( this.hasCooldown()) return;
    if ( this.hasCasting()) return;

    if (this.state.active === false && this.state.pendingState === false && this.state.cooldown === false) {
      return;
    }

    //    this.state.active = this.state.pendingState;

    this.onUpdateEquipment(parent, delta);
  }



  protected onUpdateEquipment(parent: SpaceshipEntity, delta: number) {
    if ( !this.isCasting && !this.isOnCooldown && this.state.pendingState) {
      this.onStartEquipment(parent);
    } else if ( this.isCasting && !this.isOnCooldown) {
      this.onEndEquipment(parent);
    } else if ( !this.isCasting && this.isOnCooldown) {
      this.isOnCooldown = false;
      this.state.cooldown = false;
    }
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    this.isCasting = true;
    this.remainingTime = this.castTime;
    this.state.active = this.hasCasting();

    this.isOnCooldown = false;
    this.state.cooldown = this.hasCooldown();

    console.log("start", this.name, this.remainingTime, this.state);
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    this.isCasting = false;
    this.state.active = this.hasCasting();

    this.isOnCooldown = true;
    this.remainingTime = this.cooldownTime;

    this.state.cooldown = this.hasCooldown();

    console.log("stop", this.name, this.remainingTime, this.state);
  }

  protected hasCooldown(): boolean {
    return this.isOnCooldown && this.remainingTime > 0;
  }

  protected hasCasting(): boolean {
    return this.isCasting && this.remainingTime > 0;
  }

  onDestroy(parent: SpaceshipEntity) {
    super.onDestroy(parent);

    if (this.state.active) {
      this.onEndEquipment(parent);
    }
  }
}
