import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {PlayerMoveToMessage} from "../../../../../shared/src/message/game/player/movement/PlayerMoveToMessage";
import {PlayerOrbitMessage} from "../../../../../shared/src/message/game/player/movement/PlayerOrbitMessage";
import {PlayerActionMessage} from "../../../../../shared/src/message/game/player/PlayerActionMessage";
import {PlayerSelfKillMessage} from "../../../../../shared/src/message/game/player/PlayerSelfKillMessage";
import {PlayerStructureMessage} from "../../../../../shared/src/message/game/player/movement/PlayerStructureMessage";
import {ServerMessageRecieved} from "../../model/ServerMessageRecieved";
import {Message} from "../../../../../shared/src/message/Message";
import {ServerPlayerJoinedMessage} from "../../entity/message/ServerPlayerJoinedMessage";
import {ServerLobbyQueryMessage} from "../../entity/message/ServerLobbyQueryMessage";
import {LobbyQueryMessage} from "../../../../../shared/src/message/login/LobbyQueryMessage";
import {ServerPlayerMoveToMessage} from "../../entity/message/ServerPlayerMoveToMessage";
import {ServerPlayerOrbitMessage} from "../../entity/message/ServerPlayerOrbitMessage";
import {ServerPlayerActionMessage} from "../../entity/message/ServerPlayerActionMessage";
import {ServerPlayerSelfKillMessage} from "../../entity/message/ServerPlayerSelfKillMessage";
import {ServerPlayerStructureMessage} from "../../entity/message/ServerPlayerStructureMessage";
import {ServerDebugMessage} from "../../entity/message/ServerDebugMessage";


export class MessageDeserializer {
  public static deserialize(msg: Message): ServerMessageRecieved<any> {
    switch (msg.type) {
      case "playerLoginMessage":
        return new ServerPlayerJoinedMessage(<PlayerJoinedMessage> msg);

      case "playerJoinedMessage":
        break;

      case "lobbyQueryMessage":
        return new ServerLobbyQueryMessage(<LobbyQueryMessage> msg);

      case "playerMoveToMessage":
        return new ServerPlayerMoveToMessage(<PlayerMoveToMessage> msg);

      case "playerOrbitMessage":
        return new ServerPlayerOrbitMessage(<PlayerOrbitMessage> msg);

      case "playerActionMessage":
        return new ServerPlayerActionMessage( <PlayerActionMessage> msg);

      case "playerSelfKillMessage":
        return new ServerPlayerSelfKillMessage( <PlayerSelfKillMessage> msg);
        break;

      case "playerStructureMessage":
        return new ServerPlayerStructureMessage( <PlayerStructureMessage> msg);
        break;

      case "debugMessage":
        return new ServerDebugMessage( msg );
        break;

      default:
        console.log("unknown message", msg);
        break;
    }
  }
}
