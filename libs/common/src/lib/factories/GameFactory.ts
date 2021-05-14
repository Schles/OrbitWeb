import { ShipEquipment } from '../model/ShipEquipment';
import { StructureSpawnMessage } from '../message/game/structures/StructureSpawnMessage';
import { Message } from '../message/Message';
import { AssetManager } from '../database/AssetManager';
import { ProjectileSpawnMessage } from '../message/game/projectile/ProjectileSpawnMessage';

export type FactoryTypes = "EQUIP" | "STRUCTURE" | "PROJECTILE" | "EVENT";

export type Authority = "CLIENT" | "SERVER";

export class GameFactory {


  private static client: Map<FactoryTypes, Map<string, any>> = new Map<FactoryTypes, Map<string, any>>();
  private static server: Map<FactoryTypes, Map<string, any>> = new Map<FactoryTypes, Map<string, any>>();

  public static registerClient(type: FactoryTypes, name: string, constructor: any) {

    if ( !this.client.has(type))
      this.client.set(type, new Map<string, any>());

    this.client.get(type).set(name, constructor);

  }

  public static registerServer(type: FactoryTypes, name: string, constructor: any) {
    if ( !this.server.has(type))
      this.server.set(type, new Map<string, any>());

    this.server.get(type).set(name, constructor);
  }



  public static instantiateClientStructure(message: StructureSpawnMessage): any {

  }

  public static instantiate(authority: Authority, type: FactoryTypes, name: string, ...params: any): any {

    const map = authority === "CLIENT" ? this.client : this.server;

    const constructor = map.get(type)?.get(name);



    if ( constructor ){
      //console.log("instantiate:", authority, type, name, params);
      return new constructor(...params);
    }

    console.log("Cant instantiate:", authority, type, name, params);
    return undefined;
  }

  public static instantiateClientProjectile(message: ProjectileSpawnMessage): any {

  }

  public static instantiateClientEvent(message: Message): any {
    const constructor = this.client.get("EVENT").get(message.type);

    if ( constructor ){
      return new constructor(message);
    }

    //console.log("Equip missing:", message);
    return undefined;
  }

  public static instatiateClientEquip(shipEquipment: ShipEquipment): any {
    const constructor = this.client.get("EQUIP").get(shipEquipment.name);

    if ( constructor ){
      return new constructor(shipEquipment);
    }

    //console.log("Event missing:", shipEquipment.name);
    return undefined;
  }

  /**
   * Server
   */

  public static instantiateServerEquip(shipEquipment: ShipEquipment): any {
    const constructor = this.server.get("EQUIP")?.get(shipEquipment.name);

    if ( constructor ){
      const params = AssetManager.getValue(shipEquipment.name);
      return new constructor(shipEquipment, params);
    }

    //console.log("Equip missing:", shipEquipment.name);
    return undefined;
  }

  public static instantiateServerEvent(message: Message): any {
    const constructor = this.server.get("EVENT")?.get(message.type);

    if ( constructor ){
      return new constructor(message);
    }

    //console.log("Event missing:", message.type);
    return undefined;
  }


}