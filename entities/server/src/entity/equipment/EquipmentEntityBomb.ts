import { ShipEquipmentEntity } from '../../../../../libs/game-logic/src/lib/model/ShipEquipmentEntity';
import { GameFactory, Server, ShipEquipment, ShipEquipmentDBValue } from '@orbitweb/common';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';

import { EventManager } from '../../../../../libs/game-logic/src';


@Server("EQUIP", "Bomb")
export class EquipmentEntityBomb extends ShipEquipmentEntity {
  constructor(shipEquipment: ShipEquipment, private value: ShipEquipmentDBValue) {
    super(shipEquipment);
  }


  protected onStartEquipment(parent: SpaceshipEntity) {
    super.onStartEquipment(parent);

    const proj: ProjectileEntity = GameFactory.instantiate("SERVER", "PROJECTILE", "Bomb", parent, this.value)
    EventManager.shootProjectile.emit('shootProjectile', { projectile: proj });
  }

}
