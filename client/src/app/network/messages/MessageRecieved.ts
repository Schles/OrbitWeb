import {SpaceShooter} from "../../engine/SpaceShooter";
import {Message} from "../../../../../shared/src/message/Message";

export class ClientMessageRecieved<T extends Message> {
  constructor(public message: T) {
  }

  public onRecieve(context: SpaceShooter) {

  }
}
