import {Message} from "./message";

export class LaserMessage extends Message {



    constructor(public color: any,
                public startX: number,
                public startY: number,
                public endX: number,
                public endY: number) {
      super();
      this.type = "laserMessage";
    }
}
