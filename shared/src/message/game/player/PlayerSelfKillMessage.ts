import {Spaceship} from "../../../model/Spaceship";
import {PlayerUpdateMessage} from "./PlayerUpdateMessage";
import {ShipFitting} from "../../../model/ShipFitting";
import {PlayerMessage} from "../../generic/PlayerMessage";

export class PlayerSelfKillMessage extends PlayerMessage {

  constructor(name: string) {
    super(name);
    this.type = "playerSelfKillMessage";
  }
}
