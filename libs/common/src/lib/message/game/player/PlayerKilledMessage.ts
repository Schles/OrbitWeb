import { Spaceship } from '../../../model/Spaceship';
import { PlayerMessage } from '../../generic/PlayerMessage';

export class PlayerKilledMessage extends PlayerMessage {
  constructor(spaceship: Spaceship, public killer: string) {
    super(spaceship.id);
    this.type = 'playerKilledMessage';
  }
}
