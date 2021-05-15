import { Client, ShipEquipment } from '@orbitweb/common';
import { ShipEquipmentGO, SpaceshipGO } from '@orbitweb/client-entities';

@Client("EQUIP", "Empty")
export class EquipmentGOEmpty extends ShipEquipmentGO {
  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  onInit(parent: SpaceshipGO) {}

  iterate(parent: SpaceshipGO, delta: number) {}

  onDestroy(parent: SpaceshipGO) {}
}
