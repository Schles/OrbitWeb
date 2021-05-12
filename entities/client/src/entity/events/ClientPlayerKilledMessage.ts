import { Client, PlayerKilledMessage } from '@orbitweb/common';
import { ClientMessageRecieved, GameManagerClient } from '@orbitweb/game-objects';

@Client("EVENT", "playerKilledMessage")
export class ClientPlayerKilledMessage extends ClientMessageRecieved<PlayerKilledMessage> {
  constructor(message: PlayerKilledMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    const deadPlayer = context.players.find(
      (value) => value.id === this.message.source
    );

    if (deadPlayer !== undefined) {
      context.renderer.playerStage.removeChild(deadPlayer.gameObject);
      context.renderer.uiStage.removeChild(deadPlayer.nameplateContainer);
      if ( deadPlayer.id === context.username)
        context.renderer.uiStage.removeChild(deadPlayer.targetContainer);

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
