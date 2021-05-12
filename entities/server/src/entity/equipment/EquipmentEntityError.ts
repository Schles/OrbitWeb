import { ShipEquipmentEntity } from '../../../../../libs/game-logic/src/lib/model/ShipEquipmentEntity';
import { ShipEquipment } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';

export class EquipmentEntityError extends ShipEquipmentEntity {
  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  public iterate(parent: SpaceshipEntity, delta: number) {}

  protected onStartEquipment(parent: SpaceshipEntity) {}

  protected onEndEquipment(parent: SpaceshipEntity) {}
}
