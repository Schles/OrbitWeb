import {ShipEquipment} from "@orbitweb/common";
import { ShipEquipmentGO } from "../../model/ShipEquipmentGO";
import { SpaceshipGO } from "../../model/SpaceshipGO";
import NoiseFilter = PIXI.filters.NoiseFilter;

export class EquipmentGOSpeedBooster extends ShipEquipmentGO {
  private filter: PIXI.Filter;

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
