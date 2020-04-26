import {ShipEquipmentGO} from "../gameobjects/ShipEquipmentGO";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {SpaceshipGO} from "../gameobjects/SpaceshipGO";
import {CMath} from "../../util/CMath";

export class EquipmentGOWebber extends ShipEquipmentGO {

  private graphic: PIXI.Graphics;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }



  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.graphic = new PIXI.Graphics();
    this.graphic.beginFill(0xFF00AA);
    this.graphic.drawPolygon( [
      new PIXI.Point(0,0),
      new PIXI.Point(100,0),
      new PIXI.Point(0,100),
    ])
    this.graphic.endFill();
    parent.equipmentLayer.addChild(this.graphic);

  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);
    this.graphic.clear();
    if ( parent.targetPlayer === undefined || this.state.active === false) {
      return;
    }

    const dir = CMath.sub(parent.targetPlayer.position, parent.position);

    const perp = CMath.normalize3(CMath.cross3({
      x: dir.x,
      y: dir.y,
      z: 0
    }, {
      x: 0,
      y: 0,
      z: 1
    }));

    const p1 = CMath.add(dir, CMath.scale({
      x: perp.x,
      y: perp.y
    }, 10));

    const p2 = CMath.add(dir, CMath.scale({
      x: perp.x,
      y: perp.y
    }, -10));

    this.graphic.beginFill(0x423271, 0.4);
    //this.graphic.drawCircle(parent.targetPlayer.position.x, parent.targetPlayer.position.y, 10);
    this.graphic.drawPolygon( [
      new PIXI.Point(0,0),
      new PIXI.Point(p1.x,p1.y),
      new PIXI.Point(p2.x,p2.y),
    ]);

    this.graphic.endFill();
  }


  onDestroy(parent: SpaceshipGO) {
    super.onDestroy(parent);

    parent.equipmentLayer.removeChild(this.graphic);
    //this.repairGraphic = undefined;
  }

  protected onStartEquipment(parent: SpaceshipGO) {
    super.onStartEquipment(parent);
  }

  protected onEndEquipment(parent: SpaceshipGO) {
    super.onEndEquipment(parent);
  }
}
