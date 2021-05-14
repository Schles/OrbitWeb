import { GameManager, Message, MessageRecieved } from '@orbitweb/common';
import { World } from '@orbitweb/renderer';

export class ClientMessageRecieved<T extends Message> extends MessageRecieved<T> {

  public onRecieveWithRenderer(context: GameManager, renderer: World) {
    super.onRecieve(context);
  }

}