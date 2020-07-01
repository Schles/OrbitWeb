import {ShipEquipmentGO} from "../gameobjects/ShipEquipmentGO";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {SpaceshipGO} from "../gameobjects/SpaceshipGO";


export class EquipmentGOEmpty extends ShipEquipmentGO {


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

