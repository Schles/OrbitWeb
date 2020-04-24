
import {Projectile} from "../../../model/Projectile";
import {ShipEquipmentMessage} from "./ShipEquipmentMessage";
import {ShipEquipment} from "../../../model/ShipEquipment";

export class ShipEquipmentStopMessage extends ShipEquipmentMessage {

  constructor(source: string, equipment: ShipEquipment) {
    super(source, equipment);

    this.type = "shipEquipmentStopMessage";
  }
}
