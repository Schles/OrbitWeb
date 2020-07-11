import {ServerMessageRecieved} from "../../model/ServerMessageRecieved";
import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {GameLogic} from "../../core/GameLogic";
import {PlayerLoginMessage} from "../../../../../shared/src/message/login/PlayerLoginMessage";
import {Spaceship} from "../../../../../shared/src/model/Spaceship";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";
import {ShipFitting} from "../../../../../shared/src/model/ShipFitting";
import {EquipmentDeserializer} from "../../core/serialize/EquipmentDeserializer";
import {Rectangle} from "../../../../../shared/src/util/VectorInterface";
import {LobbyQueryMessage} from "../../../../../shared/src/message/login/LobbyQueryMessage";
import {ProjectileSpawnMessage} from "../../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {StructureSpawnMessage} from "../../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {ScoreboardUpdateMessage} from "../../../../../shared/src/message/game/ScoreboardUpdateMessage";
import {BoundryUpdateMessage} from "../../../../../shared/src/message/game/BoundryUpdateMessage";
import {PlayerMoveToMessage} from "../../../../../shared/src/message/game/player/movement/PlayerMoveToMessage";
import {CMath} from "../../../utils/CMath";
import {MovementGoalAlignTo} from "../movement/MovementGoalAlignTo";
import {PlayerOrbitMessage} from "../../../../../shared/src/message/game/player/movement/PlayerOrbitMessage";
import {PlayerActionMessage} from "../../../../../shared/src/message/game/player/PlayerActionMessage";
import {ShipEquipment} from "../../../../../shared/src/model/ShipEquipment";
import {PlayerSelfKillMessage} from "../../../../../shared/src/message/game/player/PlayerSelfKillMessage";


export class ServerPlayerSelfKillMessage extends ServerMessageRecieved<PlayerSelfKillMessage> {

  constructor(message: PlayerSelfKillMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player = context.getPlayer(this.message.source);

    if ( player !== undefined) {
      player.health = 0;
    }
  }
}
