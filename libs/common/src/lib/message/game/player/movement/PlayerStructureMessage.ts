import {PlayerMessage} from "../../../generic/PlayerMessage";

export class PlayerStructureMessage extends PlayerMessage {
  constructor(player: string, public structureId: string) {
    super(player);
    this.type = "playerStructureMessage";
  }
}
