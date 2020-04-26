import {Spaceship} from "../../../model/Spaceship";
import {PlayerMessage} from "../../generic/PlayerMessage";

import {Projectile} from "../../../model/Projectile";
import {ShipEquipmentMessage} from "./ShipEquipmentMessage";
import {ShipEquipment} from "../../../model/ShipEquipment";

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
