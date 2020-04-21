import {Message} from "./message";

export class LaserMessage extends Message {



    constructor(public color: any,
                public origin: string,
                public target: string) {
      super();
      this.type = "laserMessage";
    }
}
