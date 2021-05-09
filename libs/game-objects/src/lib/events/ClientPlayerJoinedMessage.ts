import { Factories, PlayerJoinedMessage, ShipFitting } from '@orbitweb/common';
import {
  ClientMessageRecieved,
  EquipmentDeserializer,
  GameManager,
  SpaceshipGO,
} from '@orbitweb/game-objects';

export class ClientPlayerJoinedMessage extends ClientMessageRecieved<PlayerJoinedMessage> {
  constructor(message: PlayerJoinedMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    let player: SpaceshipGO = context.players.find((value) => {
      return value.id === this.message.source;
    });

    if (player === undefined) {
      player = new SpaceshipGO(Factories.createSpaceship(this.message));
      player.fitting = new ShipFitting();

      context.players.push(player);
      player.onInit();
      context.playerStage.addChild(player.gameObject);
      context.uiStage.addChild(player.nameplateContainer);
      
      if ( player.id === context.username)
        context.uiStage.addChild(player.targetContainer);

      player.fitting.fitting = this.message.fitting.fitting.map((fit) => {
        const fitGO = EquipmentDeserializer.deserialize(fit);
        fitGO?.onInit(player);
        return fitGO;
      });

      //player.iterateGraphics();
    }

    if (player.id === context.username) {
      context.username = player.id; // Dirty retrigger of setter;)
    }

    context.eventManager.emit('UI_PLAYER_LOGIN', {
      name: this.message.source,
      fitting: player.fitting,
      spaceship: player,
    });
  }
}
