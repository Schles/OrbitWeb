import { ShipEquipmentEntity } from '../../model/ShipEquipmentEntity';
import { Server, ShipEquipment } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';

@Server("EQUIP", "Empty")
export class EquipmentEntityEmpty extends ShipEquipmentEntity {
  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  public iterate(parent: SpaceshipEntity, delta: number) {}

  protected onStartEquipment(parent: SpaceshipEntity) {}

  protected onEndEquipment(parent: SpaceshipEntity) {}
}
