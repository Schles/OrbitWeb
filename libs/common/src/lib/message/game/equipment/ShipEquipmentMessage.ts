import {PlayerMessage} from "../../generic/PlayerMessage";

export class ShipEquipmentMessage extends PlayerMessage{
  constructor(public id: string, public index: number, public active: boolean) {
    super(id);
    this.type = "shipEquipmentMessage";
  }
}
