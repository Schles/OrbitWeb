import {SpaceShooter} from "@orbitweb/renderer";
import {Message} from "@orbitweb/common";

export class ClientMessageRecieved<T extends Message> {
  constructor(public message: T) {
  }

  public onRecieve(context: SpaceShooter) {

  }
}
