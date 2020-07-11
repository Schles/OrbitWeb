import {GameLogic} from "../core/GameLogic";
import {Message} from "../../../../shared/src/message/Message";

export class ServerMessageRecieved<T extends Message> {
  constructor(public message: T) {
  }

  public onRecieve(context: GameLogic) {

  }
}
