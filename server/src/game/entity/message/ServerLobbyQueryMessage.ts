import {ServerMessageRecieved} from "../../model/ServerMessageRecieved";
import {PlayerJoinedMessage} from "../../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {GameLogic} from "../../core/GameLogic";
import {LobbyQueryMessage} from "../../../../../shared/src/message/login/LobbyQueryMessage";
import {ProjectileSpawnMessage} from "../../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {StructureSpawnMessage} from "../../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {ScoreboardUpdateMessage} from "../../../../../shared/src/message/game/ScoreboardUpdateMessage";
import {BoundryUpdateMessage} from "../../../../../shared/src/message/game/BoundryUpdateMessage";


export class ServerLobbyQueryMessage extends ServerMessageRecieved<LobbyQueryMessage> {

  constructor(message: LobbyQueryMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    context.players.forEach( (player) => {
      const resmsg: PlayerJoinedMessage = new PlayerJoinedMessage(player);
      context.send(resmsg);
    });

    context.projectiles.forEach( (proj) => {
      const resmsg1: ProjectileSpawnMessage = new ProjectileSpawnMessage(proj, proj.source.id, proj.target.id);
      context.send(resmsg1);
    });

    context.structures.forEach( (structure) => {
      const resmsg2: StructureSpawnMessage = new StructureSpawnMessage(structure);
      context.send(resmsg2);
    });

    const ansmsg = new ScoreboardUpdateMessage(context.scoreboard.scoreboard);
    context.send(ansmsg);

    const boundryMsg = new BoundryUpdateMessage(context.boundries);
    context.send(boundryMsg);
  }


}
