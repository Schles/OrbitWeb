import {Spaceship} from "../../../model/Spaceship";
import {PlayerMessage} from "../../generic/PlayerMessage";

import {Projectile} from "../../../model/Projectile";
import {ShipEquipment} from "../../../model/ShipEquipment";
import {ShipEquipmentMessage} from "./ShipEquipmentMessage";

export class ShipEquipmentStartMessage extends ShipEquipmentMessage {



  constructor(source: string, equipment: ShipEquipment) {
    super(source, equipment);

    this.type = "shipEquipmentStartMessage";
  }
}
