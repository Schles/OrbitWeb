import { GameLogic } from '../GameLogic';
import { Message } from '@orbitweb/common';

export class ServerMessageRecieved<T extends Message> {
  constructor(public message: T) {}

  public onRecieve(context: GameLogic) {}
}
