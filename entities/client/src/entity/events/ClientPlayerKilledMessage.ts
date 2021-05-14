import { MessageRecieved, Client, GameManager, PlayerKilledMessage } from '@orbitweb/common';
import { SpaceshipGO } from '../../model/SpaceshipGO';
import { ClientMessageRecieved } from '../../model/ClientMessageRecieved';
import { World } from '@orbitweb/renderer';

@Client("EVENT", "playerKilledMessage")
export class ClientPlayerKilledMessage extends ClientMessageRecieved<PlayerKilledMessage> {
  constructor(message: PlayerKilledMessage) {
    super(message);
  }


  onRecieveWithRenderer(context: GameManager, renderer: World) {
    const deadPlayer = context.players.find(
      (value) => value.id === this.message.source
    ) as SpaceshipGO;

    if (deadPlayer !== undefined) {
      renderer.playerStage.removeChild(deadPlayer.gameObject);

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

      GameManager.eventManager.emit('UI_PLAYER_KILLED', { died: deadPlayer.id, killer: this.message.killer});
    }
  }
}
