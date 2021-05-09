import { Message } from '@orbitweb/common';
import { PlayerJoinedMessage } from '@orbitweb/common';
import { PlayerUpdateMessage } from '@orbitweb/common';
import { ProjectileSpawnMessage } from '@orbitweb/common';
import { ProjectileUpdateMessage } from '@orbitweb/common';
import { ProjectileDestroyMessage } from '@orbitweb/common';
import { StructureSpawnMessage } from '@orbitweb/common';
import { StructureDestroyMessage } from '@orbitweb/common';
import { PlayerKilledMessage } from '@orbitweb/common';
import { BoundryUpdateMessage } from '@orbitweb/common';
import { ScoreboardUpdateMessage } from '@orbitweb/common';

import {
  ClientBoundryUpdateMessage,
  ClientMessageRecieved,
  ClientPlayerJoinedMessage,
  ClientPlayerKilledMessage,
  ClientPlayerUpdateMessage,
  ClientProjectileDestroyMessage,
  ClientProjectileSpawnMessage,
  ClientProjectileUpdateMessage,
  ClientScoreboardUpdateMessage,
  ClientStructureDestroyMessage,
  ClientStructureSpawnMessage,
} from '@orbitweb/game-objects';

export class MessageDeserializer {
  static deserialize(message: Message): ClientMessageRecieved<any> {
    switch (message.type) {
      case 'playerJoinedMessage':
        return new ClientPlayerJoinedMessage(<PlayerJoinedMessage>message);
        break;

      case 'playerUpdateMessage':
        return new ClientPlayerUpdateMessage(<PlayerUpdateMessage>message);
        break;

      case 'projectileSpawnMessage':
        return new ClientProjectileSpawnMessage(
          <ProjectileSpawnMessage>message
        );
        break;

      case 'projectileUpdateMessage':
        return new ClientProjectileUpdateMessage(
          <ProjectileUpdateMessage>message
        );
        break;

      case 'projectileDestroyMessage':
        return new ClientProjectileDestroyMessage(
          <ProjectileDestroyMessage>message
        );
        break;

      case 'structureSpawnMessage':
        return new ClientStructureSpawnMessage(<StructureSpawnMessage>message);
        break;

      case 'structureDestroyMessage':
        return new ClientStructureDestroyMessage(
          <StructureDestroyMessage>message
        );
        break;

      case 'playerKilledMessage':
        return new ClientPlayerKilledMessage(<PlayerKilledMessage>message);
        break;

      case 'boundryUpdateMessage':
        return new ClientBoundryUpdateMessage(<BoundryUpdateMessage>message);
        break;

      case 'scoreboardUpdateMessage':
        return new ClientScoreboardUpdateMessage(
          <ScoreboardUpdateMessage>message
        );
        break;

      default:
        console.log('unknown message', message);
        break;
    }
  }
}
