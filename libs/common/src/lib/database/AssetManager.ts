import World from '../../assests/equipment/world.json';
import AttackEquipment from '../../assests/equipment/attack.json';
import UtilEquipment from '../../assests/equipment/utility.json';
import PassiveEquipment from '../../assests/equipment/passive.json';
import { IAction } from '../action/IAction';
import { ShipEquipment } from '../model/ShipEquipment';

export type ShipEquipmentDB = {
  name: string;
  disabled?: boolean;
  base?: string;
  castTime: number;
  cooldownTime: number;
  action: IAction;
  value?: ShipEquipmentDBValue;
};
export type ShipEquipmentDBValue = {
  range?: number;
  bonusRate?: number;
  absolute?: number;
  projectile?: ProjectileDB;
  custom?: any;
};

export type ProjectileDB = {
  timeToLife: number;
  damage: number;
  damageRange: number;
};
export type ShipEquipmentDBMeta = { name: string; meta: { desc: string } };

export type WorldDB = {
  debug: boolean,
  world: { minRadius: number; maxRadius: number; lanes: number, lightDistance: number };
  player: { maxOrbitChange: number; maxOmega: number; baseOmega: number };
};

export class AssetManager {
  public static getShipEquipment(tier: number): ShipEquipmentDB[] {
    return this.getTier(tier).filter((p) => {
      return !p?.disabled;
    });
  }

  public static getShipEquipmentMeta(
    tier: number,
    name: string
  ): ShipEquipmentDBMeta {
    return this.getTierMeta(tier).find((p) => p.name === name);
  }

  public static getDefaultFitting(): ShipEquipmentDB[] {
    return [
      this.dirtyFactory(1, this.findEquipment('RocketLauncher')),
      this.dirtyFactory(1, this.findEquipment('Bomb')),
      this.dirtyFactory(1, this.findEquipment('MineLauncher')),
      this.dirtyFactory(2, this.findEquipment('SpeedBooster')),
      this.dirtyFactory(2, this.findEquipment('Webber')),
    ];
  }

  public static dirtyFactory(
    tier: number,
    equip: ShipEquipmentDB
  ): ShipEquipment {
    return new ShipEquipment(equip.name, tier, equip.castTime, equip.cooldownTime, tier < 3 ? false : true, equip.action);
  }

  public static getValue(name: string): ShipEquipmentDBValue {
    return this.findEquipment(name)?.value;
  }

  public static findEquipment(name: string): ShipEquipmentDB {
    return [...AttackEquipment, ...UtilEquipment, ...PassiveEquipment].find(
      (v) => v.name === name
    ) as ShipEquipmentDB;
  }

  public static getTier(tier: number): ShipEquipmentDB[] {
    switch (tier) {
      case 1:
        return AttackEquipment;
      case 2:
        return UtilEquipment;
      case 3:
        return PassiveEquipment;
    }
  }

  public static getTierMeta(tier: number): ShipEquipmentDBMeta[] {
    switch (tier) {
      case 1:
        return AttackEquipment;
      case 2:
        return UtilEquipment;
      case 3:
        return PassiveEquipment;
    }
  }

  public static get config(): WorldDB {
    return World;
  }
}
