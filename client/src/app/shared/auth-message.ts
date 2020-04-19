
import {PlayerMessage} from "./player-message";


// dep
export class AuthMessage extends PlayerMessage {
  constructor(public name: string,
              public x: number,
              public y: number,
              public rotation: number,
              public gun_rotation: number,
              public health: number) {
    super(name, x, y, rotation, gun_rotation, health);

    this.type = "authMessage";
  }
}

