import {PlayerJoinedMessage} from "../message/game/player/PlayerJoinedMessage";
import {Spaceship} from "../model/Spaceship";

export class Factories {
  public static createSpaceship( msg: PlayerJoinedMessage): Spaceship {
    return new Spaceship(msg.source, msg.color);
  }
}
