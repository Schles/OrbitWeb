import { ServerMessageRecieved } from '../../model/ServerMessageRecieved';
import { GameLogic } from '../../GameLogic';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { PlayerActionMessage } from '@orbitweb/common';
import { ShipEquipment } from '@orbitweb/common';

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
