import {SkillUsedMessage} from "../../shared/skill-used-message";
import {Spaceship} from "../Spaceship";
import {SkillGO} from "../gameobjects/SkillGO";



export class Webber extends SkillGO {

    private repairGraphic: PIXI.Graphics;

    constructor(private source: Spaceship, private target: Spaceship) {
      super();
    }

    public onInit() {
      super.onInit();

      this.repairGraphic = new PIXI.Graphics;

      this.repairGraphic.lineStyle(2, 0xFFFF00);

      this.repairGraphic.drawCircle(0,0, 20);

      this.repairGraphic.endFill();


      this.target.gameObject.addChild(this.repairGraphic);
    }

  public iterate(delta: number) {
      super.iterate(delta);

      this.target.health -= delta;
      console.log("hallo");
    }

    public onDestroy() {
      super.onDestroy();

      this.target.gameObject.removeChild(this.repairGraphic);
      this.repairGraphic = undefined;
    }
}
