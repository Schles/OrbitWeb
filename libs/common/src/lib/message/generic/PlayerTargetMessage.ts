import {PlayerMessage} from "./PlayerMessage";

export class PlayerTargetMessage extends PlayerMessage {


  constructor(source: string, public target: string) {
    super(source);
    this.type = "playerTargetMessage";
  }
}
