import {ShipEquipment} from "@orbitweb/common";
import { Sprite } from "pixi.js";
import { ShipEquipmentGO } from "../../model/ShipEquipmentGO";
import { SpaceshipGO } from "../../model/SpaceshipGO";
import { string2hex } from "@pixi/utils"

export class EquipmentGORepair extends ShipEquipmentGO {

  private repairGraphic: Sprite;



  constructor(shipEquipment: ShipEquipment) {
    super(shipEquipment);


    /*
    const sprite = PIXI.Sprite.from("assets/ShipATypeB.png");
    sprite.tint = c;
    sprite.x = -12;
    sprite.y = 12;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    //sprite.rotation = Math.PI * -2 / 4;
    cannonCont.addChild(sprite);
    */
  }


  onInit(parent: SpaceshipGO) {
    super.onInit(parent);

    this.repairGraphic = this.getGameObject();
    this.repairGraphic.tint = string2hex(parent.color);
    parent.gameObject.addChild(this.repairGraphic);

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

    if ( this.state.active)
      this.repairGraphic.rotation += 3 * delta;
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



    this.repairGraphic.visible = true;

  }

  protected onEndEquipment(parent: SpaceshipGO) {
    super.onEndEquipment(parent);

    this.repairGraphic.visible = false;

    //parent.gameObject.filters.splice(0, 0);
  }

  public getGameObject(): Sprite {

    const sprite = Sprite.from("assets/Shield.png");

    console.log(sprite);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    //sprite.rotation = Math.PI * -2 / 4;
    return sprite;
  }
}
