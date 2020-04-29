import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {ClientMessageRecieved} from "./MessageRecieved";
import {SpaceShooter} from "../../engine/SpaceShooter";
import {SpaceshipGO} from "../../game/gameobjects/SpaceshipGO";
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {Factories} from "../../../../../shared/src/util/Factories";
import {ShipFitting} from "../../../../../shared/src/model/ShipFitting";
import {FactoryEquipmentGO} from "../../game/equipment/FactoryEquipmentGO";
import {ProjectileGO} from "../../game/gameobjects/ProjectileGO";
import {ProjectileUpdateMessage} from "../../../../../shared/src/message/game/projectile/ProjectileUpdateMessage";

export class ClientProjectileUpdateMessage extends ClientMessageRecieved<ProjectileUpdateMessage> {

  constructor(message: ProjectileUpdateMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
    //console.log(msg);
    const projectile: ProjectileGO = context.projectiles.find( (proj) => proj.id === this.message.id);

    if ( projectile === undefined) {
      return;
    }

    projectile.position.x = this.message.x;
    projectile.position.y = this.message.y;

    projectile.speed.x = this.message.speedX;
    projectile.speed.y = this.message.speedY;

    projectile.rotation = this.message.rotation;

  }
}
