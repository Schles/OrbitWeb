import {Spaceship} from "../../../../../shared/src/model/Spaceship";

export class NameplateGO extends PIXI.Container {

  private namePlate: PIXI.Text;

  private health: PIXI.Graphics;
  private energy: PIXI.Graphics;

  private barWidth: number = 50;
  private barHeight: number = 5;

  private offsetY: number = -50;

  constructor( private spaceship: Spaceship) {
    super();


    this.namePlate = new PIXI.Text(spaceship.id, {fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
    this.namePlate.position.x = 0;
    this.namePlate.position.y = this.offsetY;
    this.namePlate.anchor.x = 0.5;


    this.addChild(this.namePlate);


    this.health = new PIXI.Graphics();
    this.health.position.x = -1 * this.barWidth / 2;
    this.health.position.y = this.offsetY + 16;

    this.energy = new PIXI.Graphics();
    this.energy.position.x = -1 * this.barWidth / 2;
    this.energy.position.y = this.health.position.y + this.barHeight + 2;


    this.update(spaceship);

    this.addChild(this.health);
    this.addChild(this.energy);

  }

  public update(spaceship: Spaceship) {
    this.fillBar(this.health, spaceship.health, spaceship.maxHealth, 0xAAFFAA, 0xa91aff);
    this.fillBar(this.energy, spaceship.power, spaceship.energyCapacity, 0x2f2f9a, 0xa91aff);
  }

  private fillBar(bar: PIXI.Graphics, value: number, max: number, color: number, bgcolor: number) {




    bar.clear();
    bar.beginFill(bgcolor);
    bar.drawRect(0,0 , this.barWidth, this.barHeight);


    let v = this.barWidth * value / max;

    v = v <= this.barWidth ? v : this.barWidth;

    bar.beginFill(color);
    bar.drawRect(0,0 , v, this.barHeight);
    bar.endFill();
  }
}
