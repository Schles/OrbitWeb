import {Message} from "./message";
import {PlayerMessage} from "./player-message";

export class PlayerJoinedMessage extends PlayerMessage {



  constructor(public name: string,
              public x: number,
              public y: number,
              public rotation: number,
              public gun_rotation: number,
              public health: number,
              public color: any) {
      super(name,x,y,rotation,gun_rotation);
      this.type = "playerJoinedMessage";
    }
}
