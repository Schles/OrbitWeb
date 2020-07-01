import {ShipEquipmentMessage} from "./ShipEquipmentMessage";

export class ShipEquipmentUpdateMessage extends ShipEquipmentMessage {

  public x: number;
  public y: number;

  public speedX: number;
  public speedY: number;

  public rotation: number;
/*
  constructor(source: string, equipment: ShipEquipment) {
    super(source, equipment);

    this.type = "shipEquipmentUpdateMessage";
  }

 */
}
