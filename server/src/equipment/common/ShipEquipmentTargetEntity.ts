import {ShipEquipmentEntity} from "../../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../../entities/SpaceshipEntity";
import {CMath} from "../../utils/CMath";

export class ShipEquipmentTargetEntity extends ShipEquipmentEntity{

  public range: number = 180;

  public wasInRange: boolean = false;

  public wasOutOfRange: boolean = false;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  iterate(parent: SpaceshipEntity, delta: number) {
    if ( this.state.active === false && this.state.pendingState === true) {
      if ( !this.hasTarget(parent) )
        return;

      if ( this.isTargetInRange(parent) )
        this.state.active = true;
    } else {
      super.iterate(parent, delta);
    }
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);
  }





  protected onUpdateEquipment(parent: SpaceshipEntity, delta: number) {
    if ( !this.hasTarget(parent) )
      return;

    super.onUpdateEquipment(parent, delta);
  }



  protected hasTarget(parent: SpaceshipEntity): boolean {
    return parent.targetPlayer !== undefined;
  }

  protected isTargetInRange(parent: SpaceshipEntity): boolean {
    const len = CMath.len(CMath.sub(parent.position, parent.targetPlayer.position));
    return len < this.range;
  }


}
