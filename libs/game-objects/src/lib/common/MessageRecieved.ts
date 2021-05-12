import { GameManager, Message } from '@orbitweb/common';


export class ClientMessageRecieved<T extends Message> {
  constructor(public message: T) {}

  public onRecieve(context: GameManager) {}
}
