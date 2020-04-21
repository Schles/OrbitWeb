import {Message} from "./message";
import {PlayerMessage} from "./player-message";

export class PlayerJoinedMessage extends PlayerMessage {



  constructor(public name: string,
              public x: number,
              public y: number,
              public speedX: number,
              public speedY: number,
              public rotation: number,
              public gun_rotation: number,
              public health: number,
              public color: any,
              public shipSize: number) {
      super(name,x,y,speedX, speedY, rotation,gun_rotation);
      this.type = "playerJoinedMessage";
    }
}
