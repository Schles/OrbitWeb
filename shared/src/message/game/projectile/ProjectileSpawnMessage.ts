import {Spaceship} from "../../../model/Spaceship";
import {PlayerMessage} from "../../generic/PlayerMessage";
import {ProjectileMessage} from "./ProjectileMessage";
import {Projectile} from "../../../model/Projectile";

export class ProjectileSpawnMessage extends ProjectileMessage {



  constructor(projectile: Projectile, public source: string, public target: string) {
    super(projectile.id);

    this.type = "projectileSpawnMessage";
  }
}
