import { Client, ShipEquipment } from '@orbitweb/common';
import { CMath } from '@orbitweb/common';
import { ShipEquipmentGO, SpaceshipGO } from '@orbitweb/client-entities';
import { Graphics, Point } from 'pixi.js';

@Client("EQUIP", "Nosferatu")
export class EquipmentGONosferatu extends ShipEquipmentGO {
  private graphic: Graphics;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }

  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.graphic = new Graphics();
    this.graphic.beginFill(0x00ffaa);
    this.graphic.drawPolygon([
      new Point(0, 0),
      new Point(100, 0),
      new Point(0, 100),
    ]);
    this.graphic.endFill();
    parent.equipmentLayer.addChild(this.graphic);
  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);
    this.graphic.clear();
    if (parent.targetPlayer === undefined || this.state.active === false) {
      return;
    }

    const dir = CMath.sub(parent.targetPlayer.position, parent.position);

    const len = CMath.len(dir);

    const scale = (10 + 5) / len;

    const startP = CMath.scale(dir, scale);

    const perp = CMath.cross3(
      {
        x: dir.x,
        y: dir.y,
        z: 0,
      },
      {
        x: 0,
        y: 0,
        z: 1,
      }
    );

    this.graphic.lineStyle(2, 0x423271);

    this.graphic.moveTo(startP.x, startP.y);
    this.graphic.lineTo(dir.x, dir.y);

    const factor = 10;

    this.graphic.moveTo(startP.x + perp.x * factor, startP.y + perp.y * factor);
    this.graphic.lineTo(
      startP.x + perp.x * -1 * factor,
      startP.y + perp.y * -1 * factor
    );

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
