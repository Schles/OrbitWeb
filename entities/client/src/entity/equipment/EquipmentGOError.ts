import { ShipEquipment } from '@orbitweb/common';
import { ShipEquipmentGO, SpaceshipGO } from '@orbitweb/client-entities';

export class EquipmentGOError extends ShipEquipmentGO {
  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  onInit(parent: SpaceshipGO) {}

  iterate(parent: SpaceshipGO, delta: number) {}

  onDestroy(parent: SpaceshipGO) {}
}
