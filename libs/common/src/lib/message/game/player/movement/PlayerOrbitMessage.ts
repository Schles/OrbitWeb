import { PlayerMessage } from '../../../generic/PlayerMessage';

export class PlayerOrbitMessage extends PlayerMessage {
  constructor(player: string, public target: string) {
    super(player);
    this.type = 'playerOrbitMessage';
  }
}
