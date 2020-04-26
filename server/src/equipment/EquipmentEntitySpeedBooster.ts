import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";
import {CMath} from "../utils/CMath";
import * as math from "mathjs";
import {Vector2} from "../../../shared/src/util/VectorInterface";
import {EventManager} from "../game/EventManager";
import {TimedAbility} from "../../../shared/src/model/TimedAbility";

export class EquipmentEntitySpeedBooster extends ShipEquipmentEntity {

  private absoluteChange: number = 0;

  private bonus: number = 0.4;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  onInit(parent: SpaceshipEntity) {
    super.onInit(parent);
  }

  iterate(parent: SpaceshipEntity, delta: number) {
    super.iterate(parent, delta);
  }


  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    this.absoluteChange = parent.maxSpeed * this.bonus;
    parent.maxSpeed += this.absoluteChange;
  }

  protected onEndEquipment(parent: SpaceshipEntity) {
    super.onEndEquipment(parent);

    parent.maxSpeed -= this.absoluteChange;
    this.absoluteChange = 0;
  }
}
