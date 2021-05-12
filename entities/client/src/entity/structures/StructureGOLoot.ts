import { StructureGO } from '@orbitweb/game-objects';
import { Container, Graphics, Text } from 'pixi.js';
import { Client } from '@orbitweb/common';

@Client("STRUCTURE", "Loot")
export class StructureGOLoot extends StructureGO {
  private text: Text;

  public getGameObject(): Container {
    const cannonCont: Container = new Container();

    this.text = new Text('*' + this.info + '*\nDebris', {
      fontFamily: 'Arial',
      fontSize: 12,
      fill: 0xd4af37,
      align: 'center',
    });
    this.text.x = this.text.width / -2;
    this.text.y = this.text.height / -2;

    this.lineObject = new Graphics();
    this.lineObject.lineStyle(2, 0xd4af37);
    this.lineObject.drawRect(
      -0.5 * this.text.width - 10,
      -0.5 * this.text.height - 10,
      this.text.width + 20,
      this.text.height + 20
    );
    this.lineObject.endFill();

    this.lineObject.beginFill(0x000000);
    this.lineObject.drawRect(
      -0.5 * this.text.width - 10,
      -0.5 * this.text.height - 10,
      this.text.width + 20,
      this.text.height + 20
    );
    this.lineObject.endFill();

    cannonCont.addChild(this.lineObject);
    cannonCont.addChild(this.text);

    return cannonCont;
  }
}
