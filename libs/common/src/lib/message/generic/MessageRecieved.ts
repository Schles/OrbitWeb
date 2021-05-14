import { GameManager, Message } from '@orbitweb/common';


export class MessageRecieved<T extends Message> {
  constructor(public message: T) {}

  public onRecieve(context: GameManager) {}
}
