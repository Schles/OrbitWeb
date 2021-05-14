import { GameLogic } from '../../../../libs/game-logic/src/lib/GameLogic';
import { Message } from '@orbitweb/common';

export class ServerMessageRecieved<T extends Message> {
  constructor(public message: T) {}

  public onRecieve(context: GameLogic) {}
}
