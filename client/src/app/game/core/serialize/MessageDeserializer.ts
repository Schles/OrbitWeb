import {ClientMessageRecieved} from "../../model/MessageRecieved";
import {Message} from "../../../../../../shared/src/message/Message";
import {ClientPlayerJoinedMessage} from "../../entity/messages/ClientPlayerJoinedMessage";
import {PlayerJoinedMessage} from "../../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {ClientPlayerUpdateMessage} from "../../entity/messages/ClientPlayerUpdateMessage";
import {PlayerUpdateMessage} from "../../../../../../shared/src/message/game/player/PlayerUpdateMessage";
import {ClientProjectileSpawnMessage} from "../../entity/messages/ClientProjectileSpawnMessage";
import {ProjectileSpawnMessage} from "../../../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {ClientProjectileUpdateMessage} from "../../entity/messages/ClientProjectileUpdateMessage";
import {ProjectileUpdateMessage} from "../../../../../../shared/src/message/game/projectile/ProjectileUpdateMessage";
import {ClientProjectileDestroyMessage} from "../../entity/messages/ClientProjectileDestroyMessage";
import {ProjectileDestroyMessage} from "../../../../../../shared/src/message/game/projectile/ProjectileDestroyMessage";
import {ClientStructureSpawnMessage} from "../../entity/messages/ClientStructureSpawnMessage";
import {StructureSpawnMessage} from "../../../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {ClientStructureDestroyMessage} from "../../entity/messages/ClientStructureDestroyMessage";
import {StructureDestroyMessage} from "../../../../../../shared/src/message/game/structures/StructureDestroyMessage";
import {PlayerKilledMessage} from "../../../../../../shared/src/message/game/player/PlayerKilledMessage";
import {BoundryUpdateMessage} from "../../../../../../shared/src/message/game/BoundryUpdateMessage";
import {ClientPlayerKilledMessage} from "../../entity/messages/ClientPlayerKilledMessage";
import {ClientBoundryUpdateMessage} from "../../entity/messages/ClientBoundryUpdateMessage";
import {ClientScoreboardUpdateMessage} from "../../entity/messages/ClientScoreboardUpdateMessage";
import {ScoreboardUpdateMessage} from "../../../../../../shared/src/message/game/ScoreboardUpdateMessage";

export class MessageDeserializer{
  static deserialize(message: Message): ClientMessageRecieved<any> {
    switch (message.type) {
        case "playerJoinedMessage":
          return new ClientPlayerJoinedMessage(<PlayerJoinedMessage> message);
          break;

        case "playerUpdateMessage":
          return new ClientPlayerUpdateMessage(<PlayerUpdateMessage> message);
          break;

        case "projectileSpawnMessage":
          return new ClientProjectileSpawnMessage(<ProjectileSpawnMessage> message);
          break;

        case "projectileUpdateMessage":
          return new ClientProjectileUpdateMessage(<ProjectileUpdateMessage> message);
          break;

        case "projectileDestroyMessage":
          return new ClientProjectileDestroyMessage(<ProjectileDestroyMessage> message);
          break;

        case "structureSpawnMessage":
          return new ClientStructureSpawnMessage(<StructureSpawnMessage> message);
          break;

        case "structureDestroyMessage":
          return new ClientStructureDestroyMessage(<StructureDestroyMessage> message);
          break;

        case "playerKilledMessage":
          return new ClientPlayerKilledMessage(<PlayerKilledMessage> message);
          break;

        case "boundryUpdateMessage":
          return new ClientBoundryUpdateMessage(<BoundryUpdateMessage> message);
          break;

        case "scoreboardUpdateMessage":
          return new ClientScoreboardUpdateMessage( <ScoreboardUpdateMessage> message);
          break;

        default:
          console.log("unknown message", message);
          break;
      }


    }
}
