import {PlayerMessage} from "../generic/PlayerMessage";


export class PlayerLoginMessage extends PlayerMessage {
  constructor(public source: string) {
    super(source);
    this.type = "playerLoginMessage";

  }
}
