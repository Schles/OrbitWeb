import {Spaceship} from "../../../model/Spaceship";
import {PlayerMessage} from "../../generic/PlayerMessage";
import {ProjectileMessage} from "./ProjectileMessage";
import {Projectile} from "../../../model/Projectile";

export class ProjectileDestroyMessage extends ProjectileMessage {


  constructor(projectile: Projectile) {
    super(projectile.id);

    this.type = "projectileDestroyMessage";
  }
}
