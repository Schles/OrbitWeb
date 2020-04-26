import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";
import {ShipEquipmentTargetEntity} from "./common/ShipEquipmentTargetEntity";

export class EquipmentEntityWebber extends ShipEquipmentTargetEntity {

  private absoluteChange: number = 0;

  private bonus: number = 0.4;

  private targetPlayer: SpaceshipEntity;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  public iterate(parent: SpaceshipEntity, delta: number) {
    super.iterate(parent, delta);
  }

  protected onUpdateEquipment(parent: SpaceshipEntity, delta: number) {
    super.onUpdateEquipment(parent, delta);


  }


  protected enteredRange(parent: SpaceshipEntity) {


    this.payPower(parent);
    console.log("bin dran");
    //this.absoluteChange = this.targetPlayer.maxSpeed * this.bonus;
    //this.targetPlayer.maxSpeed -= this.absoluteChange;
  }

  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);
/*
    if ( this.hasTarget(parent)) {
      this.targetPlayer = <SpaceshipEntity>parent.targetPlayer;


    } else {
      this.state.active = false;
      this.state.pendingState = false;
    }
*/
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);
    console.log("on eq end");
    if ( this.targetPlayer !== undefined) {
      this.targetPlayer.maxSpeed += this.absoluteChange;
      this.absoluteChange = 0.0;
      this.targetPlayer = undefined;
    }


  }
}
