import {PlayerMessage} from "../../generic/PlayerMessage";

export class PlayerSelfKillMessage extends PlayerMessage {

  constructor(name: string) {
    super(name);
    this.type = "playerSelfKillMessage";
  }
}
