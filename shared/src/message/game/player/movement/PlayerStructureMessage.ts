import {PlayerMessage} from "../../../generic/PlayerMessage";
import {Vector2} from "../../../../util/VectorInterface";

export class PlayerStructureMessage extends PlayerMessage {
  constructor(player: string, public structureId: string) {
    super(player);
    this.type = "playerStructureMessage";
  }
}
