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
    cannon.beginFill(0xFFFFFF);

    // Draw a circle
    cannon.drawRect(0, 0, 20, 1);

    // Applies fill to lines and shapes since the last call to beginFill.
    cannon.endFill();

    //cannonCont.addChild(cannon);

    const sprite = PIXI.Sprite.from("assets/ShipATypeB.png");
    sprite.tint = c;
    sprite.x = 10;
    sprite.y = 12;
    sprite.scale.x = -0.1;
    sprite.scale.y = -0.1;
    sprite.rotation = Math.PI;
    cannonCont.addChild(sprite);


    return cannonCont;
  }
}
