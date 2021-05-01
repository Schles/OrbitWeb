
import {Message} from "@orbitweb/common";
import {ClientPlayerJoinedMessage} from "../entity/messages/ClientPlayerJoinedMessage";
import {PlayerJoinedMessage} from "@orbitweb/common";
import {ClientPlayerUpdateMessage} from "../entity/messages/ClientPlayerUpdateMessage";
import {PlayerUpdateMessage} from "@orbitweb/common";
import {ClientProjectileSpawnMessage} from "../entity/messages/ClientProjectileSpawnMessage";
import {ProjectileSpawnMessage} from "@orbitweb/common";
import {ClientProjectileUpdateMessage} from "../entity/messages/ClientProjectileUpdateMessage";
import {ProjectileUpdateMessage} from "@orbitweb/common";
import {ClientProjectileDestroyMessage} from "../entity/messages/ClientProjectileDestroyMessage";
import {ProjectileDestroyMessage} from "@orbitweb/common";
import {ClientStructureSpawnMessage} from "../entity/messages/ClientStructureSpawnMessage";
import {StructureSpawnMessage} from "@orbitweb/common";
import {ClientStructureDestroyMessage} from "../entity/messages/ClientStructureDestroyMessage";
import {StructureDestroyMessage} from "@orbitweb/common";
import {PlayerKilledMessage} from "@orbitweb/common";
import {BoundryUpdateMessage} from "@orbitweb/common";
import {ClientPlayerKilledMessage} from "../entity/messages/ClientPlayerKilledMessage";
import {ClientBoundryUpdateMessage} from "../entity/messages/ClientBoundryUpdateMessage";
import {ClientScoreboardUpdateMessage} from "../entity/messages/ClientScoreboardUpdateMessage";
import {ScoreboardUpdateMessage} from "@orbitweb/common";
import { ClientMessageRecieved } from "../model/MessageRecieved";

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
