import {
  Client,
  Factories,
  GameFactory,
  GameManager,
  PlayerJoinedMessage,
  ShipFitting
} from '@orbitweb/common';
import { ClientMessageRecieved } from '../../model/ClientMessageRecieved';
import { World } from '@orbitweb/renderer';
import { SpaceshipGO } from '../../model/SpaceshipGO';
import { EquipmentGOError } from '../equipment/EquipmentGOError';
import { EquipmentGOEmpty } from '../equipment/EquipmentGOEmpty';


@Client("EVENT", "playerJoinedMessage")
export class ClientPlayerJoinedMessage extends ClientMessageRecieved<PlayerJoinedMessage> {
  constructor(message: PlayerJoinedMessage) {
    super(message);
  }


  onRecieveWithRenderer(context: GameManager, renderer: World) {

    let player: SpaceshipGO = context.players.find((value) => {
      return value.id === this.message.source;
    }) as SpaceshipGO;

console.log(this.message);
    if (player === undefined) {
      player = new SpaceshipGO(Factories.createSpaceship(this.message));
      player.fitting = new ShipFitting();

      context.players.push(player);
      player.onInit();
      renderer.playerStage.addChild(player.gameObject);

      player.fitting.fitting = this.message.fitting.fitting.map((fit) => {
        const fitGO = GameFactory.instatiateClientEquip(fit);

        if ( fitGO ) {
          fitGO?.onInit(player);
          return fitGO;
        }
console.log("nicht gefunden", fit);
        return new EquipmentGOEmpty(fit);
      });

      //player.iterateGraphics();
    }

    GameManager.eventManager.emit('UI_PLAYER_LOGIN', {
      name: this.message.source,
      fitting: player.fitting,
      spaceship: player,
    });


  }
}
