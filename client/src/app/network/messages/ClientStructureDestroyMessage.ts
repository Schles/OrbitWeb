import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {ClientMessageRecieved} from "./MessageRecieved";
import {SpaceShooter} from "../../engine/SpaceShooter";
import {SpaceshipGO} from "../../game/gameobjects/SpaceshipGO";
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {Factories} from "../../../../../shared/src/util/Factories";
import {ShipFitting} from "../../../../../shared/src/model/ShipFitting";
import {FactoryEquipmentGO} from "../../game/equipment/FactoryEquipmentGO";
import {ProjectileSpawnMessage} from "../../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {ProjectileGO} from "../../game/gameobjects/ProjectileGO";
import {Rocket} from "../../game/projectiles/Rocket";
import {StructureSpawnMessage} from "../../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {StructureGO} from "../../game/gameobjects/StructureGO";
import {FactoryStructureGO} from "../../game/structures/FactoryStructureGO";
import {StructureDestroyMessage} from "../../../../../shared/src/message/game/structures/StructureDestroyMessage";

export class ClientStructureDestroyMessage extends ClientMessageRecieved<StructureDestroyMessage> {

  constructor(message: StructureDestroyMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {
console.log("got it, destroy it", this.message);
    const structureGO = context.structures.find( (structure) => structure.id === this.message.id);

    if (structureGO !== undefined) {
      context.structureStage.removeChild(structureGO.gameObject);

      const p = context.structures.findIndex(value => value.id === structureGO.id);
      if (p !== undefined) {
        structureGO.onDestroy();
        context.projectiles.splice(p, 1);
      }
    }
  }
}
