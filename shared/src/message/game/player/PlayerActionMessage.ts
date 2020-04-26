import {PlayerMessage} from "../../generic/PlayerMessage";
import {IAction} from "../../../action/IAction";

export class PlayerActionMessage extends PlayerMessage {
  constructor(player: string, public skillIndex: number) {
    super(player);
    this.type = "playerActionMessage";
  }
}
