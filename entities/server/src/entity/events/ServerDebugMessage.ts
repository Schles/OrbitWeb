import { GameManager, MessageRecieved, Server } from '@orbitweb/common';


@Server("EVENT", "debugMessage")
export class ServerDebugMessage extends MessageRecieved<any> {
  constructor(message: any) {
    super(message);
  }

  onRecieve(context: GameManager) {
    context.players.forEach((player) => {
      player.speed = { x: 0, y: 0 };


    });
  }
}
