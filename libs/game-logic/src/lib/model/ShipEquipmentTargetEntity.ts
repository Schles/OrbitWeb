import {ShipEquipmentEntity} from "./ShipEquipmentEntity";
import {ShipEquipment} from "@orbitweb/common";
import {SpaceshipEntity} from "./SpaceshipEntity";
import {CMath} from "@orbitweb/common";

export class ShipEquipmentTargetEntity extends ShipEquipmentEntity{

  public range: number = 180;

  public wasInRange: boolean = false;

  public wasOutOfRange: boolean = false;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  iterate(parent: SpaceshipEntity, delta: number) {
    super.iterate(parent, delta);
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);
  }

  protected onUpdateEquipment(parent: SpaceshipEntity, delta: number) {
    if ( !this.hasTarget(parent) ) {
      this.state.pendingState = false;
      super.onUpdateEquipment(parent, delta);
      return;
    }

    if ( this.state.pendingState === true && !this.isTargetInRange(parent)) {
      if ( this.state.active)
        this.onEndEquipment(parent);
    } else {
      super.onUpdateEquipment(parent, delta);
    }


  }



  protected hasTarget(parent: SpaceshipEntity): boolean {
    return parent.targetPlayer !== undefined;
  }

  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    const len = CMath.len(CMath.sub(parent.position, parent.targetPlayer.position));
    return len < this.range;
  }


}
