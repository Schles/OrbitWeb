import { ShipEquipmentEntity } from '../model/ShipEquipmentEntity';
import { AssetManager, ShipEquipment } from '@orbitweb/common';

import { EquipmentEntityLaser } from '../entity/equipment/EquipmentEntityLaser';
import { EquipmentEntitySpeedBooster } from '../entity/equipment/EquipmentEntitySpeedBooster';
import { EquipmentEntityRocketLauncher } from '../entity/equipment/EquipmentEntityRocketLauncher';
import { EquipmentEntityRepair } from '../entity/equipment/EquipmentEntityRepair';
import { EquipmentEntityWebber } from '../entity/equipment/EquipmentEntityWebber';
import { EquipmentEntityEmpty } from '../entity/equipment/EquipmentEntityEmpty';
import { EquipmentEntityBattery } from '../entity/equipment/EquipmentEntityBattery';
import { EquipmentEntityNosferatu } from '../entity/equipment/EquipmentEntityNosferatu';
import { EquipmentEntityMass } from '../entity/equipment/EquipmentEntityMass';
import { EquipmentEntityShield } from '../entity/equipment/EquipmentEntityShield';
import { EquipmentEntityLauncherMine } from '../entity/equipment/EquipmentEntityLauncherMine';

export class EquipmentDeserializer {
  public static deserialize(shipEquipment: ShipEquipment): ShipEquipmentEntity {
    if (shipEquipment === undefined || shipEquipment === null) {
      return undefined;
    }

    const value = AssetManager.getValue(shipEquipment.name);

    switch (shipEquipment.name) {
      case 'Empty':
        return new EquipmentEntityEmpty(shipEquipment);
      case 'Repair':
        return new EquipmentEntityRepair(shipEquipment, value);
      case 'Webber':
        return new EquipmentEntityWebber(shipEquipment, value);
      case 'Laser':
        return new EquipmentEntityLaser(shipEquipment, value);
      case 'Battery':
        return new EquipmentEntityBattery(shipEquipment, value);
      case 'SpeedBooster':
        return new EquipmentEntitySpeedBooster(shipEquipment, value);
      case 'Nosferatu':
        return new EquipmentEntityNosferatu(shipEquipment, value);
      case 'RocketLauncher':
        return new EquipmentEntityRocketLauncher(shipEquipment, value);
      case 'MineLauncher':
        return new EquipmentEntityLauncherMine(shipEquipment, value);
      case 'Shield':
        return new EquipmentEntityShield(shipEquipment, value);
      case 'Mass':
        return new EquipmentEntityMass(shipEquipment, value);
    }
    return undefined;
  }
}
