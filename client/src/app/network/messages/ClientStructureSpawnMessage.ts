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

export class ClientStructureSpawnMessage extends ClientMessageRecieved<StructureSpawnMessage> {

  constructor(message: StructureSpawnMessage) {
    super(message);
  }

  onRecieve(context: SpaceShooter) {

    const structureGO = context.structures.find( (structure) => structure.id === this.message.id);


    if ( structureGO === undefined) {
      let structureGO: StructureGO = FactoryStructureGO.create(this.message);

      if (structureGO !== undefined) {
        context.structures.push(structureGO);

        structureGO.onInit();
        context.structureStage.addChild(structureGO.gameObject);
      }

    }
/*
    public spawnProjectile(projectile: ProjectileGO) {

        if ( this.projectiles.findIndex( (p) => p.id === projectile.id ) < 0) {

        }
      }
    }
*/
  }
}
