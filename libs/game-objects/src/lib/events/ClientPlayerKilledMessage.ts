import { PlayerKilledMessage } from '@orbitweb/common';
import { ClientMessageRecieved, GameManager } from '@orbitweb/game-objects';

export class ClientPlayerKilledMessage extends ClientMessageRecieved<PlayerKilledMessage> {
  constructor(message: PlayerKilledMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const deadPlayer = context.players.find(
      (value) => value.id === this.message.source
    );

    if (deadPlayer !== undefined) {
      context.playerStage.removeChild(deadPlayer.gameObject);
      context.uiStage.removeChild(deadPlayer.nameplateContainer);
      context.uiStage.removeChild(deadPlayer.targetContainer);

      const p = context.players.findIndex(
        (value) => value.id === deadPlayer.id
      );
      if (p !== undefined) {
        deadPlayer.fitting.fitting.forEach((fit) => {
          fit.onDestroy(deadPlayer);
        });

        deadPlayer.onDestroy();
        context.players.splice(p, 1);
      }

      context.eventManager.emit('UI_PLAYER_KILLED', deadPlayer.id);
    }
  }
}
