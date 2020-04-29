import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {SpaceShooter} from "../engine/SpaceShooter";
import {EventIO} from "../network/client-enums";

import {WebsocketService} from "../network/websocket.service";
import {Message} from "../../../../shared/src/message/Message";
import {Vector2} from "../../../../shared/src/util/VectorInterface";
import {FittingDB} from "../game/FittingDB";
import {Game} from "../game/Game";
import {ShipFitting} from "../../../../shared/src/model/ShipFitting";
import {Spaceship} from "../../../../shared/src/model/Spaceship";
import {PlayerLoginMessage} from "../../../../shared/src/message/login/PlayerLoginMessage";
import {Input} from "../game/Input";
import {GameService} from "./game.service";
import {PlayerActionMessage} from "../../../../shared/src/message/game/player/PlayerActionMessage";
import {MessageFactory} from "../network/messages/MessageFactory";
import {PlayerService} from "./player.service";
import {ClientPlayerJoinedMessage} from "../network/messages/ClientPlayerJoinedMessage";
import {PlayerJoinedMessage} from "../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {ClientPlayerUpdateMessage} from "../network/messages/ClientPlayerUpdateMessage";
import {PlayerUpdateMessage} from "../../../../shared/src/message/game/player/PlayerUpdateMessage";
import {ClientProjectileSpawnMessage} from "../network/messages/ClientProjectileSpawnMessage";
import {ProjectileSpawnMessage} from "../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {ClientProjectileUpdateMessage} from "../network/messages/ClientProjectileUpdateMessage";
import {ProjectileUpdateMessage} from "../../../../shared/src/message/game/projectile/ProjectileUpdateMessage";
import {ClientProjectileDestroyMessage} from "../network/messages/ClientProjectileDestroyMessage";
import {ProjectileDestroyMessage} from "../../../../shared/src/message/game/projectile/ProjectileDestroyMessage";
import {PlayerKilledMessage} from "../../../../shared/src/message/game/player/PlayerKilledMessage";

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
    //console.log(message);
    switch (message.type) {
      case "playerJoinedMessage":
        new ClientPlayerJoinedMessage(<PlayerJoinedMessage> message).onRecieve(app);
        break;

      case "playerUpdateMessage":
        new ClientPlayerUpdateMessage(<PlayerUpdateMessage> message).onRecieve(app);
        break;

      case "projectileSpawnMessage":
        new ClientProjectileSpawnMessage(<ProjectileSpawnMessage> message).onRecieve(app);
        break;

      case "projectileUpdateMessage":
        new ClientProjectileUpdateMessage(<ProjectileUpdateMessage> message).onRecieve(app);
        break;

      case "projectileDestroyMessage":
        new ClientProjectileDestroyMessage(<ProjectileDestroyMessage> message).onRecieve(app);
        break;

      case "playerKilledMessage":
        const deadPlayer = app.players.find(value => value.id === (<PlayerKilledMessage>message).source);

        if ( deadPlayer !== undefined) {
          app.killPlayer(deadPlayer);
          Game.onPlayerKilled.emit(deadPlayer.id);
        }
        break;



      /*
            case "playerTargetSkillUsedMessage":
              let p = this.getEnemy((<PlayerTargetSkillUsedMessage> message).source);
              let t = this.getEnemy((<PlayerTargetSkillUsedMessage> message).target);

              const skillGO = SkillPrototypes.OnTargetSkillUsedMessage((<PlayerTargetSkillUsedMessage> message).skillId, p, t);
              this.renderer.pApp.spawnSkill(skillGO);
              break;

            case "scoreboardUpdateMessage":
              this.ui.scoreboard.scoreboard = (<ScoreboardUpdateMessage> message).entries;
              break;
      */
      default:
        console.log("unknown message", message);
        break;
    }


  }

}
