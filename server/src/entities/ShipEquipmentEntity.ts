import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";

export class ShipEquipmentEntity extends ShipEquipment {
  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment.name, shipEquipment.tier, shipEquipment.cpuCost, shipEquipment.powerCost, shipEquipment.action);
  }
}
