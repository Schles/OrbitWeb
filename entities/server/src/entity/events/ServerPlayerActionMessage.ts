import { GameManager, MessageRecieved, PlayerActionMessage, PlayerOrbitMessage, Server } from '@orbitweb/common';
import { ShipEquipment } from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { ServerPlayerOrbitMessage } from './ServerPlayerOrbitMessage';

@Server("EVENT", "playerActionMessage")
export class ServerPlayerActionMessage extends MessageRecieved<PlayerActionMessage> {
  constructor(message: PlayerActionMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const player: SpaceshipEntity = context.players.find( (p) => p.id === this.message.source) as SpaceshipEntity;

    if (player === undefined) {
      console.error('Action from unkown user', this.message);
      return;
    }

    if (this.message.skillIndex >= player.fitting.fitting.length) {
      console.log('skill not available');
      return;
    }



    const shipEquipment: ShipEquipment =
      player.fitting.fitting[this.message.skillIndex];

    if ( shipEquipment.action.targetEnemy && !player.targetPlayer) {
      const message = new ServerPlayerOrbitMessage(new PlayerOrbitMessage(player.id, undefined));
      message.onRecieve(context);
    }

    if (shipEquipment.name !== 'Empty')
      shipEquipment.state.pendingState = !shipEquipment.state.pendingState;



  }
}
