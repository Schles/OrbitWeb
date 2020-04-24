import {Spaceship} from "../../../model/Spaceship";
import {PlayerUpdateMessage} from "./PlayerUpdateMessage";

export class PlayerJoinedMessage extends PlayerUpdateMessage {
  constructor(spaceship: Spaceship) {
    super(spaceship);
    this.type = "playerJoinedMessage";
  }
}
