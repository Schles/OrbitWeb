import {Message} from "./message";

export class PlayerMessage extends Message {



    constructor(public name: string,
                public x: number,
                public y: number,
                public speedX: number,
                public speedY: number,
                public rotation: number,
                public gun_rotation: number) {
      super();
      this.type = "playerMessage";
    }
}
