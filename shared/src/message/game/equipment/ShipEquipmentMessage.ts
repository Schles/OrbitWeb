import {Message} from "../../Message";
import {PlayerMessage} from "../../generic/PlayerMessage";
import {ShipEquipment} from "../../../model/ShipEquipment";

export class ShipEquipmentMessage extends PlayerMessage{
  constructor(public id: string, public shipEquipment: ShipEquipment) {
    super(id);
    this.type = "shipEquipmentMessage";
  }
}
