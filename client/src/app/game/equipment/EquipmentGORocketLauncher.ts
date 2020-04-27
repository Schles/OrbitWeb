import {ShipEquipmentGO} from "../gameobjects/ShipEquipmentGO";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {SpaceshipGO} from "../gameobjects/SpaceshipGO";

export class EquipmentGORocketLauncher extends ShipEquipmentGO {

  private gameObject: PIXI.Container;

  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);
  }



  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.gameObject = this.getGameObject(parent);
    parent.equipmentLayer.addChild(this.gameObject);
  }

  iterate(parent: SpaceshipGO, delta: number) {
    super.iterate(parent, delta);

    this.gameObject.rotation = this.state.rotation;

/*


    if ( this.state.active) {

      this.repairGraphic.lineStyle(2, 0x00FF00);

      this.repairGraphic.drawCircle(0, 0, 20);

      this.repairGraphic.endFill();

    } else {
      this.repairGraphic.clear();
    }
    */
  }


  onDestroy(parent: SpaceshipGO) {
    super.onDestroy(parent);

    parent.gameObject.removeChild(this.gameObject);
    this.gameObject = undefined;
  }

  public getGameObject(parent: SpaceshipGO): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    const cannon: PIXI.Graphics = new PIXI.Graphics();

    const c = PIXI.utils.string2hex("#AA55FF");

    // Set the fill color

    const look: PIXI.Graphics = new PIXI.Graphics();
    const invertColor = PIXI.utils.string2hex(parent.invertColor(parent.color));
    // Set the fill color
    look.lineStyle(2, invertColor); // Red

    // Draw a circle

    look.drawCircle(0, 0, parent.shipSize + 3);

    look.endFill();

    cannonCont.addChild(look);


    return cannonCont;
  }
}
