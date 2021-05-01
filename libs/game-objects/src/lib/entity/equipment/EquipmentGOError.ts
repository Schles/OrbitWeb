
import {ShipEquipment} from "@orbitweb/common";
import { ShipEquipmentGO } from "../../model/ShipEquipmentGO";
import { SpaceshipGO } from "../../model/SpaceshipGO";



export class EquipmentGOError extends ShipEquipmentGO {


    constructor(shipEquipment: ShipEquipment) {
      super(shipEquipment);
    }


    onInit(parent: SpaceshipGO) {
    }

    iterate(parent: SpaceshipGO, delta: number) {


    }


    onDestroy(parent: SpaceshipGO) {

    }
  }

