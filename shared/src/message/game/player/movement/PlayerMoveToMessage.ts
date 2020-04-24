import {PlayerMessage} from "../../../generic/PlayerMessage";
import {Vector2} from "../../../../util/VectorInterface";

export class PlayerMoveToMessage extends PlayerMessage {
  constructor(player: string, public position: Vector2) {
    super(player);
    this.type = "playerMoveToMessage";
  }
}
