
import { PlayerJoinedMessage, Server } from '@orbitweb/common';

import { LobbyQueryMessage } from '@orbitweb/common';
import { ProjectileSpawnMessage } from '@orbitweb/common';
import { StructureSpawnMessage } from '@orbitweb/common';
import { ScoreboardUpdateMessage } from '@orbitweb/common';
import { BoundryUpdateMessage } from '@orbitweb/common';
import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { GameLogic } from '../../../../../libs/game-logic/src';
import { ProjectileEntity } from '../../../../../libs/game-logic/src/lib/model/ProjectileEntity';

@Server("EVENT", "lobbyQueryMessage")
export class ServerLobbyQueryMessage extends ServerMessageRecieved<LobbyQueryMessage> {
  constructor(message: LobbyQueryMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    context.players.forEach((player) => {
      const resmsg: PlayerJoinedMessage = new PlayerJoinedMessage(player);
      context.send(resmsg);
    });

    context.projectiles.forEach((proj: ProjectileEntity) => {
      const resmsg1: ProjectileSpawnMessage = new ProjectileSpawnMessage(
        proj,
        proj.source.id
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
