
import { PlayerActionMessage, Server } from '@orbitweb/common';
import { ShipEquipment } from '@orbitweb/common';
import { ServerMessageRecieved } from '../../../../../libs/game-logic/src/lib/model/ServerMessageRecieved';
import { GameLogic } from '../../../../../libs/game-logic/src';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';

@Server("EVENT", "playerActionMessage")
export class ServerPlayerActionMessage extends ServerMessageRecieved<PlayerActionMessage> {
  constructor(message: PlayerActionMessage) {
    super(message);
  }

  onRecieve(context: GameLogic) {
    const player: SpaceshipEntity = context.getPlayer(this.message.source);

    if (player === undefined) {
      console.error('Action from unkown user', this.message);
      return;
    }

    let res;

    if (this.message.skillIndex >= player.fitting.fitting.length) {
      console.log('skill not available');
      return;
    }

    const shipEquipment: ShipEquipment =
      player.fitting.fitting[this.message.skillIndex];
    if (shipEquipment.name !== 'Empty')
      shipEquipment.state.pendingState = !shipEquipment.state.pendingState;
  }
}
