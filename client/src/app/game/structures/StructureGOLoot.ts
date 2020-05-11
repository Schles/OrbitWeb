import {StructureGO} from "../gameobjects/StructureGO";

export class StructureGOLoot extends StructureGO {
  private text: PIXI.Text

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    // Set the fill color
    this.lineObject = new PIXI.Graphics();
    this.lineObject.lineStyle(2, 0xD4AF37);
    this.lineObject.drawRect(-20, -20, 40, 40);
    this.lineObject.endFill();

    this.text = new PIXI.Text("Loot-\nBox", {fontFamily : 'Arial', fontSize: 14, fill : 0xD4AF37, align : 'center'});
    this.text.x = -15;
    this.text.y = -15;
    cannonCont.addChild(this.text);
    cannonCont.addChild(this.lineObject);

    return cannonCont;
  }

}

