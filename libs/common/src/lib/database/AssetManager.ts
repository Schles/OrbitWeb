import World from "../../assests/equipment/world.json"
import AttackEquipment from "../../assests/equipment/attack.json"
import UtilEquipment from "../../assests/equipment/utility.json"
import PassiveEquipment from "../../assests/equipment/passive.json"
import { IAction } from "../action/IAction";
import { ShipEquipment } from "../model/ShipEquipment";


export type ShipEquipmentDB = { name: string, cpuCost: number, powerCost: number, cycleTime: number, action: IAction, value?: ShipEquipmentDBValue };
export type ShipEquipmentDBValue = { range?: number, bonusRate?: number, absolute?: number, custom?: any }
export type ShipEquipmentDBMeta = { name: string, meta: { desc: string } };

export type WorldDB = { world: { minRadius: number, maxRadius: number, lightDistance: number}, player: { maxOrbitChange: number, maxOmega: number } };

export class AssetManager {
    public static getShipEquipment(tier: number): ShipEquipmentDB[] {
        return this.getTier(tier);
    }

    public static getShipEquipmentMeta(tier: number, name: string): ShipEquipmentDBMeta {

        return this.getTierMeta(tier).find((p) => p.name === name);


    }

    public static getDefaultFitting(): ShipEquipment[] {
        return [
            this.dirtyFactory(1, this.findEquipment("RocketLauncher")),
            this.dirtyFactory(1, this.findEquipment("Laser")),
            this.dirtyFactory(2, this.findEquipment("SpeedBooster")),
            this.dirtyFactory(2, this.findEquipment("Webber")),
            this.dirtyFactory(3, this.findEquipment("Mass"))
        ];
    }

    public static dirtyFactory(tier: number, equip: ShipEquipmentDB): ShipEquipment {

        return new ShipEquipment(equip.name, tier, equip.cpuCost, equip.powerCost,
            equip.cycleTime, tier < 3 ? false : true, equip.action);
    }

    public static getValue(name: string): ShipEquipmentDBValue {
        return this.findEquipment(name)?.value;
    }

    public static findEquipment(name: string): ShipEquipmentDB {
        return ([...AttackEquipment, ...UtilEquipment, ...PassiveEquipment].find((v) => v.name === name) as ShipEquipmentDB)
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