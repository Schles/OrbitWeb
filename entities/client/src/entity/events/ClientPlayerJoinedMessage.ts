import { Client, Factories, GameFactory, PlayerJoinedMessage, ShipFitting } from '@orbitweb/common';
import {
  ClientMessageRecieved, EquipmentGOError,
  GameManagerClient,
  SpaceshipGO
} from '@orbitweb/game-objects';


@Client("EVENT", "playerJoinedMessage")
export class ClientPlayerJoinedMessage extends ClientMessageRecieved<PlayerJoinedMessage> {
  constructor(message: PlayerJoinedMessage) {
    super(message);
  }

  onRecieve(context: GameManagerClient) {
    let player: SpaceshipGO = context.players.find((value) => {
      return value.id === this.message.source;
    });

    if (player === undefined) {
      player = new SpaceshipGO(Factories.createSpaceship(this.message));
      player.fitting = new ShipFitting();

      context.players.push(player);
      player.onInit();
      context.renderer.playerStage.addChild(player.gameObject);
      
      if ( player.id === context.username)
        context.renderer.uiStage.addChild(player.targetContainer);

      player.fitting.fitting = this.message.fitting.fitting.map((fit) => {
        const fitGO = GameFactory.instatiateClientEquip(fit);

        if ( fitGO ) {
          fitGO?.onInit(player);
          return fitGO;
        }

        return new EquipmentGOError(fit);
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
