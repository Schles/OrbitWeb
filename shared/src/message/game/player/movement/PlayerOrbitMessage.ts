import {PlayerMessage} from "../../../generic/PlayerMessage";
import {Vector2} from "../../../../util/VectorInterface";

export class PlayerOrbitMessage extends PlayerMessage {
  constructor(player: string, public target: string) {
    super(player);
    this.type = "playerOrbitMessage";
  }
}
