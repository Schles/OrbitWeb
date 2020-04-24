import {Spaceship} from "../../../model/Spaceship";
import {PlayerUpdateMessage} from "./PlayerUpdateMessage";
import {ShipFitting} from "../../../model/ShipFitting";

export class PlayerJoinedMessage extends PlayerUpdateMessage {
  public fitting: ShipFitting;
  constructor(spaceship: Spaceship) {
    super(spaceship);
    this.fitting = spaceship.fitting;
    this.type = "playerJoinedMessage";
  }
}
