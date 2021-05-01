import {ProjectileMessage} from "./ProjectileMessage";
import {Projectile} from "../../../model/Projectile";

export class ProjectileUpdateMessage extends ProjectileMessage {

  public x: number;
  public y: number;

  public speedX: number;
  public speedY: number;

  public rotation: number;

  constructor(projectile: Projectile) {
    super(projectile.id);

    this.x = projectile.position.x;
    this.y = projectile.position.y;

    this.speedX = projectile.speed.x;
    this.speedY = projectile.speed.y;

    this.rotation = projectile.rotation;

    this.type = "projectileUpdateMessage";
  }
}
