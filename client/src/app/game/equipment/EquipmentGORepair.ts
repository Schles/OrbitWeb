import {ShipEquipmentGO} from "../gameobjects/ShipEquipmentGO";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {SpaceshipGO} from "../gameobjects/SpaceshipGO";
import NoiseFilter = PIXI.filters.NoiseFilter;
import AlphaFilter = PIXI.filters.AlphaFilter;

export class EquipmentGORepair extends ShipEquipmentGO {

  private repairGraphic: PIXI.Graphics;

  private filter: PIXI.Filter;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);

    this.filter = new AlphaFilter(0.5);

  }


  onInit(parent: SpaceshipGO) {
    super.onInit(parent);
    parent.playerLayer.filters.push( this.filter);


/*
    this.repairGraphic = new PIXI.Graphics;
    parent.gameObject.addChild(this.repairGraphic);
    this.repairGraphic.lineStyle(2, 0x00FF00);
    this.repairGraphic.drawCircle(0, 0, 20);
    this.repairGraphic.endFill();
    */
  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);

/*
    const a = (<AlphaFilter> this.filter).alpha;

    let alpha = (a + delta) % 1;

    (<AlphaFilter> this.filter).alpha = alpha;
*/
  }


  onDestroy(parent: SpaceshipGO) {
    super.onDestroy(parent);

    parent.gameObject.removeChild(this.repairGraphic);
    this.repairGraphic = undefined;
  }


  protected onStartEquipment(parent: SpaceshipGO) {
    super.onStartEquipment(parent);


    this.filter.enabled = true;

    console.log("hallo");

  }

  protected onEndEquipment(parent: SpaceshipGO) {
    super.onEndEquipment(parent);

    console.log("ende");
    this.filter.enabled = false;
    //parent.gameObject.filters.splice(0, 0);
  }
}
