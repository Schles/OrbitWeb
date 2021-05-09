import { PlayerMessage } from '../../generic/PlayerMessage';

export class PlayerActionMessage extends PlayerMessage {
  constructor(player: string, public skillIndex: number) {
    super(player);
    this.type = 'playerActionMessage';
  }
}
