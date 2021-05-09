import { PlayerMessage } from '../generic/PlayerMessage';
import { ShipFitting } from '../../model/ShipFitting';

export class PlayerLoginMessage extends PlayerMessage {
  constructor(public source: string, public fitting?: ShipFitting) {
    super(source);
    this.type = 'playerLoginMessage';
  }
}
