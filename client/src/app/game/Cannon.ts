import {Particle} from "./Particle";
import {Spaceship} from "./Spaceship";
import {CMath, Vector2} from "./CMath";
import * as math from "mathjs";
import {Game} from "./Game";

export class Cannon {

  public parent: Spaceship;
  public gameObject: PIXI.Container;

  public get targetPlayer(): Spaceship {
    return this.parent.targetPlayer;
  }

  public rotation: number = 0;

  public maxOmega: number = 0.3;

  private remainingCooldown: number = 0;

  public cooldownDuration: number = 5;

  public range: number = 200;

  public damage: number = 10;
  public maxAimAngle = 0.01;

  constructor(spaceship: Spaceship) {
    this.parent = spaceship;
    this.gameObject = this.getGameObject();

  }

  public getGameObject(): PIXI.Container {
    const cannonCont: PIXI.Container = new PIXI.Container();

    const cannon: PIXI.Graphics = new PIXI.Graphics();

    const c = PIXI.utils.string2hex(this.parent.color);

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
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    sprite.rotation = Math.PI * -2 / 4;
    cannonCont.addChild(sprite);


    return cannonCont;
  }


  public iterate(delta: number) {

    if (this.targetPlayer !== undefined) {
      this.alignCannon(delta);
      this.shoot(delta);
    }
  }



  private alignCannon(delta: number) {


    const targetVector = CMath.sub(this.targetPlayer.position, this.parent.position);




    let omega = CMath.angle(targetVector, this.getOrientation()) / delta;



    if ( math.abs(omega) > this.maxOmega)
      omega = math.sign(omega) * this.maxOmega;

    this.rotation += omega * delta;
  }

  private shoot(delta: number) {
    if( this.remainingCooldown > 0) {
      this.remainingCooldown -= delta;

      if(this.remainingCooldown < 0)
        this.remainingCooldown = 0;
      return;
    }


    //


    const targetVector = CMath.sub(this.targetPlayer.position, this.parent.position);
    const angle = CMath.angle(targetVector, this.getOrientation());

    if ( math.abs(angle) < this.maxAimAngle) {
      console.log("shoot");
      this.remainingCooldown = this.cooldownDuration;

      //this.projectile.drawLine( {x: 0, y:0}, {x: 100, y: 100});
      const start: Vector2 = {
        x: this.parent.position.x,
        y: this.parent.position.y
      };

      let end: Vector2 = {
        x: this.targetPlayer.position.x,
        y: this.targetPlayer.position.y
      };

      const v: Vector2 = CMath.sub(end, start);

      const length = math.norm( [v.x, v.y]);

      if (length > this.range) {
        // Verfehlt
        const n: Vector2 = CMath.normalize(v);

        end = {
          x: start.x + n.x * this.range,
          y: start.y + n.y * this.range,
        };

        console.log("verfehlt");
      } else {
        // Getroffen
        Game.playerHit.emit( { target: <Spaceship> this.targetPlayer, damage: this.damage });
      }


      Game.shootLaser.emit({ start: this.parent, end: this.targetPlayer});





    }



  }

  private getOrientation(): Vector2 {
    return CMath.rotate({x: 1, y: 0}, this.rotation + this.parent.rotation);
  }



  public iterateGraphics() {
    this.gameObject.rotation  = this.rotation;

  }

}
