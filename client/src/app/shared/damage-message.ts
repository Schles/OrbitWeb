import {Message} from "./message";

export class DamageMessage extends Message {

    constructor(public origin: string,
                public target: string,
                public damage: number) {
      super();
      this.type = "dmgMessage";
    }
}
