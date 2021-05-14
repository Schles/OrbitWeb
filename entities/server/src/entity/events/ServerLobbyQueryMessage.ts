
import { GameManager, MessageRecieved, PlayerJoinedMessage, Server } from '@orbitweb/common';

import { LobbyQueryMessage } from '@orbitweb/common';
import { ProjectileSpawnMessage } from '@orbitweb/common';
import { StructureSpawnMessage } from '@orbitweb/common';
import { ProjectileEntity } from '../../model/ProjectileEntity';

@Server("EVENT", "lobbyQueryMessage")
export class ServerLobbyQueryMessage extends MessageRecieved<LobbyQueryMessage> {
  constructor(message: LobbyQueryMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
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
  }
}
