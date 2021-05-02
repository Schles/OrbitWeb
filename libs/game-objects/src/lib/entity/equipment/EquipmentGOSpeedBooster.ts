import {ShipEquipment} from "@orbitweb/common";
import { Filter } from "pixi.js";
import { ShipEquipmentGO } from "../../model/ShipEquipmentGO";
import { SpaceshipGO } from "../../model/SpaceshipGO";
import { NoiseFilter } from "@pixi/filter-noise"

export class EquipmentGOSpeedBooster extends ShipEquipmentGO {
  private filter: Filter;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }


  onInit(parent: SpaceshipGO) {
    super.onInit(parent);
    this.filter = new NoiseFilter(0.5);
    parent.playerLayer.filters.push( this.filter);
  }


  protected onStartEquipment(parent: SpaceshipGO) {
    super.onStartEquipment(parent);
    this.filter.enabled = true;

  }

  protected onEndEquipment(parent: SpaceshipGO) {
    super.onEndEquipment(parent);
    this.filter.enabled = false;

  }
}
