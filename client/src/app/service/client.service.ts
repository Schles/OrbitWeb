import {Injectable} from '@angular/core';
import {SpaceShooter} from "../game/SpaceShooter";
import {Message} from "../../../../shared/src/message/Message";

import {Events} from "../game/Events";

import {GameService} from "./game.service";

import {ClientPlayerJoinedMessage} from "../game/entity/messages/ClientPlayerJoinedMessage";
import {PlayerJoinedMessage} from "../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {ClientPlayerUpdateMessage} from "../game/entity/messages/ClientPlayerUpdateMessage";
import {PlayerUpdateMessage} from "../../../../shared/src/message/game/player/PlayerUpdateMessage";
import {ClientProjectileSpawnMessage} from "../game/entity/messages/ClientProjectileSpawnMessage";
import {ProjectileSpawnMessage} from "../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {ClientProjectileUpdateMessage} from "../game/entity/messages/ClientProjectileUpdateMessage";
import {ProjectileUpdateMessage} from "../../../../shared/src/message/game/projectile/ProjectileUpdateMessage";
import {ClientProjectileDestroyMessage} from "../game/entity/messages/ClientProjectileDestroyMessage";
import {ProjectileDestroyMessage} from "../../../../shared/src/message/game/projectile/ProjectileDestroyMessage";
import {PlayerKilledMessage} from "../../../../shared/src/message/game/player/PlayerKilledMessage";
import {ClientStructureSpawnMessage} from "../game/entity/messages/ClientStructureSpawnMessage";
import {StructureSpawnMessage} from "../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {ClientStructureDestroyMessage} from "../game/entity/messages/ClientStructureDestroyMessage";
import {StructureDestroyMessage} from "../../../../shared/src/message/game/structures/StructureDestroyMessage";
import {BoundryUpdateMessage} from "../../../../shared/src/message/game/BoundryUpdateMessage";
import {ClientMessageRecieved} from "../game/model/MessageRecieved";
import {MessageDeserializer} from "../game/core/serialize/MessageDeserializer";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private gameService: GameService) {
    this.gameService.onMessage.subscribe( (msg: Message) => {
      this.parseMessage(msg, this.gameService.app());
    });
  }

  public parseMessage(message: Message, app: SpaceShooter) {
    const msg: ClientMessageRecieved<any> = MessageDeserializer.deserialize(message);
    if ( msg !== undefined) {
      msg.onRecieve(app);
    }
  }

}
