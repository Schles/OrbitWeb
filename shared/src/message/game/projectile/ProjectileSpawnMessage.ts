import {ProjectileMessage} from "./ProjectileMessage";
import {Projectile} from "../../../model/Projectile";

export class ProjectileSpawnMessage extends ProjectileMessage {


  public projType: string;
  public x: number;
  public y: number;

  constructor(projectile: Projectile, public source: string, public target: string) {
    super(projectile.id);

    this.x = projectile.position.x;
    this.y = projectile.position.y;

    this.projType = projectile.type;
    this.type = "projectileSpawnMessage";
  }
}
