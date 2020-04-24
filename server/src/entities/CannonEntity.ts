
import * as math from "mathjs";
import {Cannon} from "../../../shared/src/model/Cannon";
import {Spaceship} from "../../../shared/src/model/Spaceship";
import {CMath} from "../utils/CMath";
import {Vector2} from "../../../shared/src/util/VectorInterface";
import {EventManager} from "../game/EventManager";




export class CannonEntity extends Cannon {


  constructor(spaceship: Spaceship) {
    super(spaceship);
    this.parent = spaceship;

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
//        Game.playerHit.emit( { target: <Spaceship> this.targetPlayer, damage: this.damage });
        EventManager.shootProjectile.emit("playerHit", { source: this.parent, target: this.targetPlayer, damage: 100.0});
      }

      EventManager.shootProjectile.emit("shootProjectile", { source: this.parent, target: this.targetPlayer});
      //Game.shootLaser.emit({ start: this.parent, end: this.targetPlayer});


    }
  }

  private getOrientation(): Vector2 {
    return CMath.rotate({x: 1, y: 0}, this.rotation + this.parent.rotation);
  }

}
