import {PlayerMessage} from "../../generic/PlayerMessage";
import {IAction} from "../../../action/IAction";

export class PlayerActionMessage extends PlayerMessage {
  constructor(player: string, public action: IAction) {
    super(player);
    this.type = "playerActionMessage";
  }
}
