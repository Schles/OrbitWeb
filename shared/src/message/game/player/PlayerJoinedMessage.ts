import {Spaceship} from "../../../model/Spaceship";
import {PlayerUpdateMessage} from "./PlayerUpdateMessage";
import {ShipFitting} from "../../../model/ShipFitting";

export class PlayerJoinedMessage extends PlayerUpdateMessage {

  constructor(spaceship: Spaceship) {
    super(spaceship);
    this.fitting.fitting = spaceship.fitting.fitting;
    this.type = "playerJoinedMessage";
  }
}
