import { Message } from '@orbitweb/common';
import { GameManager } from '../manager/GameManager';


export class ClientMessageRecieved<T extends Message> {
  constructor(public message: T) {}

  public onRecieve(context: GameManager) {}
}
