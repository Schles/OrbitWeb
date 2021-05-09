import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';
import { PlayerJoinedMessage } from '@orbitweb/common';
import { GameLogic } from '../../GameLogic';
import { LobbyQueryMessage } from '@orbitweb/common';
import { ProjectileSpawnMessage } from '@orbitweb/common';
import { StructureSpawnMessage } from '@orbitweb/common';
import { ScoreboardUpdateMessage } from '@orbitweb/common';
import { BoundryUpdateMessage } from '@orbitweb/common';

export class ServerLobbyQueryMessage extends ServerMessageRecieved<LobbyQueryMessage> {
  constructor(message: LobbyQueryMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    context.players.forEach((player) => {
      const resmsg: PlayerJoinedMessage = new PlayerJoinedMessage(player);
      context.send(resmsg);
    });

    context.projectiles.forEach((proj) => {
      const resmsg1: ProjectileSpawnMessage = new ProjectileSpawnMessage(
        proj,
        proj.source.id,
      );
      context.send(resmsg1);
    });

    context.structures.forEach((structure) => {
      const resmsg2: StructureSpawnMessage = new StructureSpawnMessage(
        structure
      );
      context.send(resmsg2);
    });

    const ansmsg = new ScoreboardUpdateMessage(context.scoreboard.scoreboard);
    context.send(ansmsg);

    const boundryMsg = new BoundryUpdateMessage(context.boundries);
    context.send(boundryMsg);
  }
}
